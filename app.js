const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const apiUserRoutes = require("./routes/apiUser");
const userRoutes = require("./routes/user");
const activityRoutes = require("./routes/activity");

mongoose
  .connect(
    `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

app.use(cors());
app.use(express.json());

app.use("/", apiUserRoutes);
app.use("/users", userRoutes);
app.use("/activities", activityRoutes);

module.exports = app;
