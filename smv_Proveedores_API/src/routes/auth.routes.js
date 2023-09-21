const { Router } = require("express")
const router = Router();
const refreshTokenController = require("../controllers/refreshTokenController");

const { auth, updatePasswordAuth, deleteAuth, verifyEmail, resendVerifyEmail, getImageUser} = require('../controllers/authController');
const  handleNewUser = require('../controllers/registerController');


//---------------------------------------------------------------------------------------
//                                         AUTH
//---------------------------------------------------------------------------------------

router.post('/login', auth);

router.post('/refreshToken', refreshTokenController);

router.post('/register', handleNewUser);

router.post('/users/:id/verify/:token', verifyEmail);

router.post('/resendVerifyEmail', resendVerifyEmail);

router.get('/users/:id/image', getImageUser);


//---------------------------------------------------------------------------------------
//                                       AUTH CRUD 
//---------------------------------------------------------------------------------------

router.put('account/:id', updatePasswordAuth);

router.delete('/account/:id', deleteAuth);


//---------------------------------------------------------------------------------------

module.exports = router;