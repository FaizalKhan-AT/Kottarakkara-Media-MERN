const jwt = require("jsonwebtoken");
const admin = require("../models/admin");
const editor = require("../models/editor");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      let decode = jwt.verify(token, process.env.JWT_SECRET);
      if (decode.admin) {
        req.user = await admin.findById(decode.id).select("-password");
      } else {
        req.user = await editor
          .findById(decode.id)
          .select("-password -pass -external");
      }
      next();
    } catch (err) {
      return res
        .status(401)
        .json({ status: "error", error: "Not Authorized / invalid token" });
    }
  }
  if (!token) return res.json({ status: "error", error: "No token present" });
};
module.exports = { protect };
