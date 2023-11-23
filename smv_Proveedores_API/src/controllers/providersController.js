const pool = require('../database')

//---------------------------------------------------------------------------------------
//                                       Providers
//---------------------------------------------------------------------------------------

const getProviderById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM "providersProfile" WHERE "id" = $1', [id]);
    res.status(200).json(response.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
}
//   ------------------------------------------------------------------------

const updateProvider = async (req, res) => {
  const id = req.params.id;
  const { providerName, socialReason, discountSale, address, col, rfc, city, state, postalCode, country, contact, phone, email } = req.body;
  const responsibleUser = 'admin';

  try {
    // Verificar si el correo electrónico está siendo utilizado por otro proveedor
    const existingProvider = await pool.query('SELECT * FROM "providersProfile" WHERE "email" = $1 AND "id" != $2', [email, id]);

    if (existingProvider.rows.length > 0) {
      return res.status(400).json({
        message: 'El correo electrónico ya está registrado por otro proveedor',
      });
    }

    try {
      await pool.query('SELECT update_provider_profile($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',
        [id, providerName, socialReason, discountSale, address, col, rfc, city, state, postalCode, country, contact, phone, email, responsibleUser]);

      res.status(200).json({
        message: 'Proveedor actualizado correctamente',
      });
    } catch (updateProfileError) {
      console.error(updateProfileError);
      return res.status(500).json({ error: 'Error al actualizar el proveedor' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};


 
//---------------------------------------------------------------------------------------

const deleteProvider = async (req, res) => {
  try {
    const id = req.params.id;
    const responsibleUser = 'admin';
    await pool.query('SELECT delete_provider_profile($1, $2)', [id, responsibleUser]);
    res.status(200).json({
      message: 'Proveedor eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
}


//---------------------------------------------------------------------------------------
//                                       Legal Documents
//---------------------------------------------------------------------------------------

const legalDocuments = async (req, res) => {
  try {
    const id = req.params.id;
    const type = req.params.type;
    const response = await pool.query('SELECT document FROM "legalDocuments" WHERE "providerId" = $1 and "documentType" = $2', [id, type]);
    res.send(response.rows[0].document);
  } catch (error) {
    res.status(500).json({ error: 'Error en al obtener documentos' });
  }
} 

const insertDocument = async (req, res) => {
  try {
    const { id, type } = req.params;
    const file = req.file.buffer; 
    const response = await pool.query('select * from "legalDocuments" where "providerId" = $1 and "documentType" = $2', [id, type]);
    if (response.rows.length > 0) {
      await pool.query('update "legalDocuments" set "document" = $1 where "providerId" = $2 and "documentType" = $3', [file, id, type]);
      res.status(200).json({ message: 'Documento actualizado correctamente' });
    } else {
      await pool.query('insert into "legalDocuments" ("providerId", "documentType", "document") values ($1, $2, $3)', [id, type, file]);
      res.status(200).json({ message: 'Documento agregado correctamente' });
    }
  }
  catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
    console.log(error);
  }
}

const deleteDocument = async (req, res) => {
  try {
    const { id, type } = req.params;
    await pool.query('delete from "legalDocuments" where "providerId" = $1 and "documentType" = $2', [id, type]);
    res.status(200).json({ message: 'Documento eliminado correctamente' });
  }
  catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

//---------------------------------------------------------------------------------------

module.exports = {
  getProviderById,
  updateProvider,
  deleteProvider,
  legalDocuments,
  insertDocument,
  deleteDocument
}