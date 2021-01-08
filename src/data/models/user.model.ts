import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../../config/database";

export class User extends Model {
  public id!: any;
  public name!: string;
  public email!: string;
  public role!: string;
  public documents: Array<string>;
  public location: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      email: {
          type: new DataTypes.STRING(30),
          allowNull: false,
          unique: true
      },
      role: {
        type: new DataTypes.STRING(30),
        allowNull: false,
        unique: true
      },
      documents: {
      type: new DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      unique: true
      },
      location: {
        type: new DataTypes.STRING(),
        allowNull: true,
        unique: true
        },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      tableName: "users",
      sequelize: database, // this bit is important it tells which db we are connecting with
    }
  );
  
  User.sync({ force: false }).then(() => console.log("User table created"));


