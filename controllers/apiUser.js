const argon2 = require("argon2");
const ApiUser = require("../models/apiUser");
const jwt = require("jsonwebtoken");
const logger = require("../services/logger");
const Joi = require("joi");

exports.register = async (req, res, next) => {
  try {
    const apiUserSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error, value } = apiUserSchema.validate(req.body);

    if (error) {
      logger.error(`Bad input data for register user -> ${error.message}`);
      throw new Error(error.message);
    }

    const passwordHashed = await argon2.hash(req.body.password);

    const apiUser = new ApiUser({
      ...value,
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
    logger.error(`Error registering user -> ${err.message}`);
    return res.status(400).json({
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const apiUserSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error, value } = apiUserSchema.validate(req.body);

    if (error) {
      logger.error(`Bad input data for login user -> ${error.message}`);
      throw new Error(error.message);
    }

    const user = await ApiUser.findOne({ email: value.email });

    if (!user) {
      return res.status(401).json({ message: "Bad credentials" });
    }

    const passwordValid = await argon2.verify(user.password, value.password);

    if (!passwordValid) {
      return res.status(401).json({ message: "Bad credentials" });
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
    logger.error(`Error logging in user -> ${err.message}`);
    return res.status(400).json({ message: err.message });
  }
};

exports.getUserProfile = async (req, res, next) => {
  const user = await ApiUser.findOne({ _id: req.auth.userId }).select(
    "-password"
  );

  if (!user) {
    logger.error(`Error fetching user profile -> ${err.message}`);
    return res.status(401).json({ message: "Unauthorized" });
  }

  logger.info("User profile fetched successfully");

  return res.json({ ...req.limit, email: user.email });
};
