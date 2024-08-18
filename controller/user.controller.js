const User = require("../models/user");
const uuid = require("uuid");
const asyncHandler = require("../middleware/async");

//desc      Register new user
//route     POST /api/v1/auth/register
//accesss   Public

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const apiKey = uuid.v4();

  const user = await User.create({
    name,
    password,
    email,
    apiKey,
  });

  res.status(201).json({
    success: true,
    data: user,
  });
});

//desc      Login  user
//route     POST /api/v1/auth/login
//accesss   Public

// exports.login = asyncHandler(async (req, res, next) => {
//   const { email, password} = req.body;

//   if (!email || !password) {
//     return next("email or password is wrong");
//   }             

//   const user = await User.findOne({
//     email,
//   });

//   console.log(user);
//   if (!user) {
//     return next("not found email");
//   }

//   const isMatch = await user.matchPassword(password);
//   console.log(isMatch);
//   if (!isMatch) {
//     return next(" wrong password");
//   }

//   res.status(200).json({
//     success: true,
//     data: user,
//   });
// });

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next("Email or password is missing");
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next("User not found");
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next("Incorrect password");
  }

  // Assuming 'name' is a field in your User model
  const { _id, name } = user;

  res.status(200).json({
    success: true,
    data: { _id, name, email }, // Include 'name' in the response
  });
});

//desc      Get All user  user
//route     POST /api/v1/auth/login
//accesss   Public

exports.getAllUsers = asyncHandler(async(req, res, next)=>{
  const users = await User.find()
  res.status(200).json({
    success: true,
    data: users,
  });
})