const { Router } = require("express")
//const authenticateToken = require('../middleware/auth.middleware');
const multer = require('multer');
const upload = multer();
const router =  Router();

const { getProviderById, updateProvider, deleteProvider, legalDocuments, insertDocument, deleteDocument } = require('../controllers/providersController');

router.get('/pv/:id', getProviderById);
 
router.put('/pv/:id', updateProvider);

router.delete('/pv/:id', deleteProvider);


router.get('/pv/:id/documents/:type', legalDocuments);

router.post('/pv/:id/documents/:type', upload.single('file'), insertDocument);

router.delete('/pv/:id/documents/:type', deleteDocument);

module.exports = router;