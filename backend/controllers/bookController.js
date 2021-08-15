const catchAsync = require('../utils/catchAsync');
const Book = require('../models/bookModel');
const AppError = require('../utils/appError');

exports.getAllBooks = catchAsync(async (req, res, next) => {
  const books = await Book.find({});

  // res
  //   .status(200)
  //   .json({ status: 'success', results: books.length, data: { books } });
  res.json(books);
});

exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new AppError('No book found with that ID', 404));
  }

  // res.status(200).json({ status: 'success', data: { data: book } });
  res.status(200).json(book);
});

exports.deleteBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) return next(new AppError('No book found with that id', 404));

  res.status(204).json({
    status: 'success',
  });
});

exports.createBook = catchAsync(async (req, res, next) => {
  const book = await Book.create({
    topQuotes: [
      'Et harum quidem rerum facilis est et expedita distinctio',
      'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus',
      'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet',
    ],
    numComments: 0,
    title: 'Sample Name',
    author: 'Sample Author',
    image: '/images/sample.jpeg',
    user: req.user._id,
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
    topSentences:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    impressions:
      'Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.',
    recommendedFor:
      'Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed,euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti.',
    influence:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio',
    genre: 'Sample Genre',
  });

  res.status(201).json(book);
});

exports.updateBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!book) return next(new AppError('No book found with that id', 404));

  res.status(200).json(book);
});

exports.createBookComment = catchAsync(async (req, res, next) => {
  const { comment } = req.body;

  const book = await Book.findById(req.params.id);

  if (book) {
    const alreadyCommented = book.comments.find(
      (c) => c.user.toString() === req.user._id.toString()
    );

    if (alreadyCommented) {
      return next(new AppError("You've already made a comment!", 404));
    }

    const commentPosted = {
      name: req.user.name,
      photo: req.user.photo,
      comment,
      user: req.user._id,
    };

    book.comments.push(commentPosted);

    book.numComments = book.comments.length;

    await book.save();
    res.status(201).json({ message: 'Comment added.' });
  } else {
    return next(new AppError('Book not found!', 404));
  }
});
