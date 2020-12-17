"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataSource = void 0;
const user_model_1 = require("../../data/models/user.model");
class UserDataSource extends user_model_1.User {
    static listUsers() {
        return this.findAll({
            attributes: {
                exclude: ['password'],
            },
            order: [
                ['createdAt', 'DESC'],
            ],
        });
    }
    static createUser(user) {
        return this.create(user);
    }
    static getAUserbyEmail(email, password) {
        if (password) {
            return this.findOne({
                where: {
                    email,
                    password
                },
            });
        }
        else {
            return this.findOne({
                where: {
                    email
                },
            });
        }
    }
}
exports.UserDataSource = UserDataSource;
//# sourceMappingURL=UserDataSource.js.map