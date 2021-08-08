const mongoose = require('mongoose');
const dotenv = require('dotenv');

const books = require('./books');
const users = require('./users');
const Book = require('../models/bookModel');
const User = require('../models/userModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

// connecting to the database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('DB connections successful!');
  });

// IMPORT DATA INTO DATABASE
const importData = async () => {
  try {
    await Book.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    // this is for embedding the admin user to each and every Book document in the database
    const sampleBooks = books.map((book) => {
      return { ...book, user: adminUser };
    });
    await Book.insertMany(sampleBooks);
    // await Book.insertMany(books);
    console.log('Data Imported!');

    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

// DELETING DATA FROM THE DATABASE
const deleteData = async () => {
  try {
    await Book.deleteMany();
    // await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}
