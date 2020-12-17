"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataSource = void 0;
const user_model_1 = require("../models/user.model");
class UserDataSource extends user_model_1.User {
    static listUsers() {
        return this.findAll({});
    }
    static createUser(user) {
        return this.create(user);
    }
}
exports.UserDataSource = UserDataSource;
//# sourceMappingURL=UserDataSource.js.map