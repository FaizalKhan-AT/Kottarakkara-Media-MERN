const editor = require("../models/editor");
const news = require("../models/news");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncWrapper = require("../middlewares/AsyncWrapper");

const getAllNews = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await news.find({ userId: id }).sort({ postedAt: -1 });
    if (post) {
      return res.json({ status: "ok", data: post });
    }
  } catch (err) {
    return res.json({
      status: "error",
      error: "Editor doesn't have any news posts yet..",
    });
  }
};
const filterPosts = async (req, res) => {
  const { id, type, time } = req.params;

  try {
    if (time !== "" && type !== "") {
      if (type === "All") {
        const posts = await news.find({ userId: id }).sort({
          postedAt: time === "Oldest" ? 1 : -1,
        });
        if (posts) {
          return res.status(200).json({ status: "ok", data: posts });
        } else
          return res.status(404).json({
            status: "error",
            error: "user doesn't have any posts",
          });
      } else {
        const posts = await news.find({ userId: id, type }).sort({
          postedAt: time === "Oldest" ? 1 : -1,
        });
        if (posts) {
          return res.status(200).json({ status: "ok", data: posts });
        } else
          return res.status(404).json({
            status: "error",
            error: "user doesn't have any posts",
          });
      }
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: "something went wrong :( internal server error",
    });
  }
};
const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await editor.findOne({ email }).lean();
  if (!user)
    return res.status(404).json({ status: "error", error: "User not found" });
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10d",
      }
    );
    return res.status(200).json({
      status: "ok",
      data: {
        username: user.username,
        token,
        email: user.email,
        id: user._id,
        external: user.external,
      },
    });
  }
  return res.json({ status: "error", error: "Invalid email / password" });
});
const addNewEditor = async (req, res) => {
  const { username, password, email, external } = req.body;

  try {
    const pas = await bcrypt.hash(password, 10);
    const response = await editor.create({
      password: pas,
      username,
      email,
      external,
      pass: password,
    });
    return res.json({ status: "ok", data: "user created successfully" });
  } catch (err) {
    if (err.code === 11000) {
      return res.json({
        status: "error",
        error: "Email address already Exists",
      });
    } else {
      return res.json({
        status: "error",
        error: "Something went Wrong!!...",
      });
    }
  }
};

module.exports = {
  getAllNews,
  addNewEditor,
  login,
  filterPosts,
};
