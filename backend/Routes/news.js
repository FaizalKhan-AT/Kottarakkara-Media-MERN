const {
  uploadNews,
  getLatestNews,
  getSingleNews,
  updateSingleNews,
  deleteSingleNews,
  likeSinglePost,
  getRelatedNews,
  getTrendingNews,
  getLiveNews,
  updateLiveNews,
} = require("../controllers/news");
const upload = require("../middlewares/FileUpload");

const Router = require("express").Router();

Router.route("/").post(upload.single("file"), uploadNews);
Router.route("/post/:id")
  .get(getSingleNews)
  .patch(upload.single("file"), updateSingleNews)
  .delete(deleteSingleNews);
Router.route("/latest").get(getLatestNews);
Router.route("/trending").get(getTrendingNews);
Router.route("/related/:category/:id").get(getRelatedNews);
Router.route("/like/:id").get(likeSinglePost);
Router.route("/live").get(getLiveNews).post(updateLiveNews);
module.exports = Router;
