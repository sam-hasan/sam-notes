import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import makeStyles from '../components/ImageAvatars';
import { listBookDetails, createBookComment } from '../actions/bookActions';
import { Container, CircularProgress, Avatar, Box } from '@material-ui/core';
import { BOOK_CREATE_COMMENT_RESET } from '../constants/bookConstants';

const BookPage = ({ match }) => {
  const classes = makeStyles();
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const bookDetails = useSelector((state) => state.bookDetails);
  const { loading, error, book } = bookDetails;
  const topQuotes = useSelector((state) => state.bookDetails.book.topQuotes);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const bookCommentCreate = useSelector((state) => state.bookCommentCreate);
  const {
    success: successBookComment,
    loading: loadingBookComment,
    error: errorBookComment,
  } = bookCommentCreate;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (successBookComment) {
      setComment('');
    }
    if (!book._id || book._id !== match.params.id) {
      dispatch(listBookDetails(match.params.id));
      dispatch({ type: BOOK_CREATE_COMMENT_RESET });
    }
  }, [dispatch, match, successBookComment, book._id]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createBookComment(match.params.id, {
        comment,
      })
    );
  };

  return (
    // conditional rendering
    <div className="lg:w-7/12 sm:4/5 justify-center items-center antialiased mt-12 mb-20">
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : (
        <Container>
          <div className="flex pb-20">
            <div className="w-4/12">
              <img alt={book.title} src={book.image}></img>
            </div>
            <div className="text-3xl ml-4 font-semibold m-auto text-gradient">
              {book.title} by {book.author}
            </div>
          </div>

          {/* The book in three sentences */}
          <div className="pb-16">
            <h1 className="text-2xl pb-6 font-semibold text-gradient">
              The Book In Three Sentences
            </h1>
            <p className="font-serif text-gray-900">{book.topSentences}</p>
          </div>
          {/* impressions */}
          <div className="pb-16">
            <h1 className="text-2xl pb-6 font-semibold text-gradient">
              How I Discovered It
            </h1>
            <p className="font-serif text-gray-900">{book.impressions}</p>
          </div>
          {/* recommended for */}
          <div className="pb-16">
            <h1 className="text-2xl pb-6 font-semibold text-gradient">
              Who Should Read It
            </h1>
            <p className="font-serif text-gray-900">{book.recommendedFor}</p>
          </div>
          {/* how the book changed me */}
          <div className="pb-16">
            <h1 className="text-2xl pb-6 font-semibold text-gradient">
              How The Book Changed Me
            </h1>
            <p className="font-serif text-gray-900">{book.influence}</p>
          </div>
          {/* top quotes */}
          <div className="pb-32">
            <h1 className="text-2xl pb-6 font-semibold text-gradient">
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
          <div className="flex flex-col items-center pb-16">
            <h1 className=" block text-3xl pb-1 font-bold">Discussion</h1>
            {book.comments.length === 0 && (
              <div className="flex-col text-base">No Comments</div>
            )}
          </div>
          <div className="mb-10 border-b-2 border-solid border-gray-100">
            {book.comments.map((comment) => (
              <Container>
                <div className="mb-10 -ml-5 flex">
                  <div className="mr-3">
                    <Avatar
                      alt={comment.name}
                      src={comment.photo}
                      className={classes.large}
                    />
                  </div>
                  <div>
                    <strong>{comment.name}</strong>{' '}
                    <span className="ml-2 text-sm text-gray-400">
                      {comment.createdAt.substring(0, 10)}{' '}
                    </span>
                    <p className="text-lg">{comment.comment}</p>
                  </div>
                </div>
              </Container>
            ))}
          </div>
          <div className="mb-3 text-gray-700">Add a comment</div>
          {successBookComment && (
            <Box my={2} width="97%">
              <Message severity="success">Comment added successfully!</Message>
            </Box>
          )}
          {loadingBookComment && <CircularProgress />}
          {errorBookComment && (
            <Box my={2} width="97%">
              <Message severity="error">{errorBookComment}</Message>
            </Box>
          )}

          {userInfo ? (
            <Container>
              <div className="-ml-6 flex flex-col">
                <form onSubmit={submitHandler}>
                  <div>
                    <textarea
                      rows="6"
                      type="text"
                      id="comment"
                      placeholder="Your comment"
                      value={comment}
                      className="w-full mb-2 px-3 py-3 placeholder-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div>
                    <button
                      className="self-end bg-pink-600 text-sm uppercase py-3 px-4 text-white rounded-md transform hover:scale-105 focus:scale-100 motion-reduce:transform-none duration-300 focus:outline-none"
                      type="submit"
                      disabled={loadingBookComment}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </Container>
          ) : (
            <Message>
              Please <Link to="/login">sign in</Link> to make a comment
            </Message>
          )}
        </Container>
      )}
    </div>
  );
};

export default BookPage;
