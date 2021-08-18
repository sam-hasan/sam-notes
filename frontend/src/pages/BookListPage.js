import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { listBooks, deleteBook, createBook } from '../actions/bookActions';
import { BOOK_CREATE_RESET } from '../constants/bookConstants';
import { Avatar, Button, CircularProgress, Container } from '@material-ui/core';
import makeStyles from '../components/ImageAvatars';

import { Link } from 'react-router-dom';

const BookListPage = ({ history, match }) => {
  const classes = makeStyles();
  const dispatch = useDispatch();

  const bookList = useSelector((state) => state.bookList);
  const { loading, error, books } = bookList;

  const bookDelete = useSelector((state) => state.bookDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = bookDelete;

  const bookCreate = useSelector((state) => state.bookCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    book: createdBook,
  } = bookCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: BOOK_CREATE_RESET });

    if (!userInfo || userInfo.role !== 'admin') history.push('/login');

    if (successCreate) {
      history.push(`/admin/book/${createdBook._id}/edit`);
    } else {
      dispatch(listBooks());
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdBook]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) dispatch(deleteBook(id));
  };
  const createBookHandler = () => {
    dispatch(createBook());
  };

  return (
    <div class="container mx-auto px-4 sm:px-8 antialiased text-xl mt-12 mb-20">
      <div class="pb-6">
        {loadingDelete && <CircularProgress />}
        {errorDelete && <Message severity="error">{errorDelete}</Message>}
        {loadingCreate && <CircularProgress />}
        {errorCreate && <Message severity="error">{errorCreate}</Message>}
        <div className="ml-7 flex justify-between items-center">
          <h2 class="block font-semibold pt-4 pb-4 text-gradient text-2xl uppercase">
            Books
          </h2>
          <div className="mr-7 bg-purple-600 p-2 rounded-md transform hover:scale-105 focus:scale-100 motion-reduce:transform-none duration-300 focus:outline-none">
            <Button onClick={createBookHandler}>
              <ion-icon
                name="add"
                style={{
                  color: 'white',
                  fontSize: '24px',
                }}
              ></ion-icon>
              <span className="text-white">Add Book</span>
            </Button>
          </div>
        </div>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Message severity="error">{error}</Message>
        ) : (
          <Container>
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table class="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th class="px-5 py-4 bg-purple-600 text-left text-sm font-semibold text-white uppercase">
                        Title
                      </th>
                      <th class="px-5 py-4 bg-purple-600 text-left text-sm font-semibold text-white uppercase">
                        Author
                      </th>
                      <th class="px-5 py-4 bg-purple-600 text-left text-sm font-semibold text-white uppercase">
                        Genre
                      </th>
                      <th class="px-5 py-4 bg-purple-600 text-left text-sm font-semibold text-white uppercase">
                        ID
                      </th>
                      <th class="px-5 py-4 bg-purple-600 text-left text-sm font-semibold text-white uppercase"></th>
                      <th class="px-5 py-4 bg-purple-600 text-left text-sm font-semibold text-white uppercase"></th>
                    </tr>
                  </thead>
                  {books.map((book) => (
                    <tbody>
                      <tr>
                        <td class="px-5 py-4  bg-white text-sm">
                          <div class="flex items-center">
                            <div class="flex-shrink-0 w-10 h-10">
                              <Avatar
                                alt={book.title}
                                src={book.image}
                                className={classes.large}
                              />
                            </div>
                            <div class="ml-3">
                              <p class="text-gray-900 whitespace-no-wrap p-2">
                                {book.title}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-5 py-4  bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {book.author}
                          </p>
                        </td>
                        <td class="px-5 py-4  bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {book.genre}
                          </p>
                        </td>
                        <td class="py-4  bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {book._id}
                          </p>
                        </td>
                        <td class="bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap p-1">
                            <Link to={`/admin/book/${book._id}/edit`}>
                              <ion-icon
                                name="create-outline"
                                style={{
                                  color: 'rgba(124, 58, 237)',
                                  fontSize: '24px',
                                }}
                              ></ion-icon>
                            </Link>
                          </p>
                        </td>
                        <td class="bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            <Button onClick={() => deleteHandler(book._id)}>
                              <ion-icon
                                style={{ color: 'red', fontSize: '24px' }}
                                name="trash"
                              ></ion-icon>
                            </Button>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </Container>
        )}
      </div>
    </div>
  );
};

export default BookListPage;
