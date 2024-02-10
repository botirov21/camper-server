const Admin = require("../models/admin");
const uuid = require("uuid");
const asyncHandler = require("../middleware/async");

//desc      Register new user
//route     POST /api/v1/auth/adminRegister
//accesss   Public

exports.register = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const apiKey = uuid.v4();

  const admin = await Admin.create({
    password,
    email,
    apiKey,
  });

  res.status(201).json({
    success: true,
    data: admin,
  });
});

//desc      Login  user
//route     POST /api/v1/auth/admin
//accesss   Public

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password} = req.body;

  if (!email || !password) {
    return next("email or password is wrong");
  }             

  const admin = await Admin.findOne({
    email,
  });

  console.log(admin);
  if (!admin) {
    return next("not found email");
  }

  const isMatch = await admin.matchPassword(password);
  console.log(isMatch);
  if (!isMatch) {
    return next(" wrong password");
  }

  res.status(200).json({
    success: true,
    data: admin,
  });
});

