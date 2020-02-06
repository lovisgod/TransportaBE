import model from '../models';
import {
  generateErrorMessage, generateSuccessMessage, generateSuccessData, generateErrorData,
} from '../utils/messages';
import { inValidInput, validate, emptyInput } from '../utils/validator';

const {
  getBanks, verifyAccount, createRecipient, tokenize, charge,
} = require('../utils/paystackHelper');

const { Wallet, Transaction_history } = model;

const WalletController = {
  async listBanks(req, res) {
    try {
      const banks = await getBanks();
      if (banks) return res.status(200).send(generateSuccessData('Success', banks));
    } catch (e) {
      console.log(e);
      return res.status(500).send(generateErrorData('Error', 'An error occured please try again'));
    }
  },
  // verify account number using paystack
  async verifyAccountNumber(req, res) {
    try {
      const { account_number, code } = req.body;
      const schema = {
        account_number: inValidInput(account_number),
        code: emptyInput(code),
      };
      const error = validate(schema);
      if (error) return res.status(422).send(generateErrorData('Error', error));
      const account = await verifyAccount(account_number, code);
      if (account.account_number === '') return res.status(500).send(generateErrorData('Error', account.account_name));
      return res.status(200).send(generateSuccessData('Success', account.account_name));
    } catch (e) {
      console.log(e);
      return res.status(500).send(generateErrorData('Error', 'An error occured please try again'));
    }
  },
  // create a wallet for a user
  async createWallet(req, res) {
    let createdWallet;
    try {
      const { uuid, name, role } = req.userData;
      const { account_number, bank_code } = req.body;
      const schema = {
        account_number: inValidInput(account_number),
        code: emptyInput(bank_code),
      };
      const error = validate(schema);
      if (error) return res.status(422).send(generateErrorData('Error', error));
      const recipient_id = await createRecipient('nuban', name, role, account_number, bank_code, 'NGN');
      if (recipient_id.includes('error')) return res.status(500).send(generateErrorData('Error', { uuid: '', balance: recipient_id.split(',')[1] }));
      const wallet = await Wallet.create({
        user_uuid: uuid,
        balance: 0.0,
        refrence_id: recipient_id,
      });
      createdWallet = await Wallet.findOne({
        where: { uuid: wallet.uuid },
        attributes: { exclude: ['refrence_id', 'createdAt', 'updatedAt', 'user_uuid'] },
      });
      return res.status(200).send(generateSuccessData('Success', createdWallet));
    } catch (e) {
      console.error(e.message);
      if (e.message === 'Validation error') return res.status(500).send(generateErrorData('Error', { uuid: '', balance: 'You already have a wallet' }));
      return res.status(500).send(generateErrorData('Error', { uuid: '', balance: 'An error occured please try again' }));
    }
  },
  // user load wallet
  async loadWallet(req, res) {
    try {
      const {
        uuid, role, name, email,
      } = req.userData;
      const {
        amount, cvv, expiry_month, expiry_year, number,
      } = req.body;
      const schema = {
        ammount: emptyInput(amount),
        cvv: emptyInput(cvv),
        expiry_month: emptyInput(expiry_month),
        expiry_year: emptyInput(expiry_year),
        number: emptyInput(number),
      };
      const error = validate(schema);
      if (error) return res.status(422).send(generateErrorMessage('Error', error));
      const authorization_code = await tokenize({
        cvv, expiry_month, expiry_year, number,
      }, email);
      if (authorization_code === 'error') return res.status(500).send(generateErrorMessage('Error', 'An error occured please try again'));
      const paymentStatus = await charge(amount, email, authorization_code, name);
      if (paymentStatus === 'error') return res.status(500).send(generateErrorMessage('Error', 'An error occured please try again'));
      const presentBalance = await Wallet.findOne({
        where: { user_uuid: uuid },
      });
      if (!presentBalance) return res.status(404).send(generateErrorMessage('Error', 'Wallet not found'));
      const futureBalance = await parseInt(presentBalance.balance, 10) + parseInt(amount, 10);
      await Wallet.update(
        { balance: futureBalance },
        { where: { user_uuid: uuid } },
      );
      return res.status(200).send(generateSuccessMessage('Success', `wallet loaded ${paymentStatus}fully`));
    } catch (e) {
      console.log(e);
      return res.status(500).send(generateErrorMessage('Error', 'An error occured please try again'));
    }
  },

  async getBalance(req, res) {
    try {
      const { uuid } = req.userData;
      const wallet = await Wallet.findOne({
        where: { user_uuid: uuid },
        attributes: { exclude: ['refrence_id', 'createdAt', 'updatedAt', 'uuid', 'user_uuid'] },
      });
      if (!wallet) return res.status(404).send(generateErrorData('Error', 'Wallet not found for this user'));
      return res.status(200).send(generateSuccessData('Success', `${wallet.balance}`));
    } catch (error) {
      console.log(error);
      return res.status(500).send(generateErrorData('Error', error.message));
    }
  },

  async chargeRide(req, res) {
    try {
      let new_transaction;
      const { price, ride_uuid } = req.body;
      const { uuid, name } = req.userData;
      const wallet = await Wallet.findOne({
        where: { user_uuid: uuid },
        attributes: { exclude: ['refrence_id', 'createdAt', 'updatedAt', 'uuid', 'user_uuid'] },
      });
      if (!wallet) return res.status(404).send(generateErrorData('Error', 'Wallet not found for this user'));
      console.log(wallet);
      if (wallet.balance <= 50) return res.status(500).send(generateErrorData('Error', 'Low balance please load your wallet and try again'));
      const resultingBalance = await parseInt(wallet.balance, 10) - parseInt(price, 10);
      if (resultingBalance < 0) return res.status(500).send(generateErrorData('Error', 'Low balance please load your wallet and try again'));
      new_transaction = {
        user_uuid: uuid,
        ride_uuid,
        amount: price,
        customer_name: name,
      };
      console.log('it got here33');
      await Wallet.update(
        { balance: resultingBalance },
        { where: { user_uuid: uuid } },
      );
      console.log('it got here22');
      await Transaction_history.create(new_transaction);
      console.log('it got here');
      return res.status(200).send(generateSuccessMessage('Success', 'ride charged successfully'));
    } catch (e) {
      console.log(e);
      return res.status(500).send(generateErrorMessage('Error', e.message));
    }
  },
};

export default WalletController;
