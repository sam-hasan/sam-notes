import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import Message from '../components/Message';
import { listBookDetails } from '../actions/bookActions';
import { Container, CircularProgress } from '@material-ui/core';

const BookPage = ({ match }) => {
  const dispatch = useDispatch();
  const bookDetails = useSelector((state) => state.bookDetails);
  const { loading, error, book } = bookDetails;
  const topQuotes = useSelector((state) => state.bookDetails.book.topQuotes);

  useEffect(() => {
    dispatch(listBookDetails(match.params.id));
  }, [dispatch, match]);

  return (
    // conditional rendering
    <div className="w-6/12 justify-center items-center antialiased">
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : (
        <Container>
          <div className="flex pb-20">
            <div className="mr-8 w-4/12">
              <img src={book.image}></img>
            </div>
            <div className="text-4xl m-auto text-indigo-900">
              {book.title} by {book.author}
            </div>
          </div>

          {/* The book in three sentences */}
          <div className="pb-16">
            <h1 className="text-2xl pb-6 font-semibold text-indigo-900">
              The Book In Three Sentences
            </h1>
            <p className="font-serif text-gray-900">{book.topSentences}</p>
          </div>
          {/* impressions */}
          <div className="pb-16">
            <h1 className="text-2xl pb-6 font-semibold text-indigo-900">
              How I Discovered It
            </h1>
            <p className="font-serif text-gray-900">{book.impressions}</p>
          </div>
          {/* recommended for */}
          <div className="pb-16">
            <h1 className="text-2xl pb-6 font-semibold text-indigo-900">
              Who Should Read It
            </h1>
            <p className="font-serif text-gray-900">{book.recommendedFor}</p>
          </div>
          {/* how the book changed me */}
          <div className="pb-16">
            <h1 className="text-2xl pb-6 font-semibold text-indigo-900">
              How The Book Changed Me
            </h1>
            <p className="font-serif text-gray-900">{book.influence}</p>
          </div>
          {/* top quotes */}
          <div className="pb-16">
            <h1 className="text-2xl pb-6 font-semibold text-indigo-900">
              My Top Three Quotes
            </h1>
            <ul className="list-disc list-outside font-serif text-gray-900 text-justify">
              {topQuotes && topQuotes.length > 0 ? (
                topQuotes.map((li) => {
                  return <li key={li}>{li}</li>;
                })
              ) : (
                <CircularProgress />
              )}
            </ul>
          </div>
        </Container>
      )}
    </div>
  );
};

export default BookPage;
