const news = require("../models/news");
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
    return res.json({
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
      return res.json({ status: "ok", data: post });
    } else return res.json({ status: "error", error: "post not found" });
  } catch (error) {
    return res.json({
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
      return res.json({ status: "ok", data: posts });
    } else
      return res.json({
        status: "error",
        error: "something went wrong :( while fetching the news",
      });
  } catch (err) {
    return res.json({
      status: "error",
      error: "something went wrong :( while fetching the news",
    });
  }
};

module.exports = {
  uploadNews,
  getLatestNews,
  getSingleNews,
};
