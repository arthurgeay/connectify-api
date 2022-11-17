const argon2 = require("argon2");
const ApiUser = require("../models/apiUser");
const mongoose = require("mongoose");

exports.register = async (req, res, next) => {
  try {
    const passwordHashed = await argon2.hash(req.body.password);
    const apiUser = new ApiUser({
      email: req.body.email,
      password: passwordHashed,
    });

    await apiUser.save();

    return res.json({ message: "User created" });
  } catch (err) {
    console.log(err instanceof mongoose.Error);
    switch (true) {
      // catch all errors from mongoose
      case err instanceof mongoose.Error.ValidationError:
        res.status(400).json(err);
        break;
      default:
        res.status(500).json({
          error:
            "An error occured. Please check if all elements are send it correctly",
        });
    }
  }
};

exports.login = (req, res, next) => {
  return res.json({ message: "Login" });
};
