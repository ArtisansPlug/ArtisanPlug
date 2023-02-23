const User = require("../models/user.models");
const fs = require("fs");

exports.SwitchToAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.role = "admin";
    await user.save();
    return res.status(200).json({ message: "User role changed to admin" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: error.message });
  }
};
exports.AllUsers = async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {

    return res.status(500).json({ message: error.message });
  }
};
