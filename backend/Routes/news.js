const {
  uploadNews,
  getLatestNews,
  getSingleNews,
  updateSingleNews,
  deleteSingleNews,
} = require("../controllers/news");
const upload = require("../middlewares/FileUpload");

const Router = require("express").Router();

Router.route("/").post(upload.single("file"), uploadNews);
Router.route("/post/:id")
  .get(getSingleNews)
  .patch(upload.single("file"), updateSingleNews)
  .delete(deleteSingleNews);
Router.route("/latest").get(getLatestNews);
module.exports = Router;
