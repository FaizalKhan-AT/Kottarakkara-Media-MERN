const { Login, addNewAdmin, getAdmin } = require("../controllers/admin");
const { protect } = require("../middlewares/ProtectRoute");

const Router = require("express").Router();
Router.route("/").get(protect, getAdmin);
Router.route("/login").post(Login);
Router.route("/create-admin").post(addNewAdmin);

module.exports = Router;
