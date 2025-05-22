import React from 'react';

const About = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-red-600 font-semibold tracking-wide uppercase">Our Story</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            The Passion Behind Pizzeria NU
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            From humble beginnings to becoming the town's favorite pizzeria
          </p>
        </div>

        <div className="mt-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="relative">
              <div className="relative lg:aspect-w-16 lg:aspect-h-9">
                <img 
                  className="object-cover shadow-xl rounded-lg" 
                  src="https://images.unsplash.com/photo-1579751626657-72bc17010498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" 
                  alt="Chef preparing pizza" 
                />
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900">Our Beginning</h3>
                  <p className="mt-3 text-lg text-gray-500">
                    Pizzeria NU was founded in 2020 by Chef Antonio Romano, who brought his family's traditional recipes from Naples to create authentic Italian pizzas. What started as a small take-out spot quickly became a neighborhood favorite.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900">Our Philosophy</h3>
                  <p className="mt-3 text-lg text-gray-500">
                    We believe that great pizza comes from great ingredients. That's why we source our tomatoes, flour, and olive oil directly from Italy, and partner with local farmers for the freshest vegetables and dairy products.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900">Our Commitment</h3>
                  <p className="mt-3 text-lg text-gray-500">
                    Every pizza we serve is handcrafted with care and baked in our wood-fired oven. We're committed to maintaining the highest standards of quality while providing a warm, welcoming atmosphere for our guests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-md bg-red-500 text-white mx-auto">
                <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Meet Our Team</h3>
              <p className="mt-2 text-base text-gray-500">
                Our team of passionate chefs and friendly staff are dedicated to providing you with an exceptional dining experience.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-md bg-red-500 text-white mx-auto">
                <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Quality Ingredients</h3>
              <p className="mt-2 text-base text-gray-500">
                We use only the finest ingredients, sourced both locally and from Italy, to create our delicious pizzas and Italian dishes.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-md bg-red-500 text-white mx-auto">
                <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Special Events</h3>
              <p className="mt-2 text-base text-gray-500">
                From private parties to catering services, we offer a range of options to make your special occasions memorable with our delicious food.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
