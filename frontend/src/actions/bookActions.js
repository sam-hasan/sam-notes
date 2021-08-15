import axios from 'axios';
import { logout } from './userActions';

import {
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  BOOK_LIST_FAIL,
  BOOK_DETAILS_REQUEST,
  BOOK_DETAILS_SUCCESS,
  BOOK_DETAILS_FAIL,
  BOOK_DELETE_REQUEST,
  BOOK_DELETE_SUCCESS,
  BOOK_DELETE_FAIL,
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAIL,
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_FAIL,
  BOOK_CREATE_COMMENT_REQUEST,
  BOOK_CREATE_COMMENT_SUCCESS,
  BOOK_CREATE_COMMENT_FAIL,
} from '../constants/bookConstants';

// ACTION CREATORS
export const listBooks = () => async (dispatch) => {
  try {
    dispatch({ type: BOOK_LIST_REQUEST });

    const { data } = await axios.get('/api/v1/books');

    dispatch({
      type: BOOK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listBookDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BOOK_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/books/${id}`);

    dispatch({
      type: BOOK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteBook = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/v1/books/${id}`, config);

    dispatch({
      type: BOOK_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'The user belonging to this token no longer exists.') {
      dispatch(logout());
    }
    dispatch({
      type: BOOK_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createBook = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/v1/books`, {}, config);

    dispatch({
      type: BOOK_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'The user belonging to this token no longer exists.') {
      dispatch(logout());
    }
    dispatch({
      type: BOOK_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateBook = (book) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/v1/books/${book._id}`, book, config);

    dispatch({
      type: BOOK_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: BOOK_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'The user belonging to this token no longer exists.') {
      dispatch(logout());
    }
    dispatch({
      type: BOOK_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const createBookComment =
  (bookId, comment) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BOOK_CREATE_COMMENT_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/v1/books/${bookId}/comments`, comment, config);

      dispatch({
        type: BOOK_CREATE_COMMENT_SUCCESS,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'The user belonging to this token no longer exists.') {
        dispatch(logout());
      }
      dispatch({
        type: BOOK_CREATE_COMMENT_FAIL,
        payload: message,
      });
    }
  };
