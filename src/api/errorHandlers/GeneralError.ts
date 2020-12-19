/* eslint-disable import/extensions */
/* eslint-disable no-useless-constructor */
import BaseError from './BaseError.js';

/**
 * General Error class
 * @extends Error
 */
class GeneralError extends BaseError {

  /**
   * Create an GeneralError instance
   *
   * @param {number} httpCode - status code of error
   * @param {string} description - error message
   * @param {string} name - error name
   * @param {boolean} isOperational - if error is operational or not
   */
  constructor(name, httpCode, isOperational, description) {
    super(name, httpCode, isOperational, description);
  }
}

export default GeneralError;
