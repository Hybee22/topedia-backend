import dotenv from "dotenv";
dotenv.config();
// Global Events
import "./events/bootstrap.js";
// import "./sockets/bootstrap";

import express, { json, urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import errorHandler from "./middlewares/error-handler.js";
import { successResMsg } from "./utilities/response.js";

import colorSeeder from "./seeders/colors.js";

import db from "./models/index.js";

db.sequelize.sync({}).then(() => {
  colorSeeder();
});

const app = express();

// CORS
app.use(cors());

// MIDDLEWARES
app.use(helmet());
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));

// Default Route
app.get("/", (req, res) => {
  return successResMsg(res, 200, {
    message: "Welcome to the Tasks App API",
  });
});

// Routes
import routes from "./routes/index.js";

// ************ REGISTER ROUTES HERE ********** //
routes(app);
// ************ END ROUTES REGISTRATION ********** //

// Global error handler
app.use(errorHandler);

export default app;
