const pool = require('../database')


const getOrders = async (req, res) => { 
    try {
    const { id } = req.params;
    const orders = await pool.query('SELECT * FROM "pvOrders" WHERE "providerId" = $1 AND "isDeleted" = false ORDER BY "orderDate" DESC', [id]);
    res.status(200).json(orders.rows);
    } catch (error) { 
        res.status(500).json({ error: error.message }); 
    }
}    

const createOrder = async (req, res) => {
    try {
        const { providerId, orderDate, orderType, productsOrder, subTotal, discount, total, orderData, deliveryData, fulfilled, paymentMethod, comments } = req.body;
        const jsonProducts = JSON.stringify(productsOrder);
        const amountPaid = 0;
        const amountPending = total;
        await pool.query('INSERT INTO "pvOrders" ("providerId", "orderDate", "orderType", "orderData", "deliveryData", "paymentMethod", "productsOrder", "amountPaid", "amountPending", "discount", "subtotal", "total", "comments", "fulfilled") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 , $11, $12, $13, $14)', [providerId, orderDate, orderType, orderData, deliveryData, paymentMethod, jsonProducts, amountPaid, amountPending, discount, subTotal, total, comments, fulfilled]);
        res.status(200).json({ message: 'Pedido creado satisfactoriamente' });
   } 
    catch (error) {
         res.status(500).json({ error: error.message });
    }  
}


const deleteOrder = async (req, res) => {
    try {
        const { id, pvId } = req.params;
        await pool.query('UPDATE "pvOrders" SET "isDeleted" = true WHERE "id" = $1 AND "providerId" = $2', [id, pvId]);
        res.status(200).json({ message: 'Pedido eliminado satisfactoriamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
 
 




 
// ruta para recuperar los productos para preparar un pedido
const getProductsOrders = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await pool.query(`SELECT "pvProducts"."manofacturerCode", "pvProducts"."productName", "pvProducts"."price1", "pvProducts"."id", "pvProducts"."model","pvProducts"."brand", "ProductsAvailability"."productStock" AS "existence" FROM "pvProducts" INNER JOIN "ProductsAvailability" ON "pvProducts"."id" = "ProductsAvailability"."productId" WHERE "pvProducts"."providerId" = $1`, [id]);
        res.status(200).json(products.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
} 

 
module.exports = {
    getOrders,
    createOrder,
    deleteOrder,
    getProductsOrders 
}  