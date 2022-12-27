const { filterNews, filterCategoryNews } = require("../controllers/news");

const Router = require("express").Router();
Router.route("/news/:category").get(filterCategoryNews);
Router.route("/:category?/:type?/:time?/:place?").get(filterNews);
module.exports = Router;
