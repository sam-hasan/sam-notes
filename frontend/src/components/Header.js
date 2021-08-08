import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { Avatar } from '@material-ui/core';
import makeStyles from '../components/ImageAvatars';

const Header = () => {
  const classes = makeStyles();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="w-screen h-24 flex flex-row items-center p-1 justify-between bg-purple-700 shadow-xs antialiased font-sans">
      <div className="ml-32 text-3xl text-white hidden md:flex ">
        <Link to="/">SamNotes</Link>
      </div>

      <div className="flex flex-row-reverse items-center mr-20 hidden md:flex">
        {userInfo ? (
          <Link to="/profile" className="flex">
            {' '}
            <Avatar
              alt={userInfo.name}
              src={userInfo.photo}
              className={classes.large}
            />
            {/* <div className="text-base uppercase self-center p-1 ml-1 text-white">
              {userInfo.name.split(' ')[0]}
            </div> */}
          </Link>
        ) : (
          <Link
            to="/login"
            className="text-white text-base text-center px-3 py-3 ml-5 uppercase rounded md:rounded antialiased"
          >
            Log In
          </Link>
        )}
        {userInfo ? (
          <Link
            to="/logout"
            className="text-white text-base text-center py-3 uppercase mr-5 rounded md:rounded antialiased"
            onClick={logoutHandler}
          >
            Log Out
          </Link>
        ) : (
          <Link
            to="/signup"
            className="text-white text-base text-center px-3 py-3 uppercase rounded md:rounded antialiased"
          >
            Sign Up
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
