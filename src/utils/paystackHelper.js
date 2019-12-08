const rp = require('request-promise');
const dotEnv = require('dotenv');

dotEnv.config();

const apiUrl = 'https://api.paystack.co';

const getBanks = async () => {
  try {
    const options = {
      method: 'GET',
      uri: `${apiUrl}/bank`,
      json: true,
    };
    const { data } = await rp(options);
    const banks = data.map(x => ({ name: x.name, code: x.code }));
    return banks;
  } catch (e) {
    console.log(e.message);
  }
};

const verifyAccount = async (accountNumber, code) => {
  try {
    const options = {
      method: 'GET',
      uri: `${apiUrl}/bank/resolve`,
      qs: {
        account_number: accountNumber,
        bank_code: code,
      },
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_CODE}`,
        'Cache-Control': 'no-cache',
      },
      json: true,
    };
    const { data } = await rp(options);
    return data;
  } catch (e) {
    console.log(e.error.message);
    return { account_number: 'null', account_name: e.error.message, bank_id: 'null' };
  }
};

const createRecipient = async (type, name, description, account_number, bank_code, currency) => {
  try {
    const options = {
      method: 'POST',
      uri: `${apiUrl}/transferrecipient`,
      body: {
        type,
        name,
        description,
        account_number,
        bank_code,
        currency,
      },
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_CODE}`,
      },
      json: true,
    };
    const { data } = await rp(options);
    return data.recipient_code;
  } catch (e) {
    console.log(e.error);
    return `error, ${e.error.message}`;
  }
};

const tokenize = async (card, email) => {
  try {
    const {
      cvv, expiry_month, expiry_year, number,
    } = card;
    const options = {
      method: 'POST',
      uri: `${apiUrl}/charge/tokenize`,
      body: {
        card: {
          cvv,
          expiry_month,
          expiry_year,
          number,
        },
        email,
      },
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_CODE}`,
      },
      json: true,
    };
    const { data } = await rp(options);
    if (data) return data.authorization_code;
  } catch (e) {
    console.log(e);
    return 'error';
  }
};

const charge = async (amount, email, authorization_code, name) => {
  try {
    const metadata = {
      custom_fields: [
        {
          value: 'Transporta',
          display_name: `Wallet loading by ${name}`,
          variable_name: `Wallet loading by ${name}`,
        },
      ],
    };
    const options = {
      method: 'POST',
      uri: `${apiUrl}/charge`,
      body: {
        email,
        amount,
        metadata,
        authorization_code,
      },
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_CODE}`,
      },
      json: true,
    };
    const { data } = await rp(options);
    if (data) return data.status;
  } catch (e) {
    console.log(e);
    return 'error';
  }
};

module.exports = {
  getBanks, verifyAccount, createRecipient, tokenize, charge,
};
