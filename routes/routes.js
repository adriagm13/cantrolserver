const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const petController = require('./../controllers/petController');
const datacollarController = require('./../controllers/datacollarController');

// Users Controller
router.get('/users/:id', userController.getUser);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Login route
router.post('/login', userController.loginUser);
// Sign up route
router.post('/signup', userController.signupUser);

router.post('/updatedistance', userController.addDistancePosition);

// Pets Controller
router.get('/pets/:id', petController.getPet);
router.post('/pets', petController.createPet);
router.put('/pets/:id', petController.updatePet);
router.delete('/pets/:id', petController.deletePet);


router.post('/addpet', petController.addPet);
router.post('/removepet', petController.removePet);
router.post('/getpetposition', petController.getPetPosition);


// DataCollar Controller
router.post('/addcollar', datacollarController.addDataCollar);
router.post('/removecollar', datacollarController.removeDataCollar);
router.post('/getdatapet', datacollarController.getPetAccelerationNormsData);
router.post('/getmicropet', datacollarController.getPetMicroNormsData);


module.exports = router;
