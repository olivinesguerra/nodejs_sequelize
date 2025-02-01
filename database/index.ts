import dotenv from 'dotenv';
import { Sequelize } from "sequelize-typescript";
import { Block, Transaction } from "../database/models";

dotenv.config()

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

console.log(config);
  
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

export const init = () => {
  return new Promise((resolve, reject) => {
    sequelize
      .authenticate()
      .then(() => {
        sequelize.sync({ force: false });
        console.log("Connection has been established successfully.");
        resolve(null);
      })
      .catch((err) => {
        console.error("Unable to connect to the Database:", err);
        reject(err);
      })
  }); 
}



module.exports = {
  sequelize,
  init
};