import React from 'react';
import { Link } from 'react-router-dom';

const Book = ({ book }) => {
  return (
    <Link
      to={`/book/${book._id}`}
      className="flex p-6 lg:m-5 sm:m-3 md:w-5/12 lg:w-2/5 .shadow-2xl lg:hover:bg-pink-50 antialiased rounded-sm md:rounded-sm lg:py-5 sm:py-4"
    >
      <div className="flex-none w-40 relative">
        <img
          src={book.image}
          alt={book.title}
          className="absolute inset-0 sm:h-5/6 sm:w-5/6 lg:h-full lg:w-full md:h-full md:w-full rounded-sm"
        />
      </div>
      <div className="flex-auto pl-6">
        <div className="flex flex-wrap items-baseline">
          <h1 className="w-full flex-none font-semibold mb-2.5 text-xl text-gradient">
            {book.title}
          </h1>

          <div className="text-lg text-gray-900 font-semibold">
            {book.author}
          </div>
        </div>
        <div className="flex items-baseline my-2">
          <div className="space-x-2 flex text-sm font-medium"></div>
          <div className="text-sm text-gray-700">{book.preview}</div>
        </div>
      </div>
    </Link>
  );
};

export default Book;
