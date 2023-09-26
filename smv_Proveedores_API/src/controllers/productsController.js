const pool = require('../database')

//---------------------------------------------------------------------------------------
//                                       Products
//---------------------------------------------------------------------------------------


const getproductById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await pool.query('SELECT * FROM "pvProducts" WHERE "id" = $1 AND "isDeleted" = false', [id]);
        if (response.rows.length === 0) {
            return res.status(404).json({
                message: 'No se encontro el producto, se encuentra eliminado o no existe'
            });
        }
        return res.status(200).json(response.rows[0]);
    } catch (error) {
        throw new Error('Error al obtener el producto por id');
    }
}

const getProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await pool.query('SELECT * FROM "pvProducts" WHERE "isDeleted" = false AND "providerId" = $1', [id]);
        return res.status(200).json(response.rows);
    } catch (error) {
        throw new Error('Error al obtener todos los productos');
    }
}
//---------------------------------------------------------------------------------------

const updateImageProducts = async (req, res) => {
    const { id } = req.params;
    const images = req.files;
    //se recibe un array de imagenes

    const imageBuffers = [];

    for (let i = 0; i < 4; i++) {
        if (images[`image${i}`]) {
            imageBuffers.push(images[`image${i}`][0].buffer);
        } else {
            imageBuffers.push(null);
        }
    }
 
    try {
        const date = new Date();
        await pool.query('UPDATE "pvProductsImages" SET "image" = $1, "updated_At" = $2 WHERE "productId" = $3', [imageBuffers, date, id]);
        res.status(200).json({
            message: 'Imagenes actualizadas correctamente'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar las imagenes'
        });
    }
}


const getImageProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const img = await pool.query('SELECT "image" FROM "pvProductsImages" WHERE "productId" = $1', [id]);
        return res.send(img.rows[0].image[0]);
    } catch (error) {
        res.status(400).json({ error: 'Error al obtener la imagen' });
    }
}

const getImagesProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const img = await pool.query('SELECT "image" FROM "pvProductsImages" WHERE "productId" = $1', [id]);
        return res.status(200).json(img.rows[0].image);
    } catch (error) {
        res.status(400).json({ error: 'Error al obtener la imagen' });
    }
}

//---------------------------------------------------------------------------------------


const createProduct = async (req, res) => {
    const { pvId } = req.params;
    const id = pvId;
    const { productName, manofacturerCode, companyCode, brand, model, price1, price2, price3, price4, rate1, rate2, rate3, satProductCode, satUnitCode, unitMeasurement } = req.body;
    if (productName === '' || manofacturerCode === '' || companyCode === '' || brand === '' || model === '' || price1 === '' || price2 === '' || price3 === '' || price4 === '' || rate1 === '' || rate2 === '' || rate3 === '' || satProductCode === '' || satUnitCode === '' || unitMeasurement === '') {
        return res.status(400).json({
            message: 'Todos los campos son obligatorios'
        });
    }

    if (productName.length > 100 || manofacturerCode.length > 100 || companyCode.length > 100 || brand.length > 100 || model.length > 100 || price1.length > 10 || price2.length > 10 || price3.length > 10 || price4.length > 10 || rate1.length > 10 || rate2.length > 10 || rate3.length > 10 || satProductCode.length > 100 || satUnitCode.length > 100 || unitMeasurement.length > 100) {
        return res.status(400).json({
            message: 'Los campos excede el limite de caracteres'
        });
    }

    try {
        const date = new Date();
        const isDeleted = false;
        const newProd = await pool.query('INSERT INTO "pvProducts" ("productName", "manofacturerCode", "companyCode", "brand", "model", "price1", "price2", "price3", "price4", "rate1", "rate2", "rate3", "satProductCode", "satUnitCode", "unitMeasurement", "providerId", "created_At", "updated_At", "isDeleted") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 , $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING id', [productName, manofacturerCode, companyCode, brand, model, price1, price2, price3, price4, rate1, rate2, rate3, satProductCode, satUnitCode, unitMeasurement, id, date, date, isDeleted]);
        await pool.query('INSERT INTO "providerProductsAvailability" ("productId", "productStock", "productMin", "productMax","availabilityCat", "created_At", "updated_At", "isDeleted") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [newProd.rows[0].id, 0, 0, 0, 0, date, date, isDeleted]);
        await pool.query('INSERT INTO "pvProductsImages" ("productId", "image", "created_At", "updated_At", "isDeleted") VALUES ($1, $2, $3, $4, $5)', [newProd.rows[0].id, [null, null, null, null], date, date, isDeleted]);
        await pool.query('INSERT INTO "technicalSheetProducts" ("productId", "tecnicalSheet", "created_At", "updated_At", "isDeleted") VALUES ($1, $2, $3, $4, $5)', [newProd.rows[0].id, null, date, date, isDeleted]);
        res.status(200).json({
            message: 'Producto creado correctamente',
            idproduct: newProd.rows[0].id
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el producto'
        });
    }
}

//---------------------------------------------------------------------------------------

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { productName, manofacturerCode, companyCode, brand, model, price1, price2, price3, price4, rate1, rate2, rate3, satProductCode, satUnitCode, unitMeasurement } = req.body;
        const date = new Date();
        await pool.query('UPDATE "pvProducts" SET "productName" = $1, "manofacturerCode" = $2, "companyCode" = $3, "brand" = $4, "model" = $5, "price1" = $6, "price2" = $7, "price3" = $8, "price4" = $9, "rate1" = $10, "rate2" = $11, "rate3" = $12, "satProductCode" = $13, "satUnitCode" = $14, "unitMeasurement" = $15, "updated_At" = $16 WHERE "id" = $17', [productName, manofacturerCode, companyCode, brand, model, price1, price2, price3, price4, rate1, rate2, rate3, satProductCode, satUnitCode, unitMeasurement, date, id]);
        res.status(200).json({
            message: 'Producto actualizado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el producto'
        });
    }
}

//---------------------------------------------------------------------------------------

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('UPDATE "pvProducts" SET "isDeleted" = true WHERE "id" = $1', [id]);
        await pool.query('UPDATE "providerProductsAvailability" SET "isDeleted" = true WHERE "productId" = $1', [id]);
        await pool.query('DELETE FROM "pvProductsImages" WHERE "productId" = $1', [id]);
        await pool.query('DELETE FROM "technicalSheetProducts" WHERE "productId" = $1', [id]);
        res.status(200).json({
            message: 'Producto eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar el producto'
        });
    }
}


//---------------------------------------------------------------------------------------
//                                       Dispobility
//---------------------------------------------------------------------------------------

const getDispobility = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await pool.query('SELECT * FROM "providerProductsAvailability" WHERE "productId" = $1 AND "isDeleted" = false', [id]);
        if (response.rows.length === 0) {
            return res.status(404).json({
                message: 'No se encontro la disponibilidad del producto, se encuentra eliminado o no existe'
            });
        }
        return res.status(200).json(response.rows[0]);
    } catch (error) {
        throw new Error('Error al obtener la disponibilidad del producto');
    }
}

const updateDispobility = async (req, res) => {
    try {
        const { id } = req.params;
        const { productStock, productMin, productMax, availabilityCat } = req.body;
        const date = new Date();
        await pool.query('UPDATE "providerProductsAvailability" SET "productStock" = $1, "productMin" = $2, "productMax" = $3, "availabilityCat" = $4, "updated_At" = $5 WHERE "productId" = $6', [productStock, productMin, productMax, availabilityCat, date, id]);
        res.status(200).json({
            message: 'Disponibilidad actualizada correctamente'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar la disponibilidad'
        });
    }
}

const technicalSheet = async (req, res) => {
    try {
        const { id } = req.params;
        const technicalSheet = req.file.buffer;
        const name = req.body.name;
        const type = req.body.type;

        if (!technicalSheet) {
            return res.status(400).json({
                message: 'No se encontro el archivo'
            });
        }

        await pool.query('UPDATE "technicalSheetProducts" SET "tecnicalSheet" = $1, "name" = $2, "type" = $3 WHERE "productId" = $4', [technicalSheet, name, type, id]);
        res.status(200).json({
            message: 'Hoja tecnica actualizada correctamente'
        });
    }
    catch (error) {
       res.status(500).json({
            message: 'Error al actualizar la hoja tecnica'
        });
    }
}

//const getTechnicalSheet = async (req, res) => {
 //   try {
  //      const { id } = req.params;
        ///const sheet = await pool.query('SELECT "tecnicalSheet" FROM "technicalSheetProducts" WHERE "productId" = $1', [id]);
       // console.log(sheet.rows[0].tecnicalSheet);
        //return res.send(sheet.rows[0].tecnicalSheet);
   // } catch (error) {
     //   res.status(400).json({ error: 'Error al obtener la hoja tecnica' });
   // }
//}

 


module.exports = {
    getproductById,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct, 
    updateImageProducts,
    getImageProduct,
    getImagesProduct,
    getDispobility,
    updateDispobility,
    technicalSheet,
    //getTechnicalSheet
}