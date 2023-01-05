const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: { type: String, required: true },
  age: { type: Number, required: true },
  city: { type: String, required: true },
  apiUserManager: { type: mongoose.Schema.Types.ObjectId, ref: "ApiUser" },
});

module.exports = mongoose.model("User", userSchema);
