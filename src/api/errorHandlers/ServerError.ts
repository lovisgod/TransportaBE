import BaseError from './BaseError';
import HttpStatusCode from './StatusCode';

/**
 * Server Error class
 * @extends Error
 */
class ServerError extends BaseError {
  /**
   * Create an GeneralError instance
   *
   * @param {number} httpCode - status code of error
   * @param {string} description - error message
   * @param {string} name - error name
   * @param {boolean} isOperational - if error is operational or not
   */
  constructor(name,
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    isOperational = true, description = 'internal server error') {
    super(name, httpCode, isOperational, description);
  }
}

export default ServerError;
