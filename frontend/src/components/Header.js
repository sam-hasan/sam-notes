import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="w-screen h-24 flex flex-row items-center p-1 justify-between bg-purple-700 shadow-xs antialiased font-sans">
      <div className="ml-32 text-3xl text-white hidden md:flex ">
        <Link to="/">SamNotes</Link>
      </div>

      <div className="flex flex-row-reverse mr-32 hidden md:flex">
        <Link
          to="/login"
          className="text-purple-900 text-center text-sm bg-white px-6 py-3 m-4 uppercase rounded md:rounded"
        >
          {/* <Link to="/login">Log In</Link> */}
          Log In
        </Link>
        <Link
          to="/signup"
          className="text-purple-900 text-center text-sm bg-white px-6 py-3 m-4 uppercase rounded md:rounded"
        >
          {/* <Link to="/signup">Sign Up</Link> */}
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Header;
