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
  const user = new User({
    fullname: req.body.fullname,
    age: req.body.age,
    city: req.body.city,
  });

  try {
    await user.save();
    return res.status(201).json({ message: "User created" });
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
    // TODO delete all activities of this user
    return res.json({ message: "User deleted" });
  } catch (err) {
    return res.status(400).json(err);
  }
};
