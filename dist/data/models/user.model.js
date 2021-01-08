"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../../config/database");
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
        allowNull: false,
        unique: true
    },
    role: {
        type: new sequelize_1.DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    documents: {
        type: new sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        allowNull: true,
        unique: true
    },
    location: {
        type: new sequelize_1.DataTypes.STRING(),
        allowNull: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: "users",
    sequelize: database_1.database,
});
User.sync({ force: false }).then(() => console.log("User table created"));
//# sourceMappingURL=user.model.js.map