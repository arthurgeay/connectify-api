const User = require("../models/user");
const logger = require("../services/logger");

module.exports = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await User.findOne({
      _id: userId,
      apiUserManager: req.auth.userId,
    });

    if (user) {
      next();
    } else {
      logger.info(
        "Access denied for resource on API User Manager for user that is not being managed"
      );

      return res.status(404).json({ error: "Resource not found" });
    }
  } catch (error) {
    logger.info(
      "Access denied for resource on API User Manager for user that is not being managed"
    );
    res.status(404).json({ error: "Resource not found" });
  }
};
