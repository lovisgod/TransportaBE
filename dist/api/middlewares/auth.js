"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthChecker = void 0;
const tokenProccessor_1 = require("../../config/tokenProccessor");
const UserDataSource_1 = require("../../core/data/UserDataSource");
class AuthChecker {
    constructor() {
        // eslint-disable-next-line consistent-return
        this.check = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.headers.authorization) {
                    return res.status(401).send("Authorization required!!!");
                }
                const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
                const { email } = new tokenProccessor_1.TokenProccessor().verifyToken(token);
                const user = yield UserDataSource_1.UserDataSource.getAUserbyEmail(email, null, true);
                if (!user) {
                    return res.status(404).send({
                        success: false,
                        message: "user does not exist",
                        data: null
                    });
                }
                req.body.userData = user;
                next();
            }
            catch (err) {
                const error = err.message ? 'Authentication Failed' : err;
                next(error);
            }
        });
    }
}
exports.AuthChecker = AuthChecker;
//# sourceMappingURL=auth.js.map