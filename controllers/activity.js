const Activity = require("../models/activity");
const logger = require("../services/logger");
const Joi = require("joi");

exports.getActivities = async (req, res, next) => {
  try {
    const activities = await Activity.find({ user: req.params.userId }).sort({
      date: "desc",
    });

    logger.info("Activities fetched successfully");

    return res.status(200).json(activities);
  } catch (err) {
    logger.error(`Error fetching activities -> ${err.message}`);
    return res.status(400).json({ message: err.message });
  }
};

exports.getActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findOne({
      _id: req.params.activityId,
      user: req.params.userId,
    });

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    logger.info("Activity fetched successfully");

    return res.json(activity);
  } catch (err) {
    logger.error(`Error fetching activity -> ${err.message}`);
    return res.status(400).json({ message: err.message });
  }
};

exports.createActivity = async (req, res, next) => {
  try {
    const activitySchema = Joi.object({
      user: Joi.string().required(),
      type: Joi.string().required(),
      duration: Joi.number().required(),
      date: Joi.date().required(),
      calories: Joi.number().required(),
      distance: Joi.number().required(),
      averageHeartRate: Joi.number().required(),
      maxHeartRate: Joi.number().required(),
    });

    const { error, value } = activitySchema.validate({
      ...req.body,
      user: req.params.userId,
    });

    if (error) {
      logger.error(`Bad input data for create activity -> ${error.message}`);
      throw new Error(error.message);
    }

    const activity = new Activity(value);

    await activity.save();

    logger.info("Activity created successfully");
    return res.status(201).json(activity);
  } catch (err) {
    logger.error(`Error creating activity -> ${err.message}`);
    return res.status(400).json({ message: err.message });
  }
};

exports.updateActivity = async (req, res, next) => {
  try {
    const activitySchema = Joi.object({
      type: Joi.string().required(),
      duration: Joi.number().required(),
      date: Joi.date().required(),
      calories: Joi.number().required(),
      distance: Joi.number().required(),
      averageHeartRate: Joi.number().required(),
      maxHeartRate: Joi.number().required(),
    });

    const { error, value } = activitySchema.validate(req.body);

    if (error) {
      logger.error(`Bad input data for update activity -> ${error.message}`);
      throw new Error(error.message);
    }

    const userUpdated = await Activity.findOneAndUpdate(
      { _id: req.params.activityId, user: req.params.userId },
      { ...value },
      { new: true }
    );

    logger.info("Activity updated successfully");

    return res.json(userUpdated);
  } catch (err) {
    logger.error(`Error updating activity -> ${err.message}`);
    return res.status(400).json({ message: err.message });
  }
};

exports.deleteActivity = async (req, res, next) => {
  try {
    await Activity.deleteOne({
      _id: req.params.activityId,
      user: req.params.userId,
    });

    logger.info("Activity deleted successfully");

    return res.json({ message: "Activity deleted" });
  } catch (err) {
    logger.error(`Error deleting activity -> ${err.message}`);
    return res.status(400).json({ message: err.message });
  }
};
