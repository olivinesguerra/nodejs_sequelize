import { Sequelize } from "sequelize-typescript";
import { Block, Transaction } from "../../database/models";

export const config = {
    HOST: process.env.DATABASE_HOST,
    USER: process.env.DATABASE_USERNAME,
    PASSWORD: process.env.DATABASE_PASSWORD,
    DB: process.env.DATABASE_DATABASE,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};
  
export const dialect = "postgres";

const sequelize = new Sequelize({
  database: config.DB,
  username: config.USER,
  password: config.PASSWORD,
  host: config.HOST,
  dialect: dialect,
  logging: true,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  },
  models: [Block, Transaction]
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the Database:", err);
  })

export {
  sequelize
};