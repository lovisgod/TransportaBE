import token from 'uuid';
import { Op } from 'sequelize';
import model from '../models';
import { SendMail } from '../services/emailsender';
import { hashPassword, comparePassword } from '../utils/passwordHash';
import {
  generateErrorMessage, generateSuccessMessage, generateSuccessData, generateErrorData,
} from '../utils/messages';
import { createToken, verifyToken } from '../utils/processToken';
import uploadImage from '../services/imageUploader';
import randomNumberGen from '../utils/randomNumberGen';
import {
  inValidInput, inValidEmail, inValidPassword, inValidName, validate,
} from '../utils/validator';

const { User, Verifications } = model;
/**
 * UserController.
 */
const AuthController = {
  async signUp(req, res, next) {
    try {
      const verifyId = token();
      const userToken = createToken({
        verifyId,
      });
      const {
        username, email, password, name, phone, role,
      } = req.body;
      const schema = {
        username: inValidInput(username),
        email: inValidEmail(email),
        name: inValidInput(name),
        password: inValidPassword(password),
        phone: inValidInput(phone),
        role: inValidInput(role),
      };
      const error = validate(schema);
      if (error) {
        console.log(error);
        return res.status(200).send(generateErrorMessage('Error', JSON.stringify(error)));
      }
      const user = await User.findOne({ where: { email } });
      if (user) {
        return res.status(200).send(generateErrorMessage('Error', 'User already exist'));
      }

      const userName = await User.findOne({ where: { username } });
      if (userName) return res.status(200).send(generateErrorMessage('success', 'User already exist'));

      const encryptedPassword = hashPassword(password);
      const newUser = await User.create({
        username,
        name,
        email,
        password: encryptedPassword,
        phone,
        role: (role === 'customer' ? 'customer' : 'driver'),
      });
      await Verifications.create({
        id: verifyId,
        user_id: newUser.uuid,
        uuidtoken: `${userToken}`,
        numbertoken: randomNumberGen(),
      });
      await SendMail(email, userToken, newUser.uuid);
      return res.status(200).send(generateSuccessMessage('success', 'Kindly verify account to login'));
    } catch (e) {
      return next(e);
    }
  },

  async signIn(req, res, next) {
    const { email, username, password } = req.body;
    const schema = {
      username: email ? inValidInput(email) : inValidEmail(username),
    };
    const error = validate(schema);
    if (error) {
      return res.status(200).send(generateErrorMessage('Error', error));
    }
    try {
      const user = email
        ? await User.findOne({ where: { email } })
        : await User.findOne({ where: { username } });
      if (!user) return res.status(200).send(generateErrorData('Error', 'User not found'));
      const checkPassword = comparePassword(password, user.dataValues.password);
      if (!checkPassword) {
        return res.status(200).send(generateErrorData('Error', 'Details incorect'));
      }
      if (!user.dataValues.verified) {
        return res.status(200).send(generateErrorData('Error', 'Verify your account'));
      }
      return res.status(200).send(generateSuccessData('success', createToken({ user: user.dataValues })));
    } catch (e) {
      return next(e);
    }
  },
  async me(req, res, next) {
    try {
      console.log('its getting here');
      const user = req.userData;
      console.log(user);
      const profile = await User.findOne({
        where: { uuid: user.uuid },
        attributes: {
          exclude: ['password'],
        },
      });
      return res.status(200).send(generateSuccessData('success', profile));
    } catch (e) {
      return next(e);
    }
  },

  async verify(req, res, next) {
    try {
      const { token, id } = req.query;
      const user = await User.findOne({ where: { uuid: id } });
      if (!user) return res.status(401).send(generateErrorMessage('Error', 'User not availablle'));
      if (user.verified === true) {
        return res.status(409).send(generateErrorMessage('Error', 'User already verified'));
      }
      const usertoken = await Verifications.findOne({
        where: {
          [Op.or]: [{ uuidtoken: token }, { numbertoken: token }],
        },
      });
      if (!usertoken) {
        return res.status(400).send(generateErrorMessage('Error', 'No user with the token provided or the token expired'));
      }
      const { uuidtoken } = usertoken.dataValues;
      const verifyId = await verifyToken(uuidtoken);
      if (!verifyId) {
        return res.status(400).send(generateErrorMessage('Error',
          'Email link has expired \n please click the link below to get a new Email'));
      }
      await User.update(
        {
          status: 'verified',
          verified: true,
        },
        {
          where: {
            uuid: id,
          },
        },
      );
      return res
        .status(200)
        .send('<h2>You account have been verified successfully</h2>');
    } catch (e) {
      return next(e);
    }
  },

  async updateProfile(req, res, next) {
    try {
      let profile;
      let avatar;
      let profiledetails;
      const { uuid } = req.userData;
      const {
        username,
        name,
        email,
        password,
        phone,
      } = req.body;
      if (req.file !== undefined) {
        avatar = await uploadImage(req.file);
        profiledetails = {
          avatar,
          username,
          name,
          email,
          password,
          phone,
        };
      } else {
        profiledetails = {
          username,
          name,
          email,
          password,
          phone,
        };
      }
      const userDetails = await User.findOne({ where: { uuid } });
      if (userDetails) {
        profile = await User.update(
          profiledetails,
          {
            returning: true,
            where: { uuid },
          },
        );
        return res.status(200).send(generateSuccessData('sucess', ...profile[1]));
      }
    } catch (e) {
      return next(e);
    }
  },

  async getNewEmailTOken(req, res, next) {
    try {
      const verifyId = token();
      const userToken = createToken({ verifyId });
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(200).send(generateErrorMessage('Error', 'Email not valid, please check your input'));
      await Verifications.create({
        id: verifyId,
        user_id: user.dataValues.uuid,
        uuidtoken: `${userToken}`,
        numbertoken: randomNumberGen(),
      });
      await SendMail(email, userToken, user.dataValues.uuid);
      return res.status(200).send(generateSuccessMessage('success', 'Link sent, Please verify your account'));
    } catch (e) {
      return next(e);
    }
  },

  async resetPassword(req, res, next) {
    try {
      const { email, newPassword } = req.body;
      const encryptedPassword = hashPassword(newPassword);
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(200).send(generateErrorMessage('Error', 'User not found'));
      await User.update(
        { password: encryptedPassword },
        {
          returning: true,
          where: { email },
        },
      );
      return res.status(200).send(generateSuccessMessage('success', 'Password reset successful'));
    } catch (e) {
      return next(e);
    }
  },
};

export default AuthController;
