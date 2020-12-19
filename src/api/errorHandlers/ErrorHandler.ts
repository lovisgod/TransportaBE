/* eslint-disable class-methods-use-this */

import { GeneralReponse } from '../responses/generalRespose';
import BaseError from './BaseError.js';

class ErrorHandler {
 
    generalRespose = new GeneralReponse()

  async handleError(err, res) {
      console.log("it's getting here");
    // handle loggin later
    if (err instanceof BaseError) {
      console.error(err.message);
      await this.generalRespose.sendErrorResponse(res, err.httpCode, err.message);
    }
  }

  isTrustedError(error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}

export default new ErrorHandler();
