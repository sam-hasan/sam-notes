const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const bookSchema = new mongoose.Schema(
  {
    //   user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User',
    //   },
    title: {
      type: String,
      required: [true, 'A book must have a title'],
      unique: true,
      trim: true,
    },
    slug: String,
    author: {
      type: String,
      required: [true, 'A book must have an author'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'A book must have an cover image'],
    },
    preview: {
      type: String,
      required: true,
      trim: true,
    },
    topSentences: {
      type: String,
      required: true,
      trim: true,
    },
    impressions: {
      type: String,
      required: true,
      trim: true,
    },
    recommendedFor: {
      type: String,
      required: true,
      trim: true,
    },
    influence: {
      type: String,
      required: true,
      trim: true,
    },
    topQuotes: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    genre: {
      type: String,
      trim: true,
    },
    comments: [commentSchema],
    numComments: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
