const { getAllNews } = require("../controllers/editor");

const Router = require("express").Router();
Router.route("/").get(getAllNews);
module.exports = Router;
