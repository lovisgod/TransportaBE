"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = __importDefault(require("./BaseError"));
const StatusCode_1 = __importDefault(require("./StatusCode"));
/**
 * Server Error class
 * @extends Error
 */
class ServerError extends BaseError_1.default {
    /**
     * Create an GeneralError instance
     *
     * @param {number} httpCode - status code of error
     * @param {string} description - error message
     * @param {string} name - error name
     * @param {boolean} isOperational - if error is operational or not
     */
    constructor(name, httpCode = StatusCode_1.default.INTERNAL_SERVER, isOperational = true, description = 'internal server error') {
        super(name, httpCode, isOperational, description);
    }
}
exports.default = ServerError;
//# sourceMappingURL=ServerError.js.map