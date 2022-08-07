const express = require("express");

const route = express.Router();
const Task = require("../model/task.js");

route.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    res.render("update", {
      id: req.params.id,
      name: task.name,
      completed: task.completed,
      title: "Edit Task Manager",
    });
  } catch (error) {
    console.log(error.message);
  }
});

route.get("/data/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);

  res.status(200).json({ task });
});

route.patch("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        completed: req.body.completed,
      },
      { new: true }
    );

    res.status(200).json({ task });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = route;
