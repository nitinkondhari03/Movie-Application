const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/index");
const connectDB = require("./config/db");
const { populate } = require("./models/moviesModel");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.use("/api", router);

const server = app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log("connnect to DB");
    console.log("Server is running ", +PORT);
  } catch (error) {
    console.log(error);
  }
});





