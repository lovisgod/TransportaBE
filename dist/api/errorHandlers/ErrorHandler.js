"use strict";
/* eslint-disable class-methods-use-this */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generalRespose_1 = require("../responses/generalRespose");
const BaseError_js_1 = __importDefault(require("./BaseError.js"));
class ErrorHandler {
    constructor() {
        this.generalRespose = new generalRespose_1.GeneralReponse();
    }
    handleError(err, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("it's getting here");
            // handle loggin later
            if (err instanceof BaseError_js_1.default) {
                console.error(err.message);
                yield this.generalRespose.sendErrorResponse(res, err.httpCode, err.message);
            }
        });
    }
    isTrustedError(error) {
        if (error instanceof BaseError_js_1.default) {
            return error.isOperational;
        }
        return false;
    }
}
exports.default = new ErrorHandler();
//# sourceMappingURL=ErrorHandler.js.map