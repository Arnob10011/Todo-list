const developmentLogger = require("./developmentLogger.js");
const productionLogger = require("./productionLogger.js");
let logger = null;

if (process.env.NODE_ENV === "production") {
  logger = productionLogger();
}

if (process.env.NODE_ENV === "development") {
  logger = developmentLogger();
}

module.exports = logger;
