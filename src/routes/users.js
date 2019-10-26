import authcontroller from '../controllers/AuthController';
import auth from '../middlewares/Auth';

const express = require('express');

const router = express.Router();

router.post('/users/signup', authcontroller.signUp);
router.post('/users/login', authcontroller.signIn);
router.get('/users/profile', auth, authcontroller.me);
router.put('/auth/verify', authcontroller.verify);
router.put('/users/get-new-email', authcontroller.getNewEmailTOken);
router.put('/users/update-profile', auth, authcontroller.updateProfile);
router.put('/users/reset-pass', authcontroller.resetPassword);

module.exports = router;
