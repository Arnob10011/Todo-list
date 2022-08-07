const mongoose = require("mongoose");
const logger = require("../logger/index.js");
module.exports = function (url) {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => logger.info("Connected to mongodb....."));
};
