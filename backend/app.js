const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const bookRouter = require('./routes/bookRoutes');
const userRouter = require('./routes/userRoutes');
const uploadRouter = require('./routes/uploadRoutes');

const app = express();

app.use(cors());
// for options like PATCH, DELETE, PUT etc requests
app.options('*', cors());

// Set Security HTTP headers (helmet)
app.use(helmet());

// rate-limiting
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, //1 hour
  message: 'Too many requests from this IP! Please try again in an hour.',
});

// use this rate limiting in every route that contains the word '/api'
app.use('/api', limiter);

// Development logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
//to parse data coming from a url encoded form, (an HTML form), 'extended' will allow ou to send complex data
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// data sanitization against NOSQL query injection // "email": {"$gt": "" },
app.use(mongoSanitize());

// data sanitization against XSS
app.use(xss());

app.use(compression());

// api routes
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/upload', uploadRouter);

app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')));

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
