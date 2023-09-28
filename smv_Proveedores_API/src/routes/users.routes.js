const { Router } = require("express")
const router = Router();
const multer = require('multer');
const upload = multer();

const {
       getDistributorById, 
       getAllDistributors,
       getWaitingDistributors, 
       confirmationDistributor, 
       declineDistributor, 
       createDistributor, 
       updateDistributor, 
       getPermissionsById, 
       updatePermissions,  
       updateImageUser, 
       getImageUser
} = require('../controllers/distributorsController');


// Routes GET
router.get('/distributors/get/:id/:pvId', getDistributorById);

router.get('/distributors/all/:pvId', getAllDistributors);

router.get('/distributors/waiting/:pvId', getWaitingDistributors);

router.get('/distributors/permissions/:id', getPermissionsById);


// Routes POST
router.post('/distributors/new/:pvId', createDistributor);


// Routes PUT
router.put('/distributors/edit/:id/:pvId', updateDistributor);

router.put('/distributors/permissions/:id/:pvId', updatePermissions);

router.put('/distributors/confirm/:id/:estatus/:pvId', confirmationDistributor);


// Routes DELETE
router.delete('/distributors/decline/:id/:pvId', declineDistributor);




//Routes Images
router.get('/distributors/image/:id', getImageUser);
router.put('/usr/image/:id',upload.single('image'), updateImageUser);

module.exports = router;