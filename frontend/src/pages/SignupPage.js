import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../actions/userActions';
import { CircularProgress } from '@material-ui/core';

const SignUpPage = ({ history, location }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userSignup = useSelector((state) => state.userSignup);
  const { loading, error } = userSignup;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    const name = `${firstname} ${lastname}`;
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(signup(name, email, password));
    }
  };
  return (
    <div className="container mx-auto antialiased">
      <div className="max-w-md mx-auto my-10">
        <div className="text-center">
          <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
            Sign up
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Sign up to access all of SamNotes
          </p>
          <div className="pt-6">
            {message && <Message severity="error">{message}</Message>}
            {error && <Message severity="error">{error}</Message>}
            {loading && <CircularProgress />}
          </div>
        </div>
        <div className="m-7">
          <form onSubmit={submitHandler}>
            <div className="flex justify-between">
              <div className="mb-6">
                <label
                  for="firstname"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  First name
                </label>
                <input
                  type="firstname"
                  name="firstname"
                  id="firstname"
                  placeholder="First name"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  for="lastname"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  Last name
                </label>
                <input
                  type="lastname"
                  name="lastname"
                  id="lastname"
                  placeholder="Last name"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                for="email"
                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email address"
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                onChange={(e) => setEmail(e.target.value)}
                required
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
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Your Password"
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <div className="flex justify-between mb-2"></div>
              <label
                for="confirmpassword"
                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                placeholder="Confirm password"
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <button
                type="submit"
                className="w-full px-3 py-4 text-white bg-purple-700 rounded-md focus:bg-indigo-600 focus:outline-none"
              >
                Sign up
              </button>
            </div>
            <p className="text-sm text-center text-gray-400">
              Already have an account?{' '}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : '/login'}
                className="text-purple-700 focus:outline-none focus:underline focus:text-purple-700 dark:focus:border-indigo-800"
              >
                Log in
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
