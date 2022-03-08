import express from 'express';
import 'dotenv/config';
import * as path from 'path';
import {create} from 'express-handlebars';
import {SOURCE_PATH} from './consts.js';
import {home} from './controllers/home.js';
import HandlebarsHelpers from './lib/HandlebarsHelpers.js';
import bodyParser from 'body-parser';
import {createConnection} from 'typeorm';
import entities from './models/index.js';
import {getUsers} from './controllers/api/user.js';
import {
  login,
  logout,
  postLogin,
  postRegister,
  register
} from './controllers/authentication.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.static('public'));

/**
 * Import the body parser
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


/**
 * Import the cookie parser
 */

app.use(cookieParser());

/**
 * Handlebars Init
 */
const hbs = create({
  helpers: HandlebarsHelpers,
  extname: 'hbs'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(SOURCE_PATH, 'views'));

/**
 * App Routing
 */

app.get('/', home);
app.get('/login', login);
app.get('/register', register);
app.post('/register', postRegister);
app.post('/login', postLogin);
app.post('/logout', logout);

/**
 * API Routing
 */

app.get('/api/user', getUsers);

/**
 * Create datbase connection and start listening
 */

createConnection({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  entities,
  // logging: true,
  synchronize: true
}).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Application is running on http://localhost:${process.env.PORT}/.`);
  });
});

