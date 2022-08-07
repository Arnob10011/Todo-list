require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
require("./startup/routes.js")(app);
require("./error/uncaughtError.js");

const start = require("./startup/start.js");

const logger = require("./logger/index.js");

logger.info(process.env.NODE_ENV);

// start
start(app);
