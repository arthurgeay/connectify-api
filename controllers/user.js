const User = require("../models/user");
const Activity = require("../models/activity");
const logger = require("../services/logger");
const Joi = require("joi");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ apiUserManager: req.auth.userId });
    logger.info("Users fetched successfully");
    return res.status(200).json(users);
  } catch (err) {
    logger.error(`Error fetching users -> ${err.message}`);
    return res.status(400).json({ message: err.message });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
      apiUserManager: req.auth.userId,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    logger.info("User fetched successfully");
    return res.json(user);
  } catch (err) {
    logger.error(`Error fetching user -> ${err.message}`);
    return res.status(400).json({ message: err.message });
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const userSchema = Joi.object({
      fullname: Joi.string().required(),
      age: Joi.number().required(),
      city: Joi.string().required(),
    });

    const { error, value } = userSchema.validate(req.body);

    if (error) {
      logger.error(`Bad input data for create user -> ${error.message}`);
      throw new Error(error.message);
    }

    const user = new User({ ...value, apiUserManager: req.auth.userId });
    await user.save();

    logger.info("User created successfully");

    return res.status(201).json(user);
  } catch (err) {
    logger.error(`Error creating user -> ${err.message}`);
    return res.status(400).json({ message: err.message });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const userSchema = Joi.object({
      fullname: Joi.string().required(),
      age: Joi.number().required(),
      city: Joi.string().required(),
    });

    const { error, value } = userSchema.validate(req.body);

    if (error) {
      logger.error(`Bad input data for update user -> ${error.message}`);
      throw new Error(error.message);
    }

    const userUpdated = await User.findOneAndUpdate(
      { _id: req.params.id },
      { ...value },
      { new: true }
    );

    logger.info("User updated successfully");

    return res.json(userUpdated);
  } catch (err) {
    logger.error(`Error updating user -> ${err.message}`);
    return res.status(400).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await Activity.deleteMany({ user: req.params.id });
    const result = await User.deleteOne({
      _id: req.params.id,
      apiUserManager: req.auth.userId,
    });

    if (result.deletedCount === 0) throw new Error("User not found");

    logger.info("User deleted successfully");
    return res.json({ message: "User deleted" });
  } catch (err) {
    logger.error(`Error deleting user -> ${err.message}`);
    return res.status(400).json({ message: err.message });
  }
};
