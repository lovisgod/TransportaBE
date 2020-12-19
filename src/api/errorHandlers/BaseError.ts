/**
 * Base Error class
 * @extends Error
 */

class BaseError extends Error {
    /**
     * Create an BaseError instance
     *
     * @param {number} httpCode - status code of error
     * @param {string} description - error message
     * @param {string} name - error name
     * @param {boolean} isOperational - if error is operational or not
     */

     name: string;
     httpCode: number;
     isOperational: boolean;
     message: string;

    constructor(name, httpCode, isOperational, description) {
      super(description);
      Object.setPrototypeOf(this, new.target.prototype);
  
      this.name = name;
      this.httpCode = httpCode;
      this.isOperational = isOperational;
      this.message = description;
  
    //   Error.captureStackTrace(this);
    }
  }
  
  export default BaseError;
  