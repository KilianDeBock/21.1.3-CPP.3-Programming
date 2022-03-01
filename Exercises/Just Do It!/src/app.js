import express from "express";
import "dotenv/config";
import * as path from "path";
import { create } from "express-handlebars";
import { SOURCE_PATH } from "./consts.js";
import { home } from "./controllers/home.js";
import HandlebarsHelpers from "./lib/Handlebarshelpers.js";
import bodyParser from "body-parser";
import { createConnection } from "typeorm";
import entities from "./models/index.js";
import {
  deleteTask,
  getTask,
  postTask,
  updateTask,
} from "./controllers/api/object.js";

const app = express(),
  port = process.env.PORT || 8080;
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

app.get("/api/task", (req, res, next) => getTask("Task", req, res, next));
app.post("/api/task", (req, res, next) => postTask("Task", req, res, next));
app.delete("/api/task/:id", (req, res, next) =>
  deleteTask("Task", req, res, next)
);
app.put("/api/task", (req, res, next) => updateTask("Task", req, res, next));

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
