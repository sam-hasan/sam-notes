const express = require('express');
const { getAllBooks, getBook } = require('../controllers/bookController');

const router = express.Router();

router.route('/').get(getAllBooks);
router.route('/:id').get(getBook);

module.exports = router;
