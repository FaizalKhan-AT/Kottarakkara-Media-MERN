const mongoose = require("mongoose");

const live = mongoose.Schema({
  liveUrl: { type: String, required: true },
});

module.exports = mongoose.model("live", live);
