const winston = require("winston");
require("winston-mongodb");
const myFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `[${level}] ${timestamp}: ${message}`;
});

const mongodbFormat = new winston.transports.MongoDB({
  db: "mongodb://localhost/todo",
  level: "error",
  options: { useUnifiedTopology: true },
});

module.exports = function () {
  return winston.createLogger({
    level: "info",
    meta: false,
    format: winston.format.combine(winston.format.timestamp(), myFormat),

    transports: [
      new winston.transports.File({
        filename: "log/error.log",
        level: "error",
      }),
      mongodbFormat,
    ],
  });
};
