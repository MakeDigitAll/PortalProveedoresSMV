const pool = require('../database')

const getInvoices = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM "pvOrders" WHERE "orderStatus" = $1', ['Facturado']);
        res.status(200).json(response.rows);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

module.exports = {
    getInvoices
}
