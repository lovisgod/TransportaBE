import { verifyToken } from '../utils/processToken';
import { generateErrorMessage } from '../utils/messages';
import model from '../models';

const { User } = model;

// eslint-disable-next-line consistent-return
export default async (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(401).send(generateErrorMessage('Error', 'Authentication required'));
    const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
    const { user } = verifyToken(token);
    const auser = await User.findOne({ where: { email: user.email } });
    if (!auser) return res.status(401).send(generateErrorMessage('Error', 'User does not exist'));
    req.userData = auser.dataValues;
    next();
  } catch (err) {
    const error = err.message ? 'Authentication Failed' : err;
    next(error);
  }
};
