const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const apiUserSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

apiUserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("ApiUser", apiUserSchema);
