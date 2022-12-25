const admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
module.exports = {
  Login,
  addNewAdmin,
  getAdmin,
};
