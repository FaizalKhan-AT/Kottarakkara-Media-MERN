const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const cors = require("cors");
const Editor = require("./Routes/editor");
const User = require("./Routes/user");
const { protect } = require("./middlewares/ProtectRoute");
require("dotenv").config();
//middlewares
app.use(express.json());
app.use(cors());
app.use("/api/v1/editor/", Editor);
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
