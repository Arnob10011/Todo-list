const express = require("express");
const tasks = require("../routes/task.js");
const error = require("../middleware/error.js");
const updateTasks = require("../routes/updateTask.js");

module.exports = function (app) {
  app.use(express.static("public"));
  app.set("view engine", "ejs");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/", tasks);
  app.use("/task-update", updateTasks);
  app.use(error);
};
