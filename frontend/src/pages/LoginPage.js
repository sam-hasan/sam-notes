import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { login } from '../actions/userActions';
import { CircularProgress } from '@material-ui/core';

const LoginPage = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) history.push(redirect);
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="container mx-auto antialiased mt-12 mb-20">
      <div className="max-w-md mx-auto my-10">
        <div className="text-center">
          <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
            Log in
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Log in to access your account
          </p>
          <div className="pt-6">
            {error && <Message severity="error">{error}</Message>}
            {loading && <CircularProgress />}
          </div>
        </div>
        <div className="m-7">
          <form onSubmit={submitHandler}>
            <div className="mb-6">
              <label
                for="email"
                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email address"
                className="w-full px-3 py-3 placeholder-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label
                  for="password"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Password
                </label>
                <a
                  href="#!"
                  className="text-sm text-gray-400 focus:outline-none focus:text-purple-600 hover:text-purple-600 dark:hover:text-indigo-300"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Your Password"
                className="w-full px-3 py-3 placeholder-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="w-full px-3 py-4 text-white bg-pink-600 rounded-md transform hover:scale-105 focus:scale-100 motion-reduce:transform-none duration-300 focus:outline-none"
              >
                Log in
              </button>
            </div>
            <p className="text-sm text-center text-gray-400">
              Don&#x27;t have an account yet?{' '}
              <Link
                className="text-purple-600 focus:outline-none focus:underline focus:text-gradient dark:focus:border-indigo-800"
                to={redirect ? `/signup?redirect=${redirect}` : '/signup'}
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
