const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const { MongoClient } = require("mongodb");
const dbConnection = require("./src/db/dbConnection");
const DbConnection = require("./src/db/dbConnection");
const ObjectId = require("mongodb").ObjectId;
const port = process.env.PORT;
const morgan = require("morgan");
const BaseRouter = require("./src/routes/router");
const router = express.Router();

DbConnection.connect();

// MiddleWare
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", BaseRouter.getRouter());

app.get("/", (req, res) => {
  res.send("Hello Explore The Nature Server!!!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
