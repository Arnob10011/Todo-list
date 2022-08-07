const logger = require("../logger/index.js");
const Log = require("../model/log.js");
module.exports = async function (err, req, res, next) {
  // log the excption

  logger.error(err.message);
};
