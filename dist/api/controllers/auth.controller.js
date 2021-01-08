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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const UserDataSource_1 = require("../../core/data/UserDataSource");
const passwordHash_1 = require("../../config/passwordHash");
const tokenProccessor_1 = require("../../config/tokenProccessor");
const GeneralError_1 = __importDefault(require("../../api/errorHandlers/GeneralError"));
const generalRespose_1 = require("../responses/generalRespose");
class AuthController {
    constructor() {
        this.listUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserDataSource_1.UserDataSource.listUsers();
                return new generalRespose_1.GeneralReponse().sendSuccessResponse(res, 200, { users });
            }
            catch (error) {
                next(error);
            }
        });
        this.createUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const password = new passwordHash_1.PasswordHasher().hashPassword(req.body.password);
                const body = req.body;
                body.password = password;
                const existed = yield UserDataSource_1.UserDataSource.getAUserbyEmail(body.email);
                if (existed) {
                    throw new GeneralError_1.default("not exist", 409, true, "User already exist");
                }
                yield UserDataSource_1.UserDataSource.createUser(body);
                return new generalRespose_1.GeneralReponse().sendSuccessResponse(res, 200, { message: "sign up successful" });
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const existed = yield UserDataSource_1.UserDataSource.getAUserbyEmail(body.email);
                if (!existed) {
                    throw new GeneralError_1.default("not found", 404, true, "User not found!!");
                }
                const passwordMatch = yield new passwordHash_1.PasswordHasher().comparePassword(body.password, existed.password);
                if (passwordMatch) {
                    const token = new tokenProccessor_1.TokenProccessor().createToken({
                        name: existed.name,
                        email: existed.email,
                        role: existed.role,
                    });
                    return new generalRespose_1.GeneralReponse().sendSuccessResponse(res, 200, { token });
                }
                else {
                    throw new GeneralError_1.default("error", 404, true, "Password does not match!!!");
                }
            }
            catch (error) {
                next(error);
            }
        });
        this.getUserProfile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.body.userData != null) {
                    return new generalRespose_1.GeneralReponse().sendSuccessResponse(res, 200, { data: req.body.userData });
                }
                else {
                    throw new GeneralError_1.default("error", 404, true, "User not found!!!");
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    index(req, res) {
        res.json({
            message: "Hello user welcome to wellness api",
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map