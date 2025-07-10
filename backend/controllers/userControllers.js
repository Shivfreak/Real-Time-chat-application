// Import necessary packages
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

/**
 * @description Get or Search all users
 * @route GET /api/user?search=
 * @access Public
 */
const allUsers = asyncHandler(async (req, res) => {
  // Build the search query
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  // Find all users matching the keyword, excluding the current user
  const users = await User.find({
    ...keyword,
    _id: { $ne: req.user._id },
  });
  res.send(users);
});

/**
 * @description Register a new user
 * @route POST /api/user/
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  // Validate input fields
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create a new user
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  // Return user data with a token
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

/**
 * @description Authenticate a user
 * @route POST /api/users/login
 * @access Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  // Check if user exists and password is correct
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// Export the controller functions
module.exports = { allUsers, registerUser, authUser };
