const {
  getAllNews,
  addNewEditor,
  login,
  filterPosts,
} = require("../controllers/editor");
const Router = require("express").Router();

Router.route("/:id").get(getAllNews);
Router.route("/filter/:id/:type?/:time?").get(filterPosts);
Router.route("/signup").post(addNewEditor);
Router.route("/login").post(login);
module.exports = Router;
