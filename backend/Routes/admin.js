const {
  Login,
  addNewAdmin,
  getAdmin,
  getAllEditors,
  deleteSingleEditor,
  filterData,
  unPublishPost,
  publishPost,
  setTrending,
  removeTrending,
} = require("../controllers/admin");
const { protect } = require("../middlewares/ProtectRoute");

const Router = require("express").Router();
Router.route("/").get(protect, getAdmin);
Router.route("/login").post(Login);
Router.route("/create-admin").post(addNewAdmin);
Router.route("/editor").get(getAllEditors);
Router.route("/editor/:id").delete(deleteSingleEditor);
Router.route("/filter/:category/:type?/:time?").get(filterData);
Router.route("/unpublish/:id").patch(unPublishPost);
Router.route("/publish/:id").patch(publishPost);
Router.route("/trending/:id").patch(setTrending);
Router.route("/remove-trending/:id").patch(removeTrending);
module.exports = Router;
