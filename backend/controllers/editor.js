const editor = require("../models/editor");
const news = require("../models/news");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncWrapper = require("../middlewares/AsyncWrapper");
const getAllNews = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await news.find({ userId: id }).sort({ type: -1 });
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
const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await editor.findOne({ email }).lean();
  if (!user)
    return res.json({ status: "error", error: "Invalid email / password" });
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
    return res.json({
      status: "ok",
      data: { username: user.username, token, email: user.email, id: user._id },
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
};
