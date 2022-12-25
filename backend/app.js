const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const cors = require("cors");
const Editor = require("./Routes/editor");
const User = require("./Routes/user");
const News = require("./Routes/news");
const { protect } = require("./middlewares/ProtectRoute");
const Admin = require("./Routes/admin");
require("dotenv").config();
const path = require("path");
//middlewares
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use("/api/v1/editor/", Editor);
app.use("/api/v1/news", News);
app.use("/api/v1/admin", Admin);
app.use("/api/v1/user", protect, User);
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      process.env.PORT,
      console.log(`server and database started running at ${process.env.PORT} `)
    );
  } catch (err) {
    console.log(err);
  }
};
startServer();
