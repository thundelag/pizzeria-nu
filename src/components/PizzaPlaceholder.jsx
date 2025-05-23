import React from 'react';

/**
 * Pizza placeholder component that displays when an image fails to load
 * 
 * @param {Object} props - Component props 
 * @param {string} props.className - CSS classes to apply
 * @param {string} props.message - Optional message to display
 */
const PizzaPlaceholder = ({ className = '', message = 'Image not available' }) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center bg-red-50 ${className}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-48 bg-gray-200 animate-pulse" />
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse" />
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
          </div>
          <div className="flex justify-between items-center">
            <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse" />
            <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaPlaceholder;
