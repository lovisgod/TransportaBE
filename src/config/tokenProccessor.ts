import jwt from 'jsonwebtoken';


export class TokenProccessor {
/**
 *
 * @param {object} payload
 * @returns {string} token
 */
 createToken = payload => jwt.sign(payload, 'wellneess1234567890245466566', {
expiresIn: '24h',
  });
  
  /**
   *
   * @param {string} token
   * @returns {object} verifiedToken
   */
 verifyToken = token => jwt.verify(token, 'wellneess1234567890245466566', {
    expiresIn: '24h',
  });
}
