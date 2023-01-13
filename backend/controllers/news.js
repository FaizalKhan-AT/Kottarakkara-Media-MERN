const news = require("../models/news");
const fs = require("fs");
const path = require("path");
const Live = require("../models/live");
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
    published,
    url,
  } = req.body;
  try {
    const [d, m, y] = postedAt.split("/");
    const response = await news.create({
      category,
      external,
      format: format === "" ? "embed" : format,
      newsContent,
      place,
      titleEng,
      titleMal,
      type: url !== "" ? "video" : type,
      likes,
      views,
      userId,
      file: !req.file && url !== "" ? url : req.file.path,
      author,
      postedAt,
      tags,
      published,
      date: new Date(m + "-" + d + "-" + y),
    });
    return res.json({
      status: "ok",
      data: "News uploaded successfully",
    });
  } catch (err) {
    console.log(err);
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
    const images = await news
      .find({ published: true, type: "image" })
      .limit(15)
      .sort({ date: -1 });
    const videos = await news
      .find({ published: true, type: "video" })
      .limit(5)
      .sort({ date: -1 });
    if (images && !videos)
      return res.status(200).json({ status: "ok", data: images });
    if (videos && !images)
      return res.status(200).json({ status: "ok", data: videos });
    let result = [];
    if (images && videos) {
      const length = images.length + videos.length;
      for (let i = 0; i < length; i++) {
        if (i % 5 === 0) {
          if (videos.length < 1) break;
          result.push(videos.shift());
        } else {
          if (images.length < 1) break;
          result.push(images.shift());
        }
      }
      return res.status(200).json({ status: "ok", data: result });
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
  if (data.url !== "") {
    data = { ...data, file: data.url };
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
const likeSinglePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await news.findOne({ _id: id });
    if (post) {
      post.likes++;
      await post.save();
      return res
        .status(200)
        .json({ status: "ok", data: "post liked successfully" });
    } else
      return res
        .status(404)
        .json({ status: "error", error: "no post with that id" });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: "Something went wrong :( internal server error",
    });
  }
};
const getRelatedNews = async (req, res) => {
  const { category, id } = req.params;
  let cat = category.replace("-", " ");
  try {
    const posts = await news.find({
      _id: { $ne: id },
      category: cat,
      type: "image",
      published: true,
    });
    if (posts) {
      return res.status(200).json({ status: "ok", data: posts });
    } else
      return res
        .status(404)
        .json({ status: "error", error: "no related posts found" });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: "Something went wrong :( internal server error",
    });
  }
};
const getTrendingNews = async (req, res) => {
  try {
    const posts = await news.find({ trending: true });
    if (posts) {
      return res.status(200).json({ status: "ok", data: posts });
    } else
      return res.status(404).json({
        status: "error",
        error: "something went wrong :( while fetching the trending news",
      });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: "something went wrong :( while fetching the news",
    });
  }
};
const getLiveNews = async (req, res) => {
  try {
    const live = await Live.find({});
    if (live) {
      return res
        .status(200)
        .json({ status: "ok", data: live[live.length - 1] });
    } else
      return res.status(404).json({
        status: "error",
        error: "something went wrong :( while fetching the url",
      });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: "something went wrong :( while fetching the url",
    });
  }
};
const updateLiveNews = async (req, res) => {
  try {
    await Live.deleteMany({});
    const live = await Live.create({ liveUrl: req.body.url });
    if (live) {
      return res.status(200).json({ status: "ok", data: "live url updated" });
    } else
      return res.status(404).json({
        status: "error",
        error: "something went wrong :( while fetching the url",
      });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: "something went wrong :( while fetching the url",
    });
  }
};
const getAllNews = async (req, res) => {
  try {
    const posts = await news
      .find({ published: true, type: "image" })
      .sort({ date: -1 });
    if (posts) {
      return res.status(200).json({ status: "ok", data: posts });
    } else
      return res.status(404).json({
        status: "error",
        error: "something went wrong :( posts not found",
      });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: "something went wrong :( while fetching the news",
    });
  }
};
const getAllPlaces = async (req, res) => {
  try {
    const places = await news
      .find({ published: true }, { _id: 0, place: 1 })
      .distinct("place");
    if (places) {
      return res.status(200).json({ status: "ok", data: places });
    } else
      return res.status(404).json({
        status: "error",
        error: "something went wrong :( places not found",
      });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: "something went wrong :( internal server error",
    });
  }
};
const filterNews = async (req, res) => {
  const { category, type, time, place, sort } = req.params;
  const cat = category.replace("-", " ");
  let pla = "";
  if (place) pla = place.replaceAll("-", " ");
  let obj = { published: true };
  let sobj = { likes: "desc" };
  try {
    switch (cat) {
      case "all":
        obj = { ...obj };
        break;
      default:
        obj = { ...obj, category: cat };
        break;
    }
    switch (type) {
      case "all":
        obj = { ...obj };
        break;
      default:
        obj = { ...obj, type: type };
        break;
    }
    switch (time) {
      case "oldest":
        sobj = { date: 1 };
        break;
      case "newest":
        sobj = { date: -1 };
      default:
        break;
    }

    if (place) obj = { ...obj, place: pla };
    const posts = await news.find(obj).sort(sobj);
    if (posts) {
      return res.status(200).json({ status: "ok", data: posts });
    } else
      return res.status(404).json({
        status: "error",
        error: "something went wrong :( posts not found",
      });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: "something went wrong :( while fetching the news",
    });
  }
};
const filterCategoryNews = async (req, res) => {
  const { category } = req.params;
  const cat = category.replace("-", " ");
  try {
    const posts = await news
      .find({ published: true, category: cat })
      .sort({ likes: "desc" });

    if (posts) {
      return res.status(200).json({ status: "ok", data: posts });
    } else
      return res.status(404).json({
        status: "error",
        error: "something went wrong :( posts not found",
      });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: "something went wrong :( while fetching the news",
    });
  }
};
module.exports = {
  uploadNews,
  getLatestNews,
  getSingleNews,
  updateSingleNews,
  likeSinglePost,
  deleteSingleNews,
  getRelatedNews,
  getTrendingNews,
  getLiveNews,
  updateLiveNews,
  getAllNews,
  getAllPlaces,
  filterNews,
  filterCategoryNews,
};
