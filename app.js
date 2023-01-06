const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");

const authMiddleware = require("./middleware/auth");
const rateLimiterMiddleware = require("./middleware/rateLimiter");

const apiUserRoutes = require("./routes/apiUser");
const userRoutes = require("./routes/user");
const activityRoutes = require("./routes/activity");
const weatherRoutes = require("./routes/weather");
const logger = require("./services/logger");

mongoose
  .connect(
    `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

app.use(cors());
app.use(express.json());
app.use(rateLimiterMiddleware);
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]", {
    stream: logger.stream,
  })
);

app.use("/", apiUserRoutes);
app.use("/users", authMiddleware, userRoutes);
app.use("/activities", authMiddleware, activityRoutes);
app.use("/weathers", weatherRoutes);

app.use((req, res, next) => {
  logger.error(
    `${404} - Resource not found - ${req.originalUrl} - ${req.method}`
  );
  return res.status(404).json({ message: "Resource not found" });
});

module.exports = app;
