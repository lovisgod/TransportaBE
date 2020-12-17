"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordHasher = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class PasswordHasher {
    constructor() {
        /**
     * Encrypts password to store in db
     * @param password
     */
        this.hashPassword = (password) => bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(8));
        /**
         * Compare inserted password with encrypted stored password
         * @param hashed
         * @param password
         */
        this.comparePassword = (password, hashed) => bcrypt_1.default.compareSync(password, hashed);
    }
}
exports.PasswordHasher = PasswordHasher;
//# sourceMappingURL=passwordHash.js.map