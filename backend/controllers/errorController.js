const AppError = require('../utils/appError');

// helper functions
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

// throwing errors for JWT
const handleJWTError = (err) =>
  new AppError('Invalid token! Please log in again.', 401);

// throwing errors for JWTExpired
const handleJWTExpired = (err) =>
  new AppError('Your token has expired! Please log in again.', 401);

// throwing error for validation errors in MongoDB
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// throwing error for duplicate fields in MongoDB
const handleDuplicateFieldsDB = (err) => {
  // from the error object of mongodb we are taking out the 'name' property which is the first element, hence [0]
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  const message = `Duplicate field value: ${value}. Please use another value.`;
  return new AppError(message, 400);
};

// errors for development environment
const sendErrorDev = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // B) RENDERED WEBSITE
  // find a way to render the errors like 404 on the screen through react
  //  console.error('ERROR 💥', err);
  //  return res.status(err.statusCode).render('error', {
  //   title: 'Something went wrong!',
  //   msg: err.message,
  //  });
};

// errors for production environment
const sendErrorProd = (err, req, res) => {
  // if the error is operational while in production
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // programming or other unknown error: don't want to leak the details to the client
  } else {
    // Log the error
    console.error('ERROR', err);

    // send the response
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }
};

// by using this syntax {(err) as first argument}, express automatically recognizes this is an 'error handling' middleware
module.exports = (err, req, res, next) => {
  //console.log(err.stack); // this will output at what line the code is going wrong in the console
  //err here is the Error class passed into the express middleware. The purpose of this function is mainly to just send a response that you've reached an error
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    // hard copying the error object
    let error = { ...err };
    error.message = err.message;
    // Invalid MongoDB ID
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    // Duplicate MongoDB Database Fields
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    // Mongoose Validation Errors
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (error.name === 'TokenExpiredError') error = handleJWTExpired(error);

    sendErrorProd(error, req, res);
  }
};
