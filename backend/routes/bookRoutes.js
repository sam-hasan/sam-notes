const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getAllBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
  createBookComment,
} = require('../controllers/bookController');

const router = express.Router();

router
  .route('/')
  .get(getAllBooks)
  .post(protect, restrictTo('admin'), createBook);

router.route('/:id/comments').post(protect, createBookComment);

router
  .route('/:id')
  .get(getBook)
  .delete(protect, restrictTo('admin'), deleteBook)
  .put(protect, restrictTo('admin'), updateBook);

module.exports = router;
