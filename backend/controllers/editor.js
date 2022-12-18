const editor = require("../models/editor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncWrapper = require("../middlewares/AsyncWrapper");
const getAllNews = (req, res) => {
  res.send("hehehe");
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
  const { username, password, email } = req.body;

  try {
    const pass = await bcrypt.hash(password, 10);
    const response = await editor.create({
      password: pass,
      username,
      email,
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
