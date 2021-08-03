import React from 'react';
import Book from '../components/Book';
import books from '../books';

const HomePage = () => {
  return (
    <>
      {books.map((book) => (
        <Book key={book.name} book={book}></Book>
      ))}
    </>
  );
};

export default HomePage;
