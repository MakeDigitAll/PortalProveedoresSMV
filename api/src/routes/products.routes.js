const { Router } = require("express")
const router = Router();


const {getproductById, getProducts, createProduct, updateProduct, deleteProduct} = require("../controllers/productsController");

router.get('/products/:id', getproductById);

router.get('/products', getProducts);

router.post('/products', createProduct);

router.put('/products/:id', updateProduct);

router.delete('/products/:id', deleteProduct);

module.exports = router;