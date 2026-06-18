const User = require("../models/User");

exports.registerUser = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const user =
      await User.create({
        name,
        email,
        password,
      });

    res.status(201).json({
      success: true,
      message:
        "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.loginUser = async (
  req,
  res
) => {
  res.json({
    message: "Login API",
  });
};