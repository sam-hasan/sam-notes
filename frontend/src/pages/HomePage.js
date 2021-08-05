import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Book from '../components/Book';
import Message from '../components/Message';

import Spinner from '../components/Spinner';
import { listBooks } from '../actions/bookActions';
import { Alert } from '@material-ui/lab';

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
        <Spinner />
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : (
        books.map((book) => <Book key={book.title} book={book}></Book>)
      )}
    </>
  );
};

export default HomePage;
