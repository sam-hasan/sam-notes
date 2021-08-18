import React from 'react';

const Hero = () => {
  return (
    <div
      className="hero bg-cover bg-center filter bg-fixed saturate-100"
      style={{
        backgroundImage: 'url(/images/hero-image-3.jpeg)',
      }}
    >
      <div className="hero-text flex justify-start items-center font-semibold w-2/6 p-5 h-2/5 rounded-md text-white text-5xl antialiased">
        <div className="text-left uppercase">
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
