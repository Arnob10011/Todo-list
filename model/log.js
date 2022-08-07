const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  level: {
    type: String,
    minlength: 1,
    maxlength: 10,
    trim: true,
    required: true,
  },

  message: {
    type: String,
    required: true,
    trim: true,
  },
  meta: {
    type: Object,
    default: null,
  },
});

const Log = mongoose.model("Log", logSchema);
module.exports = Log;
