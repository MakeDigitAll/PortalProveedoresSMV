const { Router } = require("express");
const router =  Router();

const { getInvoices } = require('../controllers/InvoicesController');

router.get('/invoices/all', getInvoices);

module.exports = router;