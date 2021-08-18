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
  }, [dispatch]);

  return (
    <>
      <div className="text-3xl font-semibold flex justify-center antialiased pt-28 m-auto">
        <div style={{ fontFamily: 'Cinzel' }}>Reviews</div>
      </div>
      <div className="flex flex-wrap justify-center align-start mt-12 mb-20">
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Message severity="error">{error}</Message>
        ) : (
          books.map((book) => <Book key={book.title} book={book}></Book>)
        )}
      </div>
      );
    </>
  );
};

export default HomePage;
