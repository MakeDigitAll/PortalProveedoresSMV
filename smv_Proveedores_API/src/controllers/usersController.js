const pool = require('../database')
const crypto = require('crypto');
const { encryptPassword } = require('../helpers/hashing');
const sendEmail = require('../helpers/sendEmail');


//----------------------------------------------------------------------------------------
//                          VISTA DE USUARIOS (proveedor)
//----------------------------------------------------------------------------------------

//solo manda usuarios que esten pendientes
const getWaitingUsers = async (req, res) => {
  try {

    const { pvId } = req.params;
    const referenceExist = await pool.query('SELECT "referenceCode" FROM "providersProfile" WHERE "id" = $1', [pvId]);
    const response = await pool.query('SELECT * FROM "Permissions", "UsersProfile" WHERE "Permissions"."userId" = "UsersProfile"."profileId" AND "Permissions"."reference" = $1 AND "Permissions"."estatus" = $2', [referenceExist.rows[0].referenceCode, 'Pendiente']);
    return res.status(200).json(response.rows);
  } catch (error) {
    res.status(400).json({ error: 'Error al obtener el usuario' });
  }
}
//----------------------------------------------------------------------------------------
// Solo manda usuarios que esten activos
const getAllUsers = async (req, res) => {
  try {
    const { pvId } = req.params; 
    const referenceExist = await pool.query('SELECT "referenceCode" FROM "providersProfile" WHERE "id" = $1', [pvId]);
    if (!referenceExist.rows[0]) return res.status(400).json({ error: 'El codigo de referencia no existe' });
    const response = await pool.query('SELECT "UsersProfile"."profileId", "UsersProfile"."profileName", "UsersProfile"."address", "UsersProfile"."col", "UsersProfile"."city", "UsersProfile"."state", "UsersProfile"."postalCode", "UsersProfile"."country", "UsersProfile"."contact", "UsersProfile"."phone", "UsersProfile"."email" FROM "Permissions", "userAuth", "UsersProfile" WHERE "Permissions"."userId" = "userAuth"."id" AND "userAuth"."id" = "UsersProfile"."profileId" AND "Permissions"."reference" = $1 AND "Permissions"."estatus" = $2', [referenceExist.rows[0].referenceCode, 'Activo']);
    return res.status(200).json(response.rows);
  } catch (error) {
    throw new Error('Error al obtener el usuario por nombre de usuario');
  }
}
//---------------------------------------------------------------------------------------- 
const confirmationUser = async (req, res) => {
  try {
    const { id, estatus, pvId } = req.params;
    const roles = '{2001,2002,2003,2004,2000}'
    const referenceExist = await pool.query('SELECT * FROM "providersProfile" WHERE "id" = $1', [pvId]);
    if (!referenceExist.rows[0]) return res.status(400).json({ error: 'El codigo de referencia no existe' });
    await pool.query('UPDATE "Permissions" SET "estatus" = $1 AND "permission" = $2 WHERE "userId" = $3 AND "reference" = $4', [estatus, roles, id, referenceExist.rows[0].referencecode]);
    return res.status(200).json({ message: 'Estatus del usuario actualizado' });
  } catch (error) {
    throw new Error('Error al obtener el usuario por nombre de usuario');
  }
}
//----------------------------------------------------------------------------------------
//Para rechazar un usuario de parte del proveedor
const declineUser = async (req, res) => {
  try {
    const { id, pvId } = req.params;
    const referenceExist = await pool.query('SELECT * FROM "providersProfile" WHERE "id" = $1', [pvId]);
    if (!referenceExist.rows[0]) return res.status(400).json({ error: 'El codigo de referencia no existe' });


    await pool.query('UPDATE "Permissions" SET "estatus" = $1 WHERE "userId" = $2 AND "reference" = $3', ['Eliminado', id, referenceExist.rows[0].referenceCode]);
    return res.status(200).json({ message: 'usuario eliminado' });
  } catch (error) {
    throw new Error('Error al obtener el usuario por nombre de usuario');
  }
}










//----------------------------------------------------------------------------------------
//                          CRUD de usuarios (admin)
//----------------------------------------------------------------------------------------


const getUserById = async (req, res) => {
  try {
      const { id } = req.params;
      const response = await pool.query('SELECT * FROM "UsersProfile" WHERE "profileId" = $1', [id]);
      return res.status(200).json(response.rows[0]);
    } catch (error) {
      res.status(400).json({ error: 'Error al obtener el usuario' });
    }
  };


//----------------------------------------------------------------------------------------
const createUser = async (req, res) => {
  try {
    const { pvId } = req.params;
    const { profileName, address, col, city, state, postalCode, country,  contact, phone, email} = req.body;
    const expireDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // VALIDACIONES
    const referenceExist = await pool.query('SELECT * FROM "providersProfile" WHERE "id" = $1', [pvId]);
    if (!referenceExist.rows[0]) return res.status(400).json({ error: 'El codigo de referencia no existe' });
    const userExist = await pool.query('SELECT * FROM "userAuth" WHERE "userName" = $1', [email]);
    if (userExist.rows[0]) return res.status(400).json({ error: 'El usuario ya existe' });
    const password = crypto.randomBytes(4).toString('hex');
    const hashedPassword = await encryptPassword(password);
    const role = '{2000}';
 
    // CREACION DEL USUARIO
    const newUser = await pool.query('INSERT INTO "userAuth" ("userName", "password") VALUES ($1, $2) RETURNING *', [email, hashedPassword]);
    await pool.query('INSERT INTO "UsersProfile" ("profileId", "profileName", "address", "col", "city", "state", "postalCode", "country", "contact", "phone", "email") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [newUser.rows[0].id, profileName, address, col, city, state, postalCode, country, contact, phone, email])
    await pool.query('INSERT INTO "Permissions" ("userId", "reference", "permission") VALUES ($1, $2, $3)', [newUser.rows[0].id, referenceExist.rows[0].referenceCode, role])
    await pool.query('INSERT INTO "userImages" ("userId") VALUES ($1)', [newUser.rows[0].id])
    
    // CREACION DEL TOKEN DE VERIFICACION
    const token = {
      userId: newUser.rows[0].id,
      token: crypto.randomBytes(32).toString('hex'),
      expireDate: expireDate
    }

    await pool.query('INSERT INTO "verifyToken" ("userId", "token", "expireTime") VALUES ($1, $2, $3)', [token.userId, token.token, token.expireDate]);
    
    const urlVerif = `http://localhost:3000/verifications/${token.userId}/verify/${token.token}`;
    await sendEmail(email, 'Nuevo Usuario de SMV - Verificacion de Cuenta' ,`Se ha creado una nueva cuenta de usuario asociada a este correo por parte de su proveedor, \n la contraseña para acceder por primera vez sera:  ${password}, El nombre de usuario será su correo. Por favor, \n verifique su cuenta dando clic en el siguiente enlace \n` + urlVerif);

    return res.status(200).json({ message: 'usuario creado', id: newUser.rows[0].id });

  } catch (error) {
    res.status(400).json({ error: 'Error al crear el usuario' });
  }
}

//----------------------------------------------------------------------------------------

const updateUser = async (req, res) => {
  try {
    const { id, pvId } = req.params;
    const { profileName, address, col, city, state, postalCode, country, contact, phone, email } = req.body;
    const date = new Date();

    const referenceExist = await pool.query('SELECT * FROM "providersProfile" WHERE "id" = $1', [pvId]);
    if (!referenceExist.rows[0]) return res.status(400).json({ error: 'El codigo de referencia no existe' });
    const userExist = await pool.query('SELECT * FROM "userAuth" WHERE "userName" = $1 and "id" != $2', [email, id]);
    if (userExist.rows[0]) return res.status(400).json({ error: 'El correo ya esta registrado' });


    await pool.query('UPDATE "userAuth" SET "userName" = $1, "updated_At" = $2 WHERE "id" = $3', [email, date, id]);
    await pool.query('UPDATE "UsersProfile" SET "profileName" = $1, "address" = $2, "col" = $3, "city" = $4, "state" = $5, "postalCode" = $6, "country" = $7, "contact" = $8, "phone" = $9, "email" = $10, "updated_At" = $11 WHERE "profileId" = $12', [profileName, address, col, city, state, postalCode, country, contact, phone, email, date, id]);
    return res.status(200).json({ message: 'usuario actualizado' });
  } catch (error) {
    throw new Error('Error al actualizar el usuario');
  }
}






//----------------------------------------------------------------------------------------
//                          Control de permisos (admin)
//----------------------------------------------------------------------------------------

const getPermissionsById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query('SELECT "Permissions"."userId","UsersProfile"."profileName", "Permissions"."reference", "Permissions"."permission" FROM "Permissions", "UsersProfile", "userAuth" WHERE "Permissions"."userId" = "UsersProfile"."profileId" AND "Permissions"."userId" = "userAuth"."id" AND "Permissions"."userId" = $1', [id]);
    return res.status(200).json(response.rows[0]);
  } catch (error) {
    res.status(400).json({ error: 'Error al obtener los permisos' });
  }
}


//----------------------------------------------------------------------------------------

const updatePermissions = async (req, res) => {
  try {
    const { id, pvId } = req.params;
    const { permission } = req.body;
    const date = new Date();

    const referenceExist = await pool.query('SELECT * FROM "providersProfile" WHERE "id" = $1', [pvId]);
    if (!referenceExist.rows[0]) return res.status(400).json({ error: 'El codigo de referencia no existe' });

    await pool.query('UPDATE "Permissions" SET "permission" = $1, "updated_At" = $2 WHERE "userId" = $3', [permission, date, id]);
    return res.status(200).json({ message: 'Permisos actualizados' });
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar los permisos' });
  }
}



//----------------------------------------------------------------------------------------


const updateImageUser = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req.file.buffer;

    if (!image) {
      return res.status(402).json({ message: 'No se ha seleccionado ninguna imagen' });
    }

    await pool.query('UPDATE "userImages" SET "image" = $1 WHERE "userId" = $2', [image, id]);
    return res.status(200).json({ message: 'Imagen actualizada' });
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar la imagen' });
  }
}

const getImageUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query('SELECT "image" FROM "userImages" WHERE "userId" = $1', [id]); 
    return res.send(response.rows[0].image);
  } catch (error) {
    res.status(400).json({ error: 'Error al obtener la imagen' });
  }
}


const getProfileUser = async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await pool.query('SELECT * FROM "providersProfile" WHERE "id" = $1', [id]);
    if (!provider.rows[0]) {
      const user = await pool.query('SELECT * FROM "UsersProfile" WHERE "profileId" = $1', [id]);
      return res.status(200).json(user.rows[0]);
    }
    return res.status(200).json(provider.rows[0]);
  }
  catch (error) {
    res.status(400).json({ error: 'Error al obtener el perfil' });
  }

}

// ----------------------  Controlador de usuarios (admin) -------------------------------
module.exports = {
  getUserById,
  createUser,
  updateUser,
  getPermissionsById,
  updatePermissions,
  updateImageUser,
  getImageUser,
  getWaitingUsers,
  getAllUsers,
  confirmationUser,
  declineUser,
  getProfileUser
}