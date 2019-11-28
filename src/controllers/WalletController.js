import model from '../models';
import {
  generateErrorMessage, generateSuccessMessage, generateSuccessData, generateErrorData,
} from '../utils/messages';
import { inValidInput, validate, emptyInput } from '../utils/validator';

const {
  getBanks, verifyAccount, createRecipient, tokenize, charge,
} = require('../utils/paystackHelper');

const { Wallet } = model;

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
      if (recipient_id === 'error') return res.status(500).send(generateErrorData('Error', 'An error occured please try again'));
      const wallet = await Wallet.create({
        user_uuid: uuid,
        balance: 0.0,
        refrence_id: recipient_id,
      });
      const createdWallet = await Wallet.findOne({
        where: { uuid: wallet.uuid },
        attributes: { exclude: ['refrence_id'] },
      });
      return res.status(200).send(generateSuccessData('Success', createdWallet));
    } catch (e) {
      console.error(e.message);
      return res.status(500).send(generateErrorData('Error', 'An error occured please try again'));
    }
  },
  // user load wallet
  async loadWallet(req, res) {
    try {
      const { uuid, role, name } = req.userData;
      const {
        amount, cvv, expiry_month, expiry_year, number, cardOwnerEmail,
      } = req.body;
      const schema = {
        ammount: emptyInput(amount),
        cvv: emptyInput(cvv),
        expiry_month: emptyInput(expiry_month),
        expiry_year: emptyInput(expiry_year),
        number: emptyInput(number),
        cardOwnerEmail: emptyInput(cardOwnerEmail),
      };
      const error = validate(schema);
      if (error) return res.status(422).send(generateErrorMessage('Error', error));
      const authorization_code = await tokenize({
        cvv, expiry_month, expiry_year, number,
      }, cardOwnerEmail);
      if (authorization_code === 'error') return res.status(500).send(generateErrorMessage('Error', 'An error occured please try again'));
      const paymentStatus = await charge(amount, cardOwnerEmail, authorization_code, name);
      if (paymentStatus === 'error') return res.status(500).send(generateErrorMessage('Error', 'An error occured please try again'));
      await Wallet.update(
        { balance: amount },
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
};

export default WalletController;
