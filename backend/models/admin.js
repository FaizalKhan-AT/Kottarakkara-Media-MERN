const mongoose = require("mongoose");

const admin = mongoose.Schema({
  username: { type: String },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  admin: { type: Boolean, required: true },
});

module.exports = mongoose.model("admin", admin);
