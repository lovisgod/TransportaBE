import jwt from 'jsonwebtoken';


export class TokenProccessor {
/**
 *
 * @param {object} payload
 * @returns {string} token
 */
 createToken = payload => jwt.sign(payload, 'transaporta1234567890', {
expiresIn: '24h',
  });
  
  /**
   *
   * @param {string} token
   * @returns {object} verifiedToken
   */
 verifyToken = token => jwt.verify(token, 'transaporta1234567890', {
    expiresIn: '24h',
  });
}
