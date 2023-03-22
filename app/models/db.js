import { createConnection } from "mysql";
import { HOST, USER, PASSWORD, DB, PORT } from "../config/db.config.js";

const connection = createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DB,
  port: PORT
});

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

export default connection;
