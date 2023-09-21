const { Router } = require("express")
const router = Router();

const { getOrders, createOrder, getProductsOrders } = require('../controllers/ordersControllers');

router.get('/orders/getOrder/:id', getOrders);

router.post('/orders/createOrder', createOrder);

router.get('/orders/getProductsOrders/:id', getProductsOrders);

module.exports = router;