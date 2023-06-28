const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const books = require('./dev-data/books.js');

//Catching uncaught exceptions (should always be at the top)
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION!💥 Shutting down...');
  console.log(err.name, err.message);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

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

//starting the server
const port = 9000;
console.log(port);
const server = app.listen(port, () => {
  console.log('App running on port 9000!');
});

// unhandled rejections (outside of express and mongo) like not being able to connect to the database
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLDED REJECTION!💥 Shutting down...');

  // shutting down the application
  server.close(() => {
    process.exit(1); //0 stands for success, 1 stands for uncaught exception
  });
});
