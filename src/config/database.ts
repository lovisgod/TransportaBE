import { Sequelize } from "sequelize";

export const database = new Sequelize({
  database: "wellness_db",
  dialect: "sqlite",
  storage: ":memory:",
});