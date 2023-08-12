const { Router } = require("express")
const authenticateToken = require('../middleware/auth.middleware');
const router =  Router();

const { getProviderById, updateProvider, deleteProvider } = require('../controllers/providersController');

router.get('/pv/:id', getProviderById);
 
router.put('/pv/:id', updateProvider);

router.delete('/pv/:id', deleteProvider);

module.exports = router;