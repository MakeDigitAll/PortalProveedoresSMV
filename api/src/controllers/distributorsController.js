const pool = require('../database')
const crypto = require('crypto');
const sendEmail = require('../helpers/sendEmail');

//----------------------------------------------------------------------------------------
//                          VISTA DE DISTRIBUIDORES (proveedor)
//----------------------------------------------------------------------------------------

//solo manda usuarios que esten pendientes
const getWaitingDistributors = async (req, res) => {
  try {

    const { reference } = req.params;
    const referenceExist = await pool.query('SELECT * FROM "providersProfile" WHERE "referenceCode" = $1', [reference]);
    if (!referenceExist.rows[0]) return res.status(400).json({ error: 'El codigo de referencia no existe' });


    const response = await pool.query('SELECT "userAuth"."id", "distributorsProfile"."distributorName", "distributorsProfile"."city", "distributorsProfile"."state", "distributorsProfile"."contact", "distributorsProfile"."phone", "distributorsProfile"."email" FROM "Permissions", "userAuth", "distributorsProfile" WHERE "Permissions"."userId" = "userAuth"."id" AND "userAuth"."id" = "distributorsProfile"."distributorId" AND "Permissions"."reference" = $1 AND "Permissions"."estatus" = $2', [reference, 'Pendiente']);
    return res.status(200).json(response.rows);
  } catch (error) {
    res.status(400).json({ error: 'Error al obtener el distribuidor' });
  }
}
//----------------------------------------------------------------------------------------
// Solo manda usuarios que esten activos
const getDistributorByReference = async (req, res) => {
  try {
    const { reference } = req.params; 
    const referenceExist = await pool.query('SELECT * FROM "providersProfile" WHERE "referenceCode" = $1', [reference]);
    if (!referenceExist.rows[0]) return res.status(400).json({ error: 'El codigo de referencia no existe' });
    const response = await pool.query('SELECT "userAuth"."id", "distributorsProfile"."distributorName", "distributorsProfile"."address", "distributorsProfile"."col", "distributorsProfile"."city", "distributorsProfile"."state", "distributorsProfile"."postalCode", "distributorsProfile"."country", "distributorsProfile"."contact", "distributorsProfile"."phone", "distributorsProfile"."email" FROM "Permissions", "userAuth", "distributorsProfile" WHERE "Permissions"."userId" = "userAuth"."id" AND "userAuth"."id" = "distributorsProfile"."distributorId" AND "Permissions"."reference" = $1 AND "Permissions"."estatus" = $2', [reference, 'Activo']);
    return res.status(200).json(response.rows);
  } catch (error) {
    throw new Error('Error al obtener el usuario por nombre de usuario');
  }
}
//----------------------------------------------------------------------------------------
const confirmationDistributor = async (req, res) => {
  try {
    const { id, estatus, reference } = req.params;
    const roles = '{2001,2002,2003,2004,2000}'
    const referenceExist = await pool.query('SELECT * FROM "providersProfile" WHERE "referenceCode" = $1', [reference]);
    if (!referenceExist.rows[0]) return res.status(400).json({ error: 'El codigo de referencia no existe' });
    await pool.query('UPDATE "Permissions" SET "estatus" = $1 AND "permission" = $2 WHERE "userId" = $3 AND "reference" = $4', [estatus, roles, id, reference]);
    return res.status(200).json({ message: 'Estatus del distribuidor actualizado' });
  } catch (error) {
    throw new Error('Error al obtener el usuario por nombre de usuario');
  }
}
//----------------------------------------------------------------------------------------
//Para rechazar un distribuidor de parte del proveedor
const deleteDistributor = async (req, res) => {
  try {
    const { id, reference } = req.params;
    const referenceExist = await pool.query('SELECT * FROM "providersProfile" WHERE "referenceCode" = $1', [reference]);
    if (!referenceExist.rows[0]) return res.status(400).json({ error: 'El codigo de referencia no existe' });
    await pool.query('UPDATE "Permissions" SET "estatus" = $1 WHERE "userId" = $2 AND "reference" = $3', ['Eliminado', id, reference]);
    return res.status(200).json({ message: 'Distribuidor eliminado' });
  } catch (error) {
    throw new Error('Error al obtener el usuario por nombre de usuario');
  }
}










//----------------------------------------------------------------------------------------
//                          CRUD de distribuidores (admin)
//----------------------------------------------------------------------------------------


const getDistributorById = async (req, res) => {
  try {
      const { id, reference } = req.params;
      const referenceExist = await pool.query('SELECT * FROM "providersProfile" WHERE "referenceCode" = $1', [reference]);
      if (!referenceExist.rows[0]) return res.status(400).json({ error: 'El codigo de referencia no existe' });
  
  
      const response = await pool.query('SELECT * FROM "distributorsProfile" WHERE "distributorId" = $1', [id]);
      return res.status(200).json(response.rows[0]);
    } catch (error) {
      res.status(400).json({ error: 'Error al obtener el distribuidor' });
    }
  };


//----------------------------------------------------------------------------------------
const createDistributor = async (req, res) => {
  try {
    const reference = req.params.reference;
    const { distributorName, address, col, city, state, postalCode, country,  contact, phone, email} = req.body;
    console.log('bodyDistrib:', distributorName, address, col, city, state, postalCode, country,  contact, phone, email);
    const expireDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // VALIDACIONES
    const referenceExist = await pool.query('SELECT * FROM "providersProfile" WHERE "referenceCode" = $1', [reference]);
    if (!referenceExist.rows[0]) return res.status(400).json({ error: 'El codigo de referencia no existe' });
    const distributorExist = await pool.query('SELECT * FROM "userAuth" WHERE "userName" = $1', [email]);
    if (distributorExist.rows[0]) return res.status(400).json({ error: 'El distribuidor ya existe' });
    const password = crypto.randomBytes(4).toString('hex');
    const role = '{2000}';

    // CREACION DEL DISTRIBUIDOR
    const newDistributor = await pool.query('INSERT INTO "userAuth" ("userName", "password") VALUES ($1, $2) RETURNING *', [email, password])
    await pool.query('INSERT INTO "distributorsProfile" ("distributorId", "distributorName", "address", "col", "city", "state", "postalCode", "country", "contact", "phone", "email") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [newDistributor.rows[0].id, distributorName, address, col, city, state, postalCode, country, contact, phone, email])
    await pool.query('INSERT INTO "Permissions" ("userId", "reference", "permission") VALUES ($1, $2, $3)', [newDistributor.rows[0].id, reference, role])
    
    // CREACION DEL TOKEN DE VERIFICACION
    const token = {
      userId: newDistributor.rows[0].id,
      token: crypto.randomBytes(32).toString('hex'),
      expireDate: expireDate
    }

    await pool.query('INSERT INTO "verifyToken" ("userId", "token", "expireTime") VALUES ($1, $2, $3)', [token.userId, token.token, token.expireDate]);
    
    const urlVerif = `http://localhost:3000/users/${token.userId}/verify/${token.token}`;
    await sendEmail(email, "Verifica tu cuenta", urlVerif);

    return res.status(200).json({ message: 'Distribuidor creado, Contraseña: ' + password });

  } catch (error) {
    res.status(400).json({ error: 'Error al crear el distribuidor' });
  }
}

//----------------------------------------------------------------------------------------

const updateDistributor = async (req, res) => {
  try {
    const { id, reference } = req.params;
    const { distributorName, address, col, city, state, postalCode, country, contact, phone, email } = req.body;
    const date = new Date();

    const referenceExist = await pool.query('SELECT * FROM "providersProfile" WHERE "referenceCode" = $1', [reference]);
    if (!referenceExist.rows[0]) return res.status(400).json({ error: 'El codigo de referencia no existe' });
    const distributorExist = await pool.query('SELECT * FROM "userAuth" WHERE "userName" = $1 and "id" != $2', [email, id]);
    if (distributorExist.rows[0]) return res.status(400).json({ error: 'El correo ya esta registrado' });


    await pool.query('UPDATE "userAuth" SET "userName" = $1 "updatedAt" = $2 WHERE "id" = $3', [email, date, id]);
    await pool.query('UPDATE "distributorsProfile" SET "distributorName" = $1, "address" = $2, "col" = $3, "city" = $4, "state" = $5, "postalCode" = $6, "country" = $7, "contact" = $8, "phone" = $9, "email" = $10, "updatedAt" = $11 WHERE "distributorId" = $12', [distributorName, address, col, city, state, postalCode, country, contact, phone, email, date, id]);
    return res.status(200).json({ message: 'Distribuidor actualizado' });
  } catch (error) {
    throw new Error('Error al actualizar el usuario');
  }
}

//----------------------------------------------------------------------------------------'

const deleteDistributorAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('UPDATE "Permissions" SET "estatus" = $1 WHERE "userId" = $2', ['Eliminado', id]);
    await pool.query('UPDATE "userAuth" SET "isDeleted" = $1 WHERE "id" = $2', [true, id]);
    await pool.query('UPDATE "distributorsProfile" SET "isDeleted" = $1 WHERE "distributorId" = $2', [true, id]);
    return res.status(200).json({ message: 'Distribuidor eliminado' });
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar el distribuidor' });
  }
}










//----------------------------------------------------------------------------------------
//                          Control de permisos (admin)
//----------------------------------------------------------------------------------------

const getPermissionsById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query('SELECT "Permissions"."userId","distributorsProfile"."distributorName", "Permissions"."reference", "Permissions"."permission" FROM "Permissions", "distributorsProfile", "userAuth" WHERE "Permissions"."userId" = "distributorsProfile"."distributorId" AND "Permissions"."userId" = "userAuth"."id" AND "Permissions"."userId" = $1', [id]);
    return res.status(200).json(response.rows[0]);
  } catch (error) {
    res.status(400).json({ error: 'Error al obtener los permisos' });
  }
}


//----------------------------------------------------------------------------------------

const updatePermissions = async (req, res) => {
  try {
    const { id, reference } = req.params;
    const { permission } = req.body;
    const date = new Date();

    const referenceExist = await pool.query('SELECT * FROM "providersProfile" WHERE "referenceCode" = $1', [reference]);
    if (!referenceExist.rows[0]) return res.status(400).json({ error: 'El codigo de referencia no existe' });

    await pool.query('UPDATE "Permissions" SET "permission" = $1, "updated_At" = $2 WHERE "userId" = $3', [permission, date, id]);
    return res.status(200).json({ message: 'Permisos actualizados' });
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar los permisos' });
  }
}






// ----------------------  Controlador de usuarios (admin) -------------------------------
module.exports = {
  getDistributorById,
  getWaitingDistributors,
  getDistributorByReference,
  confirmationDistributor,
  deleteDistributor,
  createDistributor,
  updateDistributor,
  deleteDistributorAdmin,
  getPermissionsById,
  updatePermissions
}