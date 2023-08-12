const pool = require('../database')

//---------------------------------------------------------------------------------------
//                                       Products
//---------------------------------------------------------------------------------------


const getproductById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await pool.query('SELECT ("providerProducts"."id","providersProfile"."providerName", "productName", "manofacturerCode", "companyCode", "brand", "model", "retailPrice", "wholesalePrice", "satProductCode", "satUnitCode", "unitMeasurement") FROM "providerProducts" INNER JOIN "providersProfile" ON "providerProducts"."providerId" = "providersProfile"."id" WHERE "providerProducts"."id" = $1 AND "providerProducts"."isDeleted" = false', [id]);
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
        const { id, reference } = req.query;
        const referenceExists = await pool.query('SELECT * FROM "providersProfile" WHERE "reference" = $1', [reference]);
        if (!referenceExists.rows[0]) {
            return res.status(400).json({
                message: 'No se encontro el proveedor'
            });
        }

        const response = await pool.query('SELECT * FROM "pvProducts" WHERE "isDeleted" = false AND "providerId" = $1', [id]);
        return res.status(200).json(response.rows);
    } catch (error) {
        throw new Error('Error al obtener todos los productos');
    }
}

//---------------------------------------------------------------------------------------


const createProduct = async (req, res) => {
    try {
        const { providerId, productName, manofacturerCode, companyCode, brand, model, retailPrice, wholesalePrice, satProductCode, satUnitCode, unitMeasurement } = req.body;
        const date = new Date();
        const isDeleted = false;
        const newProd = await pool.query('INSERT INTO "providerProducts" ("providerId", "productName", "manofacturerCode", "companyCode", "brand", "model", "retailPrice", "wholesalePrice", "satProductCode", "satUnitCode", "unitMeasurement", "created_At", "updated_At", "isDeleted") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id', [providerId, productName, manofacturerCode, companyCode, brand, model, retailPrice, wholesalePrice, satProductCode, satUnitCode, unitMeasurement, date, date, isDeleted]);
        await createProductAvailability(newProd.rows[0].id);
        res.status(200).json({
            message: 'Producto creado correctamente'
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
        const { providerId, productName, manofacturerCode, companyCode, brand, model, retailPrice, wholesalePrice, satProductCode, satUnitCode, unitMeasurement } = req.body;
        const date = new Date();
        await pool.query('UPDATE "providerProducts" SET "providerId" = $1, "productName" = $2, "manofacturerCode" = $3, "companyCode" = $4, "brand" = $5, "model" = $6, "retailPrice" = $7, "wholesalePrice" = $8, "satProductCode" = $9, "satUnitCode" = $10, "unitMeasurement" = $11, "updated_At" = $12 WHERE "id" = $13', [providerId, productName, manofacturerCode, companyCode, brand, model, retailPrice, wholesalePrice, satProductCode, satUnitCode, unitMeasurement, date, id]);
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
        const date = new Date();
        await pool.query('UPDATE "providerProducts" SET "isDeleted" = true, "updated_At" = $1 WHERE "id" = $2', [date, id]);
        await pool.query('UPDATE "providerProductsAvailability" SET "isDeleted" = true, "updated_At" = $1 WHERE "productId" = $2', [date, id]);
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

module.exports = {
    getproductById,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
}