const { getUser } = require("../controllers/user");

const Router = require("express").Router();

Router.route("/").get(getUser);

module.exports = Router;
