const { uploadNews, getLatestNews } = require("../controllers/news");
const upload = require("../middlewares/FileUpload");

const Router = require("express").Router();

Router.route("/").post(upload.single("file"), uploadNews);
Router.route("/latest").get(getLatestNews);
module.exports = Router;
