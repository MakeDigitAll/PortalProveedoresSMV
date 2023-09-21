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
    try {
        const { id } = req.params;
        const image = req.file.buffer;
        console.log('imageProd:', image);

        if (!image) {
            return res.status(402).json({ message: 'No se ha seleccionado ninguna imagen' });
        }

        await pool.query('UPDATE "pvProductsImages" SET "image" = $1 WHERE "productId" = $2', [image, id]);
        return res.status(200).json({ message: 'Imagen actualizada' });
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar la imagen' });
    }
}


const getImageProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const img = await pool.query('SELECT "image" FROM "pvProductsImages" WHERE "productId" = $1', [id]);
        return res.send(img.rows[0].image);
    } catch (error) {
        res.status(400).json({ error: 'Error al obtener la imagen' });
    }
}

//---------------------------------------------------------------------------------------


const createProduct = async (req, res) => {
    const { pvId } = req.params;
    const id = pvId;
    const { productName, manofacturerCode, companyCode, brand, model, retailPrice, wholesalePrice, satProductCode, satUnitCode, unitMeasurement } = req.body;
    if (productName === '' || manofacturerCode === '' || companyCode === '' || brand === '' || model === '' || retailPrice === '' || wholesalePrice === '' || satProductCode === '' || satUnitCode === '' || unitMeasurement === '') {
        return res.status(400).json({
            message: 'Todos los campos son obligatorios'
        });
    }

    if (productName.length > 100 || manofacturerCode.length > 100 || companyCode.length > 100 || brand.length > 100 || model.length > 100 || retailPrice.length > 10 || wholesalePrice.length > 10 || satProductCode.length > 20 || satUnitCode.length > 20 || unitMeasurement.length > 10) {
        return res.status(400).json({
            message: 'Los campos excede el limite de caracteres'
        });
    }

    try {
        const date = new Date();
        const isDeleted = false;
        const newProd = await pool.query('INSERT INTO "pvProducts" ("providerId", "productName", "manofacturerCode", "companyCode", "brand", "model", "retailPrice", "wholesalePrice", "satProductCode", "satUnitCode", "unitMeasurement", "created_At", "updated_At", "isDeleted") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 , $11, $12, $13, $14) RETURNING "id"', [id, productName, manofacturerCode, companyCode, brand, model, retailPrice, wholesalePrice, satProductCode, satUnitCode, unitMeasurement, date, date, isDeleted]);
        await pool.query('INSERT INTO "providerProductsAvailability" ("productId", "productStock", "productMin", "productMax","availabilityCat", "created_At", "updated_At", "isDeleted") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [newProd.rows[0].id, 0, 0, 0, 0, date, date, isDeleted]);
        await pool.query('INSERT INTO "pvProductsImages" ("productId", "image", "created_At", "updated_At", "isDeleted") VALUES ($1, $2, $3, $4, $5)', [newProd.rows[0].id, null, date, date, isDeleted]);
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
        const { productName, manofacturerCode, companyCode, brand, model, retailPrice, wholesalePrice, satProductCode, satUnitCode, unitMeasurement } = req.body;
        const date = new Date();
        await pool.query('UPDATE "pvProducts" SET "productName" = $1, "manofacturerCode" = $2, "companyCode" = $3, "brand" = $4, "model" = $5, "retailPrice" = $6, "wholesalePrice" = $7, "satProductCode" = $8, "satUnitCode" = $9, "unitMeasurement" = $10, "updated_At" = $11 WHERE "id" = $12', [productName, manofacturerCode, companyCode, brand, model, retailPrice, wholesalePrice, satProductCode, satUnitCode, unitMeasurement, date, id]);
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

module.exports = {
    getproductById,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    updateImageProducts,
    getImageProduct,
    getDispobility,
    updateDispobility,
}