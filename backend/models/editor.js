const mongoose = require("mongoose");

const editor = mongoose.Schema({
  username: { type: String },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
});

module.exports = mongoose.model("editor", editor);
