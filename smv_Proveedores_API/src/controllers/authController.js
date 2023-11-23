const jwt = require('jsonwebtoken');
const { token } = require('../config');
const { encryptPassword, verifyPassword } = require('../helpers/hashing');
const crypto = require('crypto');
const pool = require('../database');
const sendEmail = require('../helpers/sendEmail');

//---------------------------------------------------------------------------------------
//                                       LOGIN
//---------------------------------------------------------------------------------------

const auth = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ error: 'Se requiere el usuario y la contraseña' });

  try {
    const user = await getAuth(username);

    if (user) {
      const isPasswordMatch = await verifyPassword(password, user.password);

      if (isPasswordMatch) {

        const permission = await pool.query('SELECT * FROM "Permissions" WHERE "userId" = $1', [user.userId]);

        const respRoles = permission.rows[0].permission;
        const cleanedString = respRoles.replace(/[{}"]/g, '');
        const rol = cleanedString.split(',');

        const accessToken = jwt.sign({ rfc: user.rfc, socialReason: user.socialReason, username: user.user, isVerified: user.isVerified, userId: user.userId, ID: user.ID, status: permission.rows[0].estatus, roles: rol }, token.secretKey, { expiresIn: '10m' });

        const refreshToken = jwt.sign({ rfc: user.rfc, socialReason: user.socialReason, username: user.user, isVerified: user.isVerified, userId: user.userId, ID: user.ID }, token.refreshTokenSecretKey, { expiresIn: '2h' });

        res.status(200).json({
          accessToken: accessToken,
          refreshToken: refreshToken
        });

      } else {

        res.status(400).json({ error: 'Credenciales inválidas' });
        console.log("auth credenciales invalidas");

      }
    }
  } catch (error) {
    res.status(400).json({ error: 'Error al autenticarse' });
  }
};


//---------------------------------------------------------------------------------------

const getAuth = async (username) => {
  try {
    const response = await pool.query('SELECT * FROM "userAuth" WHERE "userName" = $1 AND "isDeleted" = $2', [username, false]);
    if (!response.rows[0]) {
      throw new Error('Usuario no encontrado');
    }

    const Pv = await pool.query('SELECT * FROM "providersProfile" WHERE "providerId" = $1', [response.rows[0].id]);
    if (!Pv.rows[0]) {

      const profileUser = await pool.query('SELECT * FROM "UsersProfile" WHERE "profileId" = $1', [response.rows[0].id]);
      const idProv = await pool.query('SELECT "id" FROM "providersProfile" WHERE "referenceCode" = (SELECT "reference" FROM "Permissions" WHERE "userId" = $1)', [response.rows[0].id]);
      const resp = {
        user: profileUser.rows[0].profileName,
        password: response.rows[0].password,
        isVerified: response.rows[0].isVerified,
        userId: response.rows[0].id,
        socialReason: idProv.rows[0].socialReason,
        rfc: idProv.rows[0].rfc,
        ID: idProv.rows[0].id
      };

      return resp;
    }

    const resp = {
      user: Pv.rows[0].providerName,
      socialReason: Pv.rows[0].socialReason,
      password: response.rows[0].password,
      isVerified: response.rows[0].isVerified,
      userId: response.rows[0].id,
      rfc: Pv.rows[0].rfc,
      ID: Pv.rows[0].id
    };
    return resp;
  } catch (error) {
    throw new Error('Error al obtener el usuario');
  }
};


//---------------------------------------------------------------------------------------


const createAuth = async (username) => {
  try {
    const password = crypto.randomBytes(4).toString('hex');
    const hashedPassword = await encryptPassword(password);
    const response = await pool.query('INSERT INTO "userAuth" ("userName", "password") VALUES ($1, $2) RETURNING id', [username, hashedPassword]);
    const resp = {
      id: response.rows[0].id,
      password: password
    };
    return resp;
  } catch (error) {
    throw new Error('El correo electronico ya esta registrado');
  }
};

//---------------------------------------------------------------------------------------

const updatePasswordAuth = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, oldPassword } = req.body;
    const verifPass = await pool.query('SELECT password FROM "userAuth" WHERE "id" = $1', [id]);
    const isPasswordMatch = await verifyPassword(oldPassword, verifPass.rows[0].password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    } else {
      const hashedPassword = await encryptPassword(password);
      const response = await pool.query('UPDATE "userAuth" SET "password" = $1, "setPassword" = $2 WHERE "id" = $3', [hashedPassword, true, id]);
      return res.status(200).json(response.rows[0]);
    }
  } catch (error) {
    throw new Error('Error al actualizar el usuario');
  }
};

//---------------------------------------------------------------------------------------

const deleteAuth = async (req, res) => {
  try {
    const { id } = req.params;
    const verifDel = await pool.query('SELECT * FROM "userAuth" WHERE "id" = $1', [id]);
    if (verifDel.rows[0]) {
      const response = await pool.query('UPDATE "userAuth" SET "isDeleted" = $1 WHERE "id" = $2', [true, id]);
      return res.status(200).json(response.rows[0]);
    } else {
      return res.status(200).json({ message: 'El usuario no existe' });
    }
  } catch (error) {
    throw new Error('Error al eliminar el usuario');
  }
};

const getPermissionsAuth = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query('SELECT * FROM "Permissions" WHERE "userId" = $1', [id]);
    return res.status(200).json(response.rows[0]);
  } catch (error) {
    throw new Error('Error al obtener el usuario');
  }
};




//---------------------------------------------------------------------------------------
//                                       VERIFY EMAIL
//---------------------------------------------------------------------------------------


const verifyEmail = async (req, res) => {
  try {
    const date = new Date();
    const user = await pool.query('SELECT * FROM "userAuth" WHERE "id" = $1', [req.params.id]);
    if (!user || user.rows[0].isDeleted === true) {
      return res.status(400).send({ message: 'Link invalido' });
    }

    const token = {
      userId: user.rows[0].id,
      token: req.params.token
    }

    const foundToken = await pool.query('SELECT * FROM "verifyToken" WHERE "userId" = $1 AND "token" = $2', [token.userId, token.token]);

    if (!foundToken) return res.status(400).send({ message: 'Link invalido' });

    if (date > foundToken.rows[0].expireTime) return res.status(400).send({ message: 'Link expirado' });

    await pool.query('UPDATE "userAuth" SET "isVerified" = $1 WHERE "id" = $2', [true, token.userId]);
    await pool.query('DELETE FROM "verifyToken" WHERE "userId" = $1', [token.userId]);

    res.status(200).send({ message: 'Cuenta verificada' });

  } catch (error) {
    res.status(400).send({ message: 'Link invalido' });
  }
};


const resendVerifyEmail = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await pool.query('SELECT * FROM "userAuth" WHERE "userName" = $1 AND "isVerified" = $2 AND "isDeleted" = $3', [username, false, false]);
    if (!user) {
      return res.status(402).send({ message: 'Usuario ya verificado o eliminado' });
    }

    const token = {
      userId: user.rows[0].id,
      token: crypto.randomBytes(32).toString('hex'),
      expireDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }

    const foundToken = await pool.query('SELECT * FROM "verifyToken" WHERE "userId" = $1', [token.userId]);

    if (foundToken.rows[0]) {
      await pool.query('UPDATE "verifyToken" SET "token" = $1, "expireTime" = $2 WHERE "userId" = $3', [token.token, token.expireDate, token.userId]);
    } else {
      await pool.query('INSERT INTO "verifyToken" ("userId", "token", "expireTime") VALUES ($1, $2, $3)', [token.userId, token.token, token.expireDate]);
    }

    const url = `http://localhost:3000/users/${token.userId}/verify/${token.token}`;
    await sendEmail(username, "Verifica tu cuenta \n Da click en el siguiente enlance para hacerlo: ", url);

    res.status(200).send({ message: 'Se ha enviado un email de varificacion a tu correo, verifica tu cuenta por favor' });

  } catch (error) {
    res.status(400).send({ message: 'Link invalido' });
  }
};

//---------------------------------------------------------------------------------------

module.exports = {
  auth,
  createAuth,
  updatePasswordAuth,
  deleteAuth,
  verifyEmail,
  resendVerifyEmail,
  getPermissionsAuth
};
