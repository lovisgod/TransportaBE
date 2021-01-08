import { Sequelize } from "sequelize";

export const database = new Sequelize({
  database: "d59lugjjuo4sb4",
   password: "ccb5c8429f476bcfd70f35725d5e81c0c3ae60eddcf632f58c97f31653256810",
   username:"sjkbdomwzsbeco",
   host: "ec2-18-235-107-171.compute-1.amazonaws.com",
   port: 5432,
   dialect: "postgres"
});