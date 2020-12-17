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
exports.AuthController = void 0;
const UserDataSource_1 = require("../../core/data/UserDataSource");
const passwordHash_1 = require("../../config/passwordHash");
const tokenProccessor_1 = require("../../config/tokenProccessor");
class AuthController {
    constructor() {
        this.listUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserDataSource_1.UserDataSource.listUsers();
                return res.send({
                    success: true,
                    message: "Successful",
                    data: users
                });
            }
            catch (error) {
                return res.status(500).send({
                    success: false,
                    message: error,
                    data: null
                });
            }
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const password = new passwordHash_1.PasswordHasher().hashPassword(req.body.password);
                const body = req.body;
                body.password = password;
                const existed = yield UserDataSource_1.UserDataSource.getAUserbyEmail(body.email);
                if (existed) {
                    return res.status(409).send({
                        success: false,
                        message: "User already exist",
                        data: null
                    });
                }
                yield UserDataSource_1.UserDataSource.createUser(body);
                return res.status(200).send({
                    success: true,
                    message: "Account created successfully",
                    data: null
                });
            }
            catch (error) {
                console.log(error);
                console.log(error.message);
                return res.status(500).send({
                    success: false,
                    message: "Internal server error",
                    data: null
                });
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const existed = yield UserDataSource_1.UserDataSource.getAUserbyEmail(body.email);
                if (!existed) {
                    return res.status(404).send({
                        success: false,
                        message: "User not found!!!",
                        data: null
                    });
                }
                const passwordMatch = yield new passwordHash_1.PasswordHasher().comparePassword(body.password, existed.password);
                if (passwordMatch) {
                    const token = new tokenProccessor_1.TokenProccessor().createToken({
                        name: existed.name,
                        email: existed.email,
                        phone: existed.phone
                    });
                    return res.status(200).send({
                        success: true,
                        message: "Login successful",
                        data: {
                            token
                        }
                    });
                }
                else {
                    return res.status(404).send({
                        success: false,
                        message: "Password does not match!!!",
                        data: null
                    });
                }
            }
            catch (error) {
                console.log(error);
                console.log(error.message);
                return res.status(500).send({
                    success: false,
                    message: "Internal server error",
                    data: null
                });
            }
        });
    }
    index(req, res) {
        res.json({
            message: "Hello user welcome to transporta api",
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map