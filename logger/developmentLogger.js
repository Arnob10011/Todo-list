const winston = require("winston");

const myFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp}: [${level}] ${message}`;
});

module.exports = function () {
  return winston.createLogger({
    level: "debug",
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({ format: "HH:mm:ss" }),
      myFormat
    ),

    transports: [new winston.transports.Console()],
  });
};
