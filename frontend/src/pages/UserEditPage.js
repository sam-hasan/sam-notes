import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import { CircularProgress, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
// import e from 'express';

const UserEditPage = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, role }));
  };

  return (
    <div className="container mx-auto antialiased mt-12 mb-20">
      <div>
        <Link to="/admin/userlist">
          <ion-icon
            name="chevron-back-outline"
            style={{
              color: 'rgba(124, 58, 237)',
              fontSize: '40px',
            }}
          ></ion-icon>
        </Link>
      </div>
      <div className="max-w-xl mx-auto mt-10">
        <div className="text-center">
          <h1 className="mt-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
            Edit User
          </h1>
          <div className="pt-3">
            {loadingUpdate && <CircularProgress />}
            {errorUpdate && <Message severity="error">{errorUpdate}</Message>}
          </div>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Message severity="error">{error}</Message>
          ) : (
            <Container>
              <div className="m-7">
                <form onSubmit={submitHandler}>
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <label
                        for="name"
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        Name
                      </label>
                    </div>
                    <input
                      type="name"
                      name="name"
                      id="name"
                      placeholder="Your name"
                      value={name}
                      className="w-full px-3 py-3 placeholder-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      for="email"
                      className="block mb-2 text-left text-sm text-gray-600 dark:text-gray-400"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email address"
                      value={email}
                      className="w-full px-3 py-3 placeholder-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-6 flex flex-col">
                    <label
                      for="roles"
                      className="block mb-2 text-left text-sm text-gray-600 dark:text-gray-400"
                    >
                      Role
                    </label>
                    <div className="self-start">
                      <select
                        id="roles"
                        name="roles"
                        className="text-sm"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </div>
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
    </div>
  );
};

export default UserEditPage;
