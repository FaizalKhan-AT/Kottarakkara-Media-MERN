const news = require("../models/news");
const fs = require("fs");
const path = require("path");

const uploadNews = async (req, res) => {
  const {
    category,
    external,
    format,
    newsContent,
    place,
    titleEng,
    titleMal,
    type,
    likes,
    views,
    userId,
    author,
    postedAt,
    tags,
  } = req.body;
  try {
    const response = await news.create({
      category,
      external,
      format,
      newsContent,
      place,
      titleEng,
      titleMal,
      type,
      likes,
      views,
      userId,
      file: req.file.path,
      author,
      postedAt,
      tags,
    });
    return res.json({
      status: "ok",
      data: "News uploaded successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error:
        "Something went wrong :( couldn't post the news..! try again later",
    });
  }
};
const getSingleNews = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await news.findById(id);
    if (post) {
      post.views++;
      await post.save();
      return res.status(200).json({ status: "ok", data: post });
    } else
      return res.status(404).json({ status: "error", error: "post not found" });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: "something went wrong :( ",
    });
  }
};
const getLatestNews = async (req, res) => {
  try {
    const posts = await news.find({}).limit(20).sort({ postedAt: -1 });
    if (posts) {
      let result = [];
      const length = posts.length;
      return res.status(200).json({ status: "ok", data: posts });
    } else
      return res.status(404).json({
        status: "error",
        error: "something went wrong :( while fetching the news",
      });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: "something went wrong :( while fetching the news",
    });
  }
};
const handleFileDelete = (fp) => {
  let filename = path.join(__dirname, "..", fp);
  let tempFile = fs.openSync(filename, "r");

  fs.closeSync(tempFile);

  fs.unlinkSync(filename);
};
const updateSingleNews = async (req, res) => {
  let data = req.body;
  if (req.file) {
    handleFileDelete(data.path);
    data = { ...data, file: req.file.path };
  }
  try {
    const post = await news.findOneAndUpdate({ _id: req.body._id }, data, {
      new: true,
      runValidators: true,
    });
    if (post)
      return res
        .status(200)
        .json({ status: "ok", data: "post updated successfully" });
    else
      return res
        .status(404)
        .json({ status: "error", error: "no post with that id" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", error: "something went wrong :(" });
  }
};

const deleteSingleNews = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await news.findOneAndDelete({ _id: id });
    if (post) {
      handleFileDelete(post.file);
      return res
        .status(200)
        .json({ status: "ok", data: "Post deleted successfully" });
    } else
      return res.status(404).json({
        status: "error",
        error: "Couldn't delete the post, post doesn't exist",
      });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: "Something went wrong :( internal server error",
    });
  }
};
module.exports = {
  uploadNews,
  getLatestNews,
  getSingleNews,
  updateSingleNews,
  deleteSingleNews,
};
