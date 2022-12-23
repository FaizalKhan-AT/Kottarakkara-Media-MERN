const { getAllNews, addNewEditor, login } = require("../controllers/editor");
const Router = require("express").Router();

Router.route("/:id").get(getAllNews);
Router.route("/signup").post(addNewEditor);
Router.route("/login").post(login);
module.exports = Router;
