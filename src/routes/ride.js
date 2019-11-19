import RideController from '../controllers/RideController';
import auth from '../middlewares/Auth';

const express = require('express');

const router = express.Router();
router.post('/ride/create-ride', auth, RideController.createRide);
router.get('/ride/details', auth, RideController.getRideDetails);
router.get('/ride/user-rides', auth, RideController.getUserRideList);

module.exports = router;