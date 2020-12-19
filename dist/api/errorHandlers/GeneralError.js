"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
/* eslint-disable no-useless-constructor */
const BaseError_js_1 = __importDefault(require("./BaseError.js"));
/**
 * General Error class
 * @extends Error
 */
class GeneralError extends BaseError_js_1.default {
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
exports.default = GeneralError;
//# sourceMappingURL=GeneralError.js.map