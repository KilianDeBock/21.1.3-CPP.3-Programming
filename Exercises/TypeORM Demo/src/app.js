import express from "express";
import "dotenv/config";
import * as path from "path";
import { create } from "express-handlebars";
import { SOURCE_PATH } from "./consts.js";
import { home, homePostInterest } from "./controllers/home.js";
import HandlebarsHelpers from "./lib/HandlebarsHelpers.js";
import bodyParser from "body-parser";
import { createConnection } from "typeorm";
import entities from "./models/index.js";
import {
  deleteObject,
  getObject,
  postObject,
  updateObject,
} from "./controllers/api/object.js";
import {
  deleteUser,
  getUser,
  postUser,
  updateUser,
} from "./controllers/api/user.js";

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
app.post("/postInterest", homePostInterest);

/**
 * API Routing
 */
app.get("/api/user", getUser);
app.post("/api/user", postUser);
app.delete("/api/user/:id", deleteUser);
app.put("/api/user", updateUser);

app.get("/api/interest", (req, res, next) =>
  getObject("Interest", req, res, next)
);
app.post("/api/interest", (req, res, next) =>
  postObject("Interest", req, res, next)
);
app.delete("/api/interest/:id", (req, res, next) =>
  deleteObject("Interest", req, res, next)
);
app.put("/api/interest", (req, res, next) =>
  updateObject("Interest", req, res, next)
);

createConnection({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  entities,
  synchronize: true,
}).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      `Application is running on http://localhost:${process.env.PORT}/.`
    );
  });
});
