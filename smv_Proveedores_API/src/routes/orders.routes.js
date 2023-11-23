const { Router } = require("express")
const router = Router();

const { getOrders, createOrder, getProductsOrders, deleteOrder, getOrderById, getProductsOrdersById } = require('../controllers/ordersControllers');

router.get('/orders/getOrderById/:id', getOrderById);

router.get('/orders/getOrder/:id', getOrders);

router.post('/orders/createOrder', createOrder);

router.get('/orders/getProductsOrders/:id', getProductsOrders);

router.get('/orders/getProductsOrdersById/:id', getProductsOrdersById);

router.delete('/orders/deleteOrder/:id/:pvId', deleteOrder);

module.exports = router;