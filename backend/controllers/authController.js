const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

// the signing token function
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  // giving the user a token when he signs up
  const token = signToken(user._id);
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, //important for XSS attacks
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https', // req.headers['x-forwarded-proto'] === 'https' is heroku specific
  });

  // remove the password from output
  user.password = undefined;

  res.status(statusCode).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    photo: user.photo,
    token,
  });
};

// filtering out unwanted fields in the body
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateUserProfile = catchAsync(async (req, res, next) => {
  // 1) Create error if the user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  // if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  createSendToken(updatedUser, 200, req, res);
});

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    // passwordConfirm,
    role,
  });

  //   if the new user is created, send the data as response
  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) First we need to check if the email and password is provided in the request
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // 2) Check if the user exists and password is correct
  // +password will basically add the password back in the output. It was previously hidden in the output
  const user = await User.findOne({ email }).select('+password');

  // if the password or email is wrong, throw an error
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If no error, send the token to the client
  createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and checking if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError('You are not logged in. Please log in to get access', 401)
    );
  }
  // 2) Verify if the token is valid or not (if the payload has been manipulated by a malicious third party )
  // most tutorials would stop here but it wouldnt be secure enough
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(decoded); returns an object like { id: '60af6b7a6c9fd20ce30c4396', iat: 1622109063, exp: 1629885063 }

  // 3) Check if a user with that id (from the token) exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exists.', 401)
    );
  }

  // 4) Check if user changed password after the token was issued
  //   if (currentUser.changedPasswordAfter(decoded.iat)) {
  //     return next(
  //       new AppError('User recently changed password! Please log in again', 401)
  //     );
  //   }

  req.user = currentUser;
  res.locals.user = currentUser;
  // only when all of the above tests pass, go to the next middleware (grant access to the protected route)
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};
