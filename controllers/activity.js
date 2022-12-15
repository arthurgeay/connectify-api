const Activity = require("../models/activity");
const logger = require("../services/logger");

exports.getActivities = async (req, res, next) => {
  try {
    const activities = await Activity.find({ user: req.params.userId });
    logger.info("Activities fetched successfully");

    return res.status(200).json(activities);
  } catch (err) {
    logger.error("Error fetching activities", err.message);
    return res.status(400).json(err);
  }
};

exports.getActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findOne({
      _id: req.params.activityId,
      user: req.params.userId,
    });

    logger.info("Activity fetched successfully");

    return res.json(activity);
  } catch (err) {
    logger.error("Error fetching activity", err.message);
    return res.status(400).json(err);
  }
};

exports.createActivity = async (req, res, next) => {
  try {
    const activity = new Activity({
      user: req.params.userId,
      type: req.body.type,
      duration: req.body.duration,
      date: req.body.date,
      calories: req.body.calories,
      distance: req.body.distance,
      averageHeartRate: req.body.averageHeartRate,
      maxHeartRate: req.body.maxHeartRate,
    });

    await activity.save();

    logger.info("Activity created successfully");
    return res.status(201).json(activity);
  } catch (err) {
    logger.error("Error creating activity", err.message);
    return res.status(400).json(err);
  }
};

exports.updateActivity = async (req, res, next) => {
  try {
    const userUpdated = await Activity.findOneAndUpdate(
      { _id: req.params.activityId, user: req.params.userId },
      { ...req.body },
      { new: true }
    );

    logger.info("Activity updated successfully");

    return res.json(userUpdated);
  } catch (err) {
    logger.error("Error updating activity", err.message);
    return res.status(400).json(err);
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
    logger.error("Error deleting activity", err.message);
    return res.status(400).json(err);
  }
};
