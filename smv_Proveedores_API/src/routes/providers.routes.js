const { Router } = require("express")
//const authenticateToken = require('../middleware/auth.middleware');
const multer = require('multer');
const upload = multer();
const router =  Router();

const { getProviderById, updateProvider, deleteProvider, legalDocuments, insertDocument, updateDocument, deleteDocument } = require('../controllers/providersController');

router.get('/pv/:id', getProviderById);
 
router.put('/pv/:id', updateProvider);

router.delete('/pv/:id', deleteProvider);


router.get('/pv/:id/documents', legalDocuments);

router.post('/pv/:id/documents/:documentName', upload.single('file'), insertDocument); 

router.put('/pv/:id/documents/:documentName', upload.single('file'), updateDocument);

router.delete('/pv/:id/documents/:documentName', deleteDocument);

module.exports = router;