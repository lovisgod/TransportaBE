"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    email: {
        type: new sequelize_1.DataTypes.STRING(30),
        allowNull: false
    }
}, {
    tableName: "users",
    sequelize: database_1.database,
});
User.sync({ force: true }).then(() => console.log("User table created"));
//# sourceMappingURL=user.model.js.map