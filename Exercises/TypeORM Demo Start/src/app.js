import express from "express";
import "dotenv/config";
import * as path from "path";
import { create } from "express-handlebars";
import { SOURCE_PATH } from "./consts.js";
import { home } from "./controllers/home.js";
import HandlebarsHelpers from "./lib/HandlebarsHelpers.js";
import bodyParser from "body-parser";
import { createConnection } from "typeorm";
import entities from "./models/index.js";
import {
  deleteInterest,
  getInterest,
  postInterest,
  updateInterest,
} from "./controllers/api/interest.js";

const app = express();
app.use(express.static("public"));

/**
 * Body parser Init
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Handlebars Init
 */
const hbs = create({
  helpers: HandlebarsHelpers,
  extname: "hbs",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(SOURCE_PATH, "views"));

/**
 * App Routing
 */
app.get("/", home);

/**
 * API Routing
 */

app.get("/api/interest", getInterest);
app.post("/api/interest", postInterest);
app.delete("/api/interest/:id", deleteInterest);
app.put("/api/interest", updateInterest);

createConnection({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  entities,
  synchronize: true,
}).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      `Application is runninig on http://localhost:${process.env.PORT}/.`
    );
  });
});
