import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress, Container } from '@material-ui/core';
import { listBookDetails, updateBook } from '../actions/bookActions';
import Message from '../components/Message';
import { BOOK_UPDATE_RESET } from '../constants/bookConstants';

const BookEditPage = ({ match, history }) => {
  const bookId = match.params.id;

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState(0);
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');
  const [topSentences, setTopSentences] = useState('');
  const [impressions, setImpressions] = useState('');
  const [recommendedFor, setRecommendedFor] = useState('');
  const [influence, setInfluence] = useState('');
  const [topQuotes, setTopQuotes] = useState([]);
  const [genre, setGenre] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const bookDetails = useSelector((state) => state.bookDetails);
  const { loading, error, book } = bookDetails;

  const bookUpdate = useSelector((state) => state.bookUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = bookUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BOOK_UPDATE_RESET });
      history.push('/admin/booklist');
    } else {
      if (!book.title || book._id !== bookId) {
        dispatch(listBookDetails(bookId));
      } else {
        setTitle(book.title);
        setAuthor(book.author);
        setImage(book.image);
        setPreview(book.preview);
        setRecommendedFor(book.recommendedFor);
        setTopSentences(book.topSentences);
        setImpressions(book.impressions);
        setInfluence(book.influence);
        setTopQuotes(book.topQuotes);
        setGenre(book.genre);
      }
    }
  }, [dispatch, history, bookId, book, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/v1/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateBook({
        _id: bookId,
        title,
        author,
        image,
        preview,
        recommendedFor,
        topSentences,
        impressions,
        influence,
        topQuotes,
        genre,
      })
    );
  };

  return (
    <div className="container mx-auto antialiased mt-12 mb-20">
      <Link to="/admin/booklist">
        <ion-icon
          name="chevron-back-outline"
          className="block"
          style={{
            color: 'rgba(124, 58, 237)',
            fontSize: '40px',
          }}
        ></ion-icon>
      </Link>

      <div className="max-w-2xl mx-auto my-10">
        <div className="text-center">
          <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
            Edit Book
          </h1>
          <div className="pt-4">
            {loadingUpdate && <CircularProgress />}
            {errorUpdate && <Message severity="error">{errorUpdate}</Message>}
            {loading && <CircularProgress />}
          </div>
        </div>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Message severity="error"></Message>
        ) : (
          <Container>
            <div className="m-7">
              <form onSubmit={submitHandler}>
                <div className="mb-6">
                  <label
                    for="title"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Title
                  </label>
                  <input
                    type="title"
                    name="title"
                    id="title"
                    placeholder="Title"
                    value={title}
                    className="w-full px-3 py-3 placeholder-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <div className="mb-6 w-6/12 mr-2">
                    <label
                      for="author"
                      className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      Author
                    </label>
                    <input
                      type="author"
                      name="author"
                      id="author"
                      placeholder="Author"
                      value={author}
                      className="w-full px-3 py-3 placeholder-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                      onChange={(e) => setAuthor(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-6 w-6/12 ml-2">
                    <label
                      for="genre"
                      className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      Genre
                    </label>
                    <input
                      type="genre"
                      name="genre"
                      id="genre"
                      placeholder="Genre"
                      value={genre}
                      className="w-full px-3 py-3 placeholder-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                      onChange={(e) => setGenre(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label
                      for="image"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      Choose a Cover
                    </label>
                  </div>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="w-full px-3 py-3 placeholder-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500 outline-none"
                    onChange={uploadFileHandler}
                  />
                  {uploading && <CircularProgress />}
                </div>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label
                      for="preview"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      The Book's Preview
                    </label>
                  </div>
                  <textarea
                    rows="8"
                    type="preview"
                    name="preview"
                    id="preview"
                    placeholder="The Book's Preview"
                    value={preview}
                    className="w-full px-3 py-3 placeholder-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    onChange={(e) => setPreview(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label
                      for="topSentences"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      The Book In Three Sentences
                    </label>
                  </div>
                  <textarea
                    rows="8"
                    type="topSentences"
                    name="topSentences"
                    id="topSentences"
                    placeholder="Top Sentences"
                    value={topSentences}
                    className="w-full px-3 py-3 placeholder-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    onChange={(e) => setTopSentences(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <div className="flex justify-between mb-2"></div>
                  <label
                    for="impressions"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    How I Discovered It
                  </label>
                  <textarea
                    rows="8"
                    type="text"
                    name="impressions"
                    id="impressions"
                    placeholder="How I Discovered It"
                    value={impressions}
                    className="w-full px-3 py-3 placeholder-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    onChange={(e) => setImpressions(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <div className="flex justify-between mb-2"></div>
                  <label
                    for="recommendedFor"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Who Should Read It
                  </label>
                  <textarea
                    rows="8"
                    type="text"
                    name="recommendedFor"
                    id="recommendedFor"
                    placeholder="Who Should Read It"
                    value={recommendedFor}
                    className="w-full px-3 py-3 placeholder-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    onChange={(e) => setRecommendedFor(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <div className="flex justify-between mb-2"></div>
                  <label
                    for="influence"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    How The Book Changed You
                  </label>
                  <textarea
                    rows="8"
                    type="text"
                    name="influence"
                    id="influence"
                    placeholder="How The Book Changed You"
                    value={influence}
                    className="w-full px-3 py-3 placeholder-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    onChange={(e) => setInfluence(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <div className="flex justify-between mb-2"></div>
                  <label
                    for="topQuotes"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Your Top Three Quotes (All the quotes must be comma
                    seperated)
                  </label>
                  <textarea
                    rows="8"
                    type="text"
                    name="topQuotes"
                    id="topQuotes"
                    placeholder="Your Top Three Quotes"
                    value={topQuotes.join(', ')}
                    className="w-full px-3 py-3 placeholder-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    onChange={(e) => setTopQuotes(e.target.value.split(', '))}
                    required
                  />
                </div>

                <div className="mb-6">
                  <button
                    type="submit"
                    className="w-full px-3 py-4 text-white bg-pink-600 rounded-md transform hover:scale-105 focus:scale-100 motion-reduce:transform-none duration-300 focus:outline-none"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </Container>
        )}
      </div>
    </div>
  );
};

export default BookEditPage;
