import express from "express";
import "dotenv/config";
import * as path from "path";
import { create } from "express-handlebars";
import { SOURCE_PATH } from "./consts.js";
import { home } from "./controllers/home.js";
import entities from "./models/index.js";
const { createConnection, getConnection } = typeorm;
import typeorm from "typeorm";
import bodyParser from "body-parser";
const app = express();
app.use(express.static("public"));

/**
 * Handlebars Init
 */
const hbs = create({
  extname: "hbs",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(SOURCE_PATH, "views"));

// When sending data via a body (e.g. POSTing a form)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * App Routing
 */
app.get("/", home);

/**
 * Init TypeORM
 */
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

export default app;
