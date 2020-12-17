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
exports.NodesController = void 0;
const UserDataSource_1 = require("../data/UserDataSource");
class NodesController {
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
                const body = req.body;
                const user = yield UserDataSource_1.UserDataSource.createUser(body);
                return res.status(200).send({
                    success: true,
                    message: "Successful",
                    data: user
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
    }
    index(req, res) {
        res.json({
            message: "Hello boi",
        });
    }
}
exports.NodesController = NodesController;
//# sourceMappingURL=node.controller.js.map