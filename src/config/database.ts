import { Sequelize } from "sequelize";

export const database = new Sequelize({
  database: "transporta_db",
  dialect: "sqlite",
  storage: ":memory:",
});