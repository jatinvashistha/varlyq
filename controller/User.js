const jwt = require("jsonwebtoken");
const cache = require("../utils/cache");  
const User = require("../model/User");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({ name, email, mobile, password });
    await user.save();

    const payload = { id: user.id };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "jatinvashist2003",
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "7d" }
    );

    await cache.setToken(user.id, refreshToken);

    res.status(201).json({ token, refreshToken, user });
  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};

exports.updateUser = async (req, res) => {
  try {

    const updatedUser = await User.findByIdAndUpdate(
      req?.user?._id,
     req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {


    const deletedUser = await User.findByIdAndDelete(req.user._id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

 