const { Router } = require("express")
const router = Router();

const {getDistributorById, getDistributorByReference, getWaitingDistributors, confirmationDistributor, declineDistributor, createDistributor, updateDistributor, getPermissionsById, updatePermissions} = require('../controllers/distributorsController');


// Routes GET
router.get('/distributors/get/:id/:reference', getDistributorById);

router.get('/distributors/ref/:reference', getDistributorByReference);

router.get('/distributors/waiting/:reference', getWaitingDistributors);

router.get('/distributors/permissions/:id', getPermissionsById);


// Routes POST
router.post('/distributors/new/:reference', createDistributor);


// Routes PUT
router.put('/distributors/edit/:id/:reference', updateDistributor);

router.put('/distributors/permissions/:id/:reference', updatePermissions);

router.put('/distributors/confirm/:id/:estatus/:reference', confirmationDistributor);


// Routes DELETE
router.delete('/distributors/decline/:id/:reference', declineDistributor);




module.exports = router;