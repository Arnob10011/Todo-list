const connect = require("../db/connect.js");
const logger = require("../logger/index.js");

module.exports = function (app) {
  const mongodbURI = process.env.MONGO_URI || "mongodb://localhost/todo";
  connect(mongodbURI);
  const port = process.env.PORT || process.env.LOCAL_PORT;
  app.listen(port, () => logger.info(`Listening to ${port}....`));
};
