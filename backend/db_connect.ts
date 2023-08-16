import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import Redis from 'ioredis';
dotenv.config();

// const redis:Redis = new Redis({
//     host: process.env.RedisHost, 
//     port: 6379, 
// });


const sequelize: Sequelize = new Sequelize(process.env.MysqlDatabase as string, 'root', process.env.MysqlPassword, {
    host: process.env.MysqlHost,
    dialect: 'mysql',
    port: 3306,
    pool: {
              max: 20,
              min: 0,
              acquire: 30000
            }
  });


export{sequelize};