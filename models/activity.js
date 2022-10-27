const mongoose = require("mongoose");

const activitySchema = mongoose.Schema({
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
  calories: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  distance: { type: Number, required: true },
  averageHeartRate: { type: Number, required: true },
  maxHeartRate: { type: Number, required: true },
});

module.exports = mongoose.model("Activity", activitySchema);
