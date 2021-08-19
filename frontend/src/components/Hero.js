import React from 'react';

const Hero = () => {
  return (
    <div
      className="hero bg-cover bg-center filter bg-fixed saturate-100"
      style={{
        backgroundImage: 'url(/images/hero-image-2.jpeg)',
      }}
    >
      <div className="transform absolute lg:text-center sm:text-center lg:top-2/4 lg:left-1/4 sm:top-2/4 sm:left-2/4 lg:-translate-x-1/2 lg:-translate-y-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 flex justify-start items-center lg:font-semibold sm:font-semibold lg:w-2/6 lg:p-5 lg:h-2/5 lg:text-4xl sm:w-4/5 sm:text-2xl rounded-md text-white antialiased">
        <div className="lg:text-left sm:text-center uppercase">
          Hey friends &mdash; I'm Sam. <br />
          <span className="text-2xl normal-case tracking-tight leading-3 font-semibold">
            Welcome to my book club! Reading, for me, is one of the best ways
            for better understanding the world, better thinking, and learning
            new things. On this site, you will find summaries and reviews of the
            books I read everyday.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
