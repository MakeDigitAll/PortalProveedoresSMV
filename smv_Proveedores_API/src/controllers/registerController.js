const pool = require('../database');
const sendEmail = require('../helpers/sendEmail');
const { encryptPassword } = require('../helpers/hashing');
const crypto = require('crypto');

const handleNewUser = async (req, res) => {
    const { username, password, role } = req.body;
    const expireDate = new Date(Date.now() + 24 * 60 * 60 * 1000);



    if (!username || !password) return res.status(400).json({ error: 'Se requiere el usuario y la contraseña' });
    try {
        const duplicateUser = await pool.query('SELECT * FROM "userAuth" WHERE "userName" = $1', [username]);
        if (duplicateUser.rows[0]) return res.status(409).json({ error: 'El usuario ya existe' });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }



    if (role === '2') {
        const { reference } = req.body;
        if (!reference) return res.status(400).json({ error: 'Se requiere el codigo de referencia de la empresa' });

        try {


            //---------------------------------------------------------------------------------------- Creacion de usuario
            const referenceExist = await pool.query('SELECT * FROM "providersProfile" WHERE "referenceCode" = $1', [reference]);
            if (!referenceExist.rows[0]) return res.status(400).json({ error: 'El codigo de referencia no existe' });

            const hashedPassword = await encryptPassword(password);
            const result = await pool.query('INSERT INTO "userAuth" ("userName", "password", "isPasswordModified") VALUES ($1, $2, $3) RETURNING *', [username, hashedPassword, true]);
            await pool.query('INSERT INTO "UsersProfile" ("profileId", "profileName", "address", "col","city","state", "postalCode", "country", "contact", "phone", "email") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10, $11)', [result.rows[0].id, 'nombreProvisional', 'direccionProvisional', 'colProvisional', 'ciudadProvisional', 'Zacatecas', 'cpProvisional', 'México', 'contactoProvisional', '4920000000', username]);
            await pool.query('INSERT INTO "userImages" ("userId", "image") VALUES ($1, $2)', [result.rows[0].id, null]);

            //---------------------------------------------------------------------------------------- Asignacion de permisos

            const role = '{0,0,0,0,2000}'

            await pool.query('INSERT INTO "Permissions" ("userId", "permission", "reference", "estatus") VALUES ($1, $2, $3, $4)', [result.rows[0].id, role, referenceExist.rows[0].referenceCode, 'Pendiente']);

            const token = {
                userId: result.rows[0].id,
                token: crypto.randomBytes(32).toString('hex'),
                expireDate: expireDate
            }


            //---------------------------------------------------------------------------------------- Creacion de token de verificacion
            await pool.query('INSERT INTO "verifyToken" ("userId", "token", "expireTime") VALUES ($1, $2, $3)', [token.userId, token.token, token.expireDate]);

            //---------------------------------------------------------------------------------------- Envio de correo de verificacion y notificacion de nuevo usuario
            const urlWaitingProvider = `http://localhost:3000/users`;
            await sendEmail(referenceExist.rows[0].email, "Tienes a un nuevos usuarios que necesita ser confirmados", urlWaitingProvider);

            const urlVerif = `http://localhost:3000/verifications/${token.userId}/verify/${token.token}`;
            await sendEmail(username, "Verifica tu cuenta", urlVerif);

            return res.status(200).json({ 'success': 'New user ${result.rows[0].userName} created' });

        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }

    try {

        const hashedPassword = await encryptPassword(password);

        const result = await pool.query('INSERT INTO "userAuth" ("userName", "password", "isPasswordModified") VALUES ($1, $2, $3) RETURNING *', [username, hashedPassword, true]);
        await pool.query('INSERT INTO "providersProfile" ("providerId", "providerName", "socialReason", "address", "col", "rfc","city","state", "postalCode", "country", "contact", "phone", "email") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10, $11, $12, $13)', [result.rows[0].id, 'nombreProvisional', 'razonSocialProvisional', 'direccionProvisional', 'colProvisional', 'rfcProvisional', 'ciudadProvisional', 'Zacatecas', 'cpProvisional', 'México', 'contactoProvisional', '4920000000', username]); 
        await pool.query('INSERT INTO "userImages" ("userId", "image") VALUES ($1, $2)', [result.rows[0].id, null]);
        const role = '{4444}'

        await pool.query('INSERT INTO "Permissions" ("userId", "permission") VALUES ($1, $2)', [result.rows[0].id, role]);

        const token = {
            userId: result.rows[0].id,
            token: crypto.randomBytes(32).toString('hex'),
            expireDate: expireDate
        }

        await pool.query('INSERT INTO "verifyToken" ("userId", "token", "expireTime") VALUES ($1, $2, $3)', [token.userId, token.token, token.expireDate]);

        const url = `http://localhost:3000/verifications/${token.userId}/verify/${token.token}`;
        await sendEmail(username, "Verifica tu cuenta", url);

        return res.status(200).json({ 'success': 'New user ${result.rows[0].userName} created' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ 'message': error.message });
    }
};


module.exports = handleNewUser;