const User = require("../models/user");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = new User({
      fullname: req.body.fullname,
      age: req.body.age,
      city: req.body.city,
    });
    await user.save();

    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const userUpdated = await User.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );

    return res.json(userUpdated);
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    await Activity.deleteMany({ user: req.params.id });
    return res.json({ message: "User deleted" });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};
