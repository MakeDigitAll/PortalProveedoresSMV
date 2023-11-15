const { Router } = require("express")
const multer = require('multer');
const upload = multer();
const router = Router();


const {getproductById, getProducts, createProduct, updateProduct, deleteProduct, updateImageProducts, getImageProduct,deleteImageProduct, getDispobility, updateDispobility, getTechnicalSheet, technicalSheet} = require('../controllers/productsController');

//-----------------------------------------------------------------------------------------
//                          CRUD PRODUCTS
//-----------------------------------------------------------------------------------------
router.get('/products/get/:id', getproductById);

router.get('/products/all/:id', getProducts);

router.post('/products/create/:pvId', createProduct);

router.put('/products/update/:id', updateProduct);

router.delete('/products/delete/:id', deleteProduct);


//-----------------------------------------------------------------------------------------
//                          IMAGES PRODUCTS
//-----------------------------------------------------------------------------------------


router.get('/products/image/:id/:position', getImageProduct);

router.put('/products/image/:id/:position', upload.single('image'), updateImageProducts);

router.delete('/products/image/:id/:position', deleteImageProduct);


//-----------------------------------------------------------------------------------------
//                          DISPONIBILITY PRODUCTS
//-----------------------------------------------------------------------------------------

router.get('/products/availability/:id', getDispobility);

router.put('/products/availability/:id', updateDispobility);


//-----------------------------------------------------------------------------------------
//                          TECHNICAL SHEET PRODUCTS
//-----------------------------------------------------------------------------------------

router.get('/products/technicalSheet/:id', getTechnicalSheet);

router.put('/products/technicalSheet/:id', upload.single('technicalSheet'), technicalSheet);

module.exports = router;