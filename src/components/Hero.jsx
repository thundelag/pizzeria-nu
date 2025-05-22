import React from 'react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-red-500 to-orange-500">
      <div className="absolute inset-0">
        <img 
          className="w-full h-full object-cover opacity-30" 
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
          alt="Pizza background" 
        />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Delicious Pizza, Made Fresh Daily
        </h1>
        <p className="mt-6 text-xl text-white max-w-3xl">
          Our handcrafted pizzas feature the finest ingredients and traditional recipes, bringing the authentic taste of Italy straight to your table.
        </p>        <div className="mt-10">
          <a 
            href="#menu" 
            className="inline-block bg-white py-3 px-8 rounded-md font-medium text-red-600 hover:bg-gray-100 shadow-md transition-all duration-300 hover:scale-105"
          >
            Order Now
          </a>
          <a 
            href="#menu" 
            className="inline-block ml-4 py-3 px-8 rounded-md font-medium text-white border-2 border-white hover:bg-white hover:text-red-600 transition-all duration-300"
          >
            View Menu
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
