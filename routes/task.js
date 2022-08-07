require("../error/uncaughtError.js");
const express = require("express");
const route = express.Router();
const Task = require("../model/task.js");
const logger = require("../logger/index.js");

process.on("uncaughtException", (ex) => {
  logger.error(ex.message);
  process.exit(1);
});

route.get("/", (req, res) => {
  res.render("index", { title: "Task Manager" });
});

route.get("/task-data", async (req, res) => {
  const tasks = await Task.find().sort("-date");
  res.status(200).json({ tasks });
});

route.get("/reload", (req, res) => {
  res.redirect("/");
});

route.post("/", async (req, res) => {
  const task = new Task({ name: req.body.name });
  await task.save();

  res.redirect("/");
});

route.delete("/", async (req, res) => {
  const task = await Task.findByIdAndDelete(req.body.id);

  res.status(200).json({ task });
});

module.exports = route;
