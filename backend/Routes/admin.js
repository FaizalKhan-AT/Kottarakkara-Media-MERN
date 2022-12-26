const {
  Login,
  addNewAdmin,
  getAdmin,
  getAllEditors,
  deleteSingleEditor,
  filterData,
} = require("../controllers/admin");
const { protect } = require("../middlewares/ProtectRoute");

const Router = require("express").Router();
Router.route("/").get(protect, getAdmin);
Router.route("/login").post(Login);
Router.route("/create-admin").post(addNewAdmin);
Router.route("/editor").get(getAllEditors);
Router.route("/editor/:id").delete(deleteSingleEditor);
Router.route("/filter/:category/:type?/:time?").get(filterData);
module.exports = Router;
