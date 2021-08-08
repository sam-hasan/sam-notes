import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Book from '../components/Book';
import Message from '../components/Message';
import { listBooks } from '../actions/bookActions';
import { CircularProgress } from '@material-ui/core';

const HomePage = () => {
  const dispatch = useDispatch();

  const bookList = useSelector((state) => state.bookList);
  const { loading, error, books } = bookList;

  useEffect(() => {
    dispatch(listBooks());
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : (
        books.map((book) => <Book key={book.title} book={book}></Book>)
      )}
    </>
  );
};

export default HomePage;
