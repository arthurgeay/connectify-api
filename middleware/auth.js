const jwt = require("jsonwebtoken");
const ApiUser = require("../models/apiUser");
const logger = require("../services/logger");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    const user = await ApiUser.findOne({ _id: userId });

    if (user) {
      req.auth = { userId: user._id };
      next();
    } else {
      logger.info("Unauthorized request");

      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
