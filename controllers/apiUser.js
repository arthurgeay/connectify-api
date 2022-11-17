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
      return res.status(401).json({ message: "Bad credentials" });
    }

    const passwordValid = await argon2.verify(user.password, req.body.password);

    if (!passwordValid) {
      return res.status(401).json({ message: "Bad credentials" });
    }

    const loggedUser = {
      _id: user._id,
      email: user.email,
    };

    return res.json({ user: loggedUser, token: "token" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occured" });
  }
};
