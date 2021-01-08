"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenProccessor = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenProccessor {
    constructor() {
        /**
         *
         * @param {object} payload
         * @returns {string} token
         */
        this.createToken = payload => jsonwebtoken_1.default.sign(payload, 'wellneess1234567890245466566', {
            expiresIn: '24h',
        });
        /**
         *
         * @param {string} token
         * @returns {object} verifiedToken
         */
        this.verifyToken = token => jsonwebtoken_1.default.verify(token, 'wellneess1234567890245466566', {
            expiresIn: '24h',
        });
    }
}
exports.TokenProccessor = TokenProccessor;
//# sourceMappingURL=tokenProccessor.js.map