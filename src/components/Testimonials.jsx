import React, { useState, useEffect } from 'react';
import useImageWithFallback from '../hooks/useImageWithFallback';
import Image from './Image';

const TestimonialCard = ({ name, image, quote, rating }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center mb-4">
        <Image 
          src={image} 
          alt={name} 
          className="h-12 w-12 rounded-full object-cover" 
        />
        <div className="ml-4">
          <h4 className="text-lg font-medium text-gray-900">{name}</h4>
          <div className="flex mt-1">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 italic">"{quote}"</p>
    </div>
  );
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      image: 'https://randomuser.me/api/portraits/women/12.jpg',
      quote: "Best pizza I've ever had! The crust is perfectly crispy and the toppings are always fresh. My family orders from Pizzeria NU every Friday night.",
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      quote: 'Their Margherita pizza reminds me of the ones I had in Italy. Authentic taste and quick delivery make this my go-to pizza place.',
      rating: 5
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      image: 'https://randomuser.me/api/portraits/women/33.jpg',
      quote: "Great variety of pizzas and the ingredients are always high quality. Love the new vegetarian options they've added!",
      rating: 4
    },
    {
      id: 4,
      name: 'James Wilson',
      image: 'https://randomuser.me/api/portraits/men/44.jpg',
      quote: 'Ordered catering for our office party and everyone was impressed. The pizzas arrived hot and on time. Will definitely order again!',
      rating: 5
    }
  ];

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // For swipe gestures on mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      handleNext();
    }
    if (touchStart - touchEnd < -100) {
      handlePrev();
    }
  };

  // Display content depending on screen size
  // On mobile: carousel with one testimonial at a time
  // On desktop: grid with all testimonials

  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">What Our Customers Say</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Don't just take our word for it — hear from our satisfied customers.
          </p>
        </div>
        
        {/* Mobile Carousel (visible on small screens) */}
        <div 
          className="mt-12 md:hidden relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between absolute top-1/2 transform -translate-y-1/2 left-0 right-0 px-2">
            <button 
              onClick={handlePrev}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handleNext}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-2 mx-1 rounded-full ${
                  index === activeIndex ? 'bg-red-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Desktop Grid (visible on medium screens and up) */}
        <div className="mt-12 hidden md:grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
