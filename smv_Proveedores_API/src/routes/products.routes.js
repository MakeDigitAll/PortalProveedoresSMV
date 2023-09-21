const { Router } = require("express")
const multer = require('multer');
const upload = multer();
const router = Router();


const {getproductById, getProducts, createProduct, updateProduct, deleteProduct, updateImageProducts, getImageProduct, getDispobility, updateDispobility} = require('../controllers/productsController');

router.get('/products/get/:id', getproductById);

router.get('/products/all/:id', getProducts);

router.post('/products/create/:pvId', createProduct);

router.put('/products/update/:id', updateProduct);

router.delete('/products/delete/:id', deleteProduct);

router.get('/products/image/:id', getImageProduct);

router.put('/products/image/:id',upload.single('image'), updateImageProducts);

router.get('/products/availability/:id', getDispobility);

router.put('/products/availability/:id', updateDispobility);

module.exports = router;