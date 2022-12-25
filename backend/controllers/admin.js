const admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const editor = require("../models/editor");
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
module.exports = {
  Login,
  addNewAdmin,
  getAdmin,
  getAllEditors,
  deleteSingleEditor,
};
