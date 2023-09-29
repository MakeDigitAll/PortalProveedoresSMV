const { Router } = require("express")
const router = Router();
const multer = require('multer');
const upload = multer();

const {
       getUserById,
       createUser,
       updateUser,
       getPermissionsById,
       updatePermissions,
       updateImageUser,
       getImageUser,
       getWaitingUsers,
       getAllUsers,
       confirmationUser,
       declineUser
} = require('../controllers/userscontroller');


// Routes GET 
 router.get('/users/get/:id/:pvId', getUserById);

router.get('/users/all/:pvId', getAllUsers);

router.get('/users/waiting/:pvId', getWaitingUsers);

router.get('/users/permissions/:id', getPermissionsById);


// // Routes POST
router.post('/users/new/:pvId', createUser);


// // Routes PUT
router.put('/users/edit/:id/:pvId', updateUser);

router.put('/users/permissions/:id/:pvId', updatePermissions);

router.put('/users/confirm/:id/:estatus/:pvId', confirmationUser);

// Routes DELETE
router.delete('/users/decline/:id/:pvId', declineUser);




// //Routes Images
router.get('/users/image/:id', getImageUser);
router.put('/users/image/:id',upload.single('image'), updateImageUser);

module.exports = router;