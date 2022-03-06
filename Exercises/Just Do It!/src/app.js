import express from "express";
import "dotenv/config";
import * as path from "path";
import { create } from "express-handlebars";
import { SOURCE_PATH } from "./consts.js";
import {
  home,
  homePostCategory,
  homePostTag,
  homePostTask,
} from "./controllers/home.js";
import HandlebarsHelpers from "./lib/Handlebarshelpers.js";
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
app.post("/postCategory", homePostCategory);
app.post("/postTodo", homePostTask);
app.post("/postTag", homePostTag);

app.post("/api/user/:userId/category/:categoryId/task", (req, res, next) =>
  postObject(
    "Task",
    ["categories", "categories.tasks", "categories.tasks.tags"],
    req,
    res,
    next
  )
);

app.get("/api/user", getUser);
app.post("/api/user", postUser);
app.delete("/api/user/:id", deleteUser);
app.put("/api/user", updateUser);

app.get("/api/task", (req, res, next) => getObject("Task", req, res, next));
app.post("/api/task", (req, res, next) =>
  postObject(
    "Task",
    ["categories", "categories.tasks", "categories.tasks.tags"],
    req,
    res,
    next
  )
);
app.delete("/api/task/:id", (req, res, next) =>
  deleteObject("Task", req, res, next)
);
app.put("/api/task", (req, res, next) => updateObject("Task", req, res, next));

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
