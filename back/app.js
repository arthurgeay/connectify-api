const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(
    `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

app.use(cors());
app.use(express.json());

const users = [];

app.get("/users", (req, res, next) => {
  res.status(200).json({
    message: "It works",
  });
});

app.post("/users", (req, res, next) => {
  users.push(req.body);
  res.send(users);
});

module.exports = app;
