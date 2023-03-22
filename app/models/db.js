import Sequelize from "sequelize";
import { HOST, USER, PASSWORD, DB, PORT } from "../config/db.config.js";

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
