const admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const editor = require("../models/editor");
const news = require("../models/news");
const Login = async (req, res) => {
  const { email, password } = req.body;
  const user = await admin.findOne({ email }).lean();
  if (!user)
    return res.status(404).json({ status: "error", error: "Admin not found" });
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      {
        id: user._id,
        admin: user.admin,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10d",
      }
    );
    delete user.password;
    return res.status(200).json({
      status: "ok",
      data: { ...user, token },
    });
  }
  return res.json({ status: "error", error: "Invalid email / password" });
};
const addNewAdmin = async (req, res) => {
  const { password } = req.body;

  try {
    const pas = await bcrypt.hash(password, 10);
    const response = await admin.create({
      ...req.body,
      password: pas,
    });
    return res
      .status(200)
      .json({ status: "ok", data: "admin created successfully" });
  } catch (err) {
    if (err.code === 11000) {
      return res.json({
        status: "error",
        error: "Email address already Exists",
      });
    } else {
      return res.status(500).json({
        status: "error",
        error: "Something went Wrong!!...",
      });
    }
  }
};
const getAdmin = (req, res) => {
  if (!req.user)
    return res.status(404).json({
      status: "error",
      error: "admin not found or doesn't exist",
    });

  return res.status(200).json({ status: "ok", data: req.user });
};
const getAllEditors = async (req, res) => {
  try {
    const editors = await editor.find({});
    if (editors) {
      return res.status(200).json({ status: "ok", data: editors });
    } else
      return res.status(404).json({
        status: "error",
        error: "something went wrong :( while fetching the editors",
      });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: "something went wrong :( internal error",
    });
  }
};
const deleteSingleEditor = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await editor.findOneAndDelete({ _id: id });
    if (user) {
      return res
        .status(200)
        .json({ status: "ok", data: "Editor deleted successfully" });
    } else
      return res.status(404).json({
        status: "error",
        error: "Couldn't delete the Editor, editor doesn't exist",
      });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: "Something went wrong :( internal server error",
    });
  }
};
const getExternalEditors = async (req, res) => {
  const editors = await editor.find({ external: true });
  if (editors) {
    return res.status(200).json({ status: "ok", data: editors });
  } else
    return res.status(404).json({
      status: "error",
      error: "No External Editors are present",
    });
};
const getInternalEditors = async (req, res) => {
  const editors = await editor.find({ external: false });
  if (editors) {
    return res.status(200).json({ status: "ok", data: editors });
  } else
    return res.status(404).json({
      status: "error",
      error: "No internal editors are present",
    });
};
const getPublishedNews = async (req, res, type, time) => {
  let object = { published: true };
  let posts = [];

  switch (type) {
    case "video":
      object = { ...object, type };
      break;
    case "image":
      object = { ...object, type };
      break;
  }

  if (time) {
    posts = await news
      .find(object)
      .sort({ date: time === "oldest" ? 1 : -1, likes: "asc" });
  } else posts = await news.find(object).sort({ likes: "asc" });
  if (posts) {
    return res.status(200).json({ status: "ok", data: posts });
  } else
    return res.status(404).json({
      status: "error",
      error: "No Published news where found..",
    });
};
const getNonPublishedNews = async (req, res, type, time) => {
  let object = { published: false };
  let posts = [];
  switch (type) {
    case "video":
      object = { ...object, type };
      break;
    case "image":
      object = { ...object, type };
      break;
    default:
      break;
  }

  if (time) {
    posts = await news
      .find(object)
      .sort({ date: time === "oldest" ? 1 : -1, likes: "asc" });
  } else posts = await news.find(object).sort({ likes: "asc" });

  if (posts) {
    return res.status(200).json({ status: "ok", data: posts });
  } else
    return res.status(404).json({
      status: "error",
      error: "No un published news where found..",
    });
};
const getTrendingNews = async (req, res) => {
  const posts = await news.find({ trending: true });
  if (posts) {
    return res.status(200).json({ status: "ok", data: posts });
  } else
    return res.status(404).json({
      status: "error",
      error: "No Trending news found ",
    });
};
const filterData = async (req, res) => {
  const { category: cat, type: ty, time } = req.params;
  const category = cat.replace("-", " ");
  let type = "";
  if (ty) {
    type = ty.replace("-", " ");
  }
  try {
    switch (category) {
      case "all editors":
        getAllEditors(req, res);
        break;
      case "external editors":
        getExternalEditors(req, res);
        break;
      case "internal editors":
        getInternalEditors(req, res);
        break;
      case "published news":
        getPublishedNews(req, res, type, time);
        break;
      case "non published news":
        getNonPublishedNews(req, res, type, time);
        break;
      case "trending news":
        getTrendingNews(req, res);
        break;
      default:
        break;
    }
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: "something went wrong :( internal error",
    });
  }
};
const publishPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await news.findOneAndUpdate({ _id: id }, { published: true });
    if (post) {
      return res
        .status(200)
        .json({ status: "ok", data: "Post published successfully" });
    } else
      return res.status(404).json({
        status: "error",
        error: "Couldn't publish the post",
      });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: "Something went wrong :( internal server error",
    });
  }
};
const unPublishPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await news.findOneAndUpdate({ _id: id }, { published: false });
    if (post) {
      return res
        .status(200)
        .json({ status: "ok", data: "Post unpublished successfully" });
    } else
      return res.status(404).json({
        status: "error",
        error: "Couldn't unpublish the post",
      });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: "Something went wrong :( internal server error",
    });
  }
};
const removeTrending = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await news.findOneAndUpdate({ _id: id }, { trending: false });
    if (post) {
      return res
        .status(200)
        .json({ status: "ok", data: "Post removed from trending" });
    } else
      return res.status(404).json({
        status: "error",
        error: "Couldn't remove the post from trending",
      });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: "Something went wrong :( internal server error",
    });
  }
};
const setTrending = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await news.findOneAndUpdate({ _id: id }, { trending: true });
    if (post) {
      return res
        .status(200)
        .json({ status: "ok", data: "Post added to trending" });
    } else
      return res.status(404).json({
        status: "error",
        error: "Couldn't add the post to trending",
      });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: "Something went wrong :( internal server error",
    });
  }
};
module.exports = {
  Login,
  addNewAdmin,
  getAdmin,
  getAllEditors,
  filterData,
  deleteSingleEditor,
  publishPost,
  unPublishPost,
  removeTrending,
  setTrending,
};
