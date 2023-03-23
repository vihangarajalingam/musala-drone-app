import Sequelize from "sequelize";
import mysql from "mysql2";
import { HOST, USER, PASSWORD, DB, PORT } from "../config/db.config.js";

const connection = mysql.createConnection({ host: HOST, port: PORT, user: USER, password: PASSWORD });
connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB}\`;`);

const sequelizeCC = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: 'mysql'
});

try {
  await sequelizeCC.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default sequelizeCC;
