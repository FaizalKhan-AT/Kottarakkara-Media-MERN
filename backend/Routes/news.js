const {
  uploadNews,
  getLatestNews,
  getSingleNews,
} = require("../controllers/news");
const upload = require("../middlewares/FileUpload");

const Router = require("express").Router();

Router.route("/").post(upload.single("file"), uploadNews);
Router.route("/post/:id").get(getSingleNews);
Router.route("/latest").get(getLatestNews);
module.exports = Router;
