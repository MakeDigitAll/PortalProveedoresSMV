const pool = require('../database')


const getOrders = async (req, res) => {
    try {
    const { id } = req.params;
    const orders = await pool.query('SELECT * FROM orders WHERE providerId = ?', [id]);
    res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const createOrder = async (req, res) => {
    try {
        const { profileId, costumer, socialReasonCostumer, orderDate, costumerBalance, orderStatus, fulfilled } = req.body;
        const reference = await pool.query('SELECT reference FROM Permissions WHERE userId = ?', [profileId]);
        const providerId = await pool.query('SELECT id FROM ProvidersProfile WHERE referenceCode = ?', [reference[0].referenceCode]);

        const newOrder =  await pool.query('INSERT INTO orders (providerId, profileId, costumer, socialReasonCostumer, orderDate, costumerBalance, orderStatus, fulfilled) VALUES (?,?,?,?,?,?,?,?)', [providerId[0].id, profileId, costumer, socialReasonCostumer, orderDate, costumerBalance, orderStatus, fulfilled]);
        res.status(200).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
 
// solo funciona para usuarios
const getProductsOrders = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await pool.query(`SELECT "pvProducts"."manofacturerCode", "pvProducts"."productName", "pvProducts"."retailPrice", "pvProducts"."id", "pvProducts"."model","pvProducts"."brand", "ProductsAvailability"."productStock" AS "existence" FROM "pvProducts" INNER JOIN "ProductsAvailability" ON "pvProducts"."id" = "ProductsAvailability"."productId" WHERE "pvProducts"."providerId" = $1`, [id]);
        res.status(200).json(products.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
} 

 
module.exports = {
    getOrders,
    createOrder,
    getProductsOrders 
}  