import React from 'react';
import { Link } from 'react-router-dom';

const Book = ({ book }) => {
  return (
    <Link
      to={`/book/${book._id}`}
      className="flex p-6 m-5  w-2/5 .shadow-2xl hover:bg-purple-50 antialiased rounded-lg md:rounded-lg"
    >
      <div className="flex-none w-44 relative">
        <img
          src={book.image}
          alt={book.title}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex-auto pl-6">
        <div className="flex flex-wrap items-baseline">
          <h1 className="w-full flex-none font-semibold mb-2.5 text-xl text-purple-600">
            {book.title}
          </h1>

          <div className="text-base text-gray-500 font-semibold ">
            {book.author}
          </div>
        </div>
        <div className="flex items-baseline my-2">
          <div className="space-x-2 flex text-sm font-medium"></div>
          <div className="text-sm text-gray-500">{book.preview}</div>
        </div>
      </div>
    </Link>
  );
};

export default Book;
