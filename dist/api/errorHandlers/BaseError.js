"use strict";
/**
 * Base Error class
 * @extends Error
 */
Object.defineProperty(exports, "__esModule", { value: true });
class BaseError extends Error {
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
exports.default = BaseError;
//# sourceMappingURL=BaseError.js.map