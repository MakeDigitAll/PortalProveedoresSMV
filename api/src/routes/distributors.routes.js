const { Router } = require("express")
const router = Router();

const {getDistributorById, getDistributorByReference, getWaitingDistributors, confirmationDistributor, deleteDistributor, createDistributor, updateDistributor, deleteDistributorAdmin, getPermissionsById, updatePermissions} = require('../controllers/distributorsController');

router.get('/distributors/get/:id/:reference', getDistributorById);

router.get('/distributors/ref/:reference', getDistributorByReference);

router.get('/distributors/waiting/:reference', getWaitingDistributors);

router.put('/distributors/confirm/:id/:estatus/:reference', confirmationDistributor);

router.delete('/distributors/decline/:id/:reference', deleteDistributor);

router.post('/distributors/new/:reference', createDistributor);

router.put('/distributors/edit/:id/:reference', updateDistributor);

router.delete('/distributors/delete/:id', deleteDistributorAdmin);

router.get('/distributors/Pe/:id', getDistributorById);

router.get('/distributors/permissions/:id', getPermissionsById);

router.put('/distributors/permissions/:id/:reference', updatePermissions);


module.exports = router;