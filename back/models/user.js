const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: { type: String, required: true },
  age: { type: Number, required: true },
  city: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
