const catchAsync = require('../utils/catchAsync');
const Book = require('../models/bookModel');
const AppError = require('../utils/appError');

exports.getAllBooks = catchAsync(async (req, res, next) => {
  const books = await Book.find({});

  res
    .status(200)
    .json({ status: 'success', results: books.length, data: { books } });
});

exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  //   add if-else and error controllers here
  if (!book) {
    return next(new AppError('No book found with that ID', 404));
  }

  res.status(200).json({ status: 'success', data: { data: book } });
});
