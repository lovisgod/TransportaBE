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
      if (banks) return generateSuccessData(res, 200, banks);
    } catch (e) {
      console.log(e);
      return generateErrorData(res, 500, 'An error occured please try again');
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
      if (error) return generateErrorData(res, 422, error);
      const account = await verifyAccount(account_number, code);
      if (account.account_number === '') return generateErrorData(res, 404, account.account_name);
      return generateSuccessData(res, 200, account.account_name);
    } catch (e) {
      console.log(e);
      return generateErrorData(res, 500, 'An error occured please try again');
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
      if (error) return generateErrorData(res, 422, error);
      const recipient_id = await createRecipient('nuban', name, role, account_number, bank_code, 'NGN');
      if (recipient_id === 'error') return generateErrorData(res, 500, 'An error occured please try again!!!');
      const wallet = await Wallet.create({
        user_uuid: uuid,
        balance: 0.0,
        refrence_id: recipient_id,
      });
      const createdWallet = await Wallet.findOne({
        where: { uuid: wallet.uuid },
        attributes: { exclude: ['refrence_id'] },
      });
      return generateSuccessData(res, 200, createdWallet);
    } catch (e) {
      console.log(e);
      return generateErrorData(res, 500, 'An error occured please try again!!!');
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
      if (error) return generateErrorMessage(res, 422, error);
      const authorization_code = await tokenize({
        cvv, expiry_month, expiry_year, number,
      }, cardOwnerEmail);
      if (authorization_code === 'error') return generateErrorMessage(res, 500, 'An error occured please try again!!!');
      const paymentStatus = await charge(amount, cardOwnerEmail, authorization_code, name);
      if (paymentStatus === 'error') return generateErrorMessage(res, 500, 'An error occured please try again!!!');
      await Wallet.update(
        { balance: amount },
        { where: { user_uuid: uuid } },
      );
      return generateSuccessMessage(res, 200, `wallet loaded ${paymentStatus}fully`);
    } catch (e) {
      console.log(e);
      return generateErrorMessage(res, 500, 'An error occured please try again!!!');
    }
  },
};

export default WalletController;
