const mongoose = require("mongoose");

const news = mongoose.Schema({
  category: { type: String, required: true },
  external: { type: Boolean, required: true },
  file: { type: String, required: true },
  format: { type: String, required: true },
  newsContent: { type: String, required: true },
  place: { type: String, required: true },
  titleEng: { type: String, required: true },
  titleMal: { type: String, required: true },
  type: { type: String, required: true },
  likes: { type: Number, required: true },
  views: { type: Number, required: true },
  userId: { type: String, required: true },
  postedAt: { type: String, required: true },
  author: { type: String, required: true },
  tags: [{ type: String, required: true }],
});

module.exports = mongoose.model("post", news);
