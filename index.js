import express, { json, urlencoded } from "express";
import cors from "cors";
import cron from 'node-cron';
import routes from './app/routes/routes.js';
import init from "./app/dbInitialize.js";
import droneController from "./app/controllers/droneController.js";

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.use("/api", routes);

await init(); // Insert fake data to DB

cron.schedule('*/1 * * * *', async () => { // Get battery level of drones every minute
  await droneController.getBatteryLevelOfAllDrones();
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
