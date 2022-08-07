const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30,
    trim: true,
  },

  completed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
