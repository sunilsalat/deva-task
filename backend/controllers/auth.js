const User = require("../models/user");
const { BadRequest } = require("../error");

// register
const createUser = async (req, res) => {
  const { name, userName, email, password } = req.body;

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new BadRequest("Can not create account");
  }

  if (!name || !userName || !email || !password) {
    throw new BadRequest("Please provide all the required fields to register");
  }

  const user = await User.create(req.body);

  res.status(200).json({ msg: "User registration successful" });
};

// login

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("Provide valid credentials");
  }

  const user = await User.findOne({ email: email });

  const isPassValid = await user.comparePassword(password);

  if (!isPassValid) {
    throw new BadRequest("Provide Valid credentials");
  }

  res.status(200).json({ msg: "successfully logged in" });
};

// all user list
const getAllUser = async (req, res) => {
  const users = await User.find({}).limit(100).select("-password");

  res.status(200).json({ users });
};

module.exports = { createUser, login, getAllUser };
