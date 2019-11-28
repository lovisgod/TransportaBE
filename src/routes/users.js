import authcontroller from '../controllers/AuthController';
import WalletController from '../controllers/WalletController';
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
router.get('/wallet/list-banks', auth, WalletController.listBanks);
router.post('/wallet/verify-account', auth, WalletController.verifyAccountNumber);
router.post('/wallet/create-wallet', auth, WalletController.createWallet);
router.post('/wallet/load-wallet', auth, WalletController.loadWallet);
router.get('/user/get-wallet-balance', auth, WalletController.getBalance);

module.exports = router;
