const argon2 = require("argon2");
const ApiUser = require("../models/apiUser");
const jwt = require("jsonwebtoken");
const logger = require("../services/logger");

exports.register = async (req, res, next) => {
  try {
    const passwordHashed = await argon2.hash(req.body.password);
    const apiUser = new ApiUser({
      email: req.body.email,
      password: passwordHashed,
    });

    const user = await apiUser.save();
    const loggedUser = {
      _id: user._id,
      email: user.email,
    };

    const token = jwt.sign({ userId: loggedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    logger.info("User registered successfully");

    return res.json({ token: token, user: loggedUser });
  } catch (err) {
    logger.error("Error registering user", err.message);
    return res.status(500).json({
      error:
        "An error occured. Please check if all elements are send it correctly",
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await ApiUser.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ error: "Bad credentials" });
    }

    const passwordValid = await argon2.verify(user.password, req.body.password);

    if (!passwordValid) {
      return res.status(401).json({ error: "Bad credentials" });
    }

    const loggedUser = {
      _id: user._id,
      email: user.email,
    };

    const token = jwt.sign({ userId: loggedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    logger.info("User logged in successfully");

    return res.json({ user: loggedUser, token: token });
  } catch (err) {
    logger.error("Error logging in user", err.message);
    return res.status(500).json({ error: "An error occured" });
  }
};

exports.getUserProfile = async (req, res, next) => {
  const user = await ApiUser.findOne({ _id: req.auth.userId }).select(
    "-password"
  );

  if (!user) {
    logger.error("Error fetching user profile", err.message);
    return res.status(401).json({ error: "Unauthorized" });
  }

  logger.info("User profile fetched successfully");

  return res.json({ ...req.limit, email: user.email });
};
