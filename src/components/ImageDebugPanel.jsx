import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import useImageVerification from '../hooks/useImageVerification';
import { getImageUrl } from '../utils/imageUtils';
import { isLocalEnvironment } from '../utils/environmentUtils';

/**
 * Debug panel that checks all provided images and displays their status
 * This component should only be used during development
 * 
 * @param {Object} props - Component props
 * @param {Object[]} props.images - Array of objects containing image imports
 * @param {string} props.imageProperty - Name of the property containing the image import
 * @param {string} props.nameProperty - Name of the property containing the image name/identifier
 * @param {boolean} props.show - Whether to show the debug panel
 */
const ImageDebugPanel = ({ 
  images, 
  imageProperty = 'image', 
  nameProperty = 'name',
  show = isLocalEnvironment()
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { valid, invalid, checking } = useImageVerification(images, imageProperty, nameProperty);
  
  // Toggle visibility when 'show' prop changes
  useEffect(() => {
    setIsVisible(show && isLocalEnvironment());
  }, [show]);
  
  // Don't render if not visible or not in local environment
  if (!isVisible || !isLocalEnvironment()) return null;
  
  // Create a portal to render at the bottom of the page
  return createPortal(
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50 max-h-72 overflow-auto">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Image Debug Panel</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
      
      {checking ? (
        <p>Checking images...</p>
      ) : (
        <div>
          <div className="mb-4">
            <h4 className="font-medium text-green-600">Valid Images: {valid.length}</h4>
            <div className="grid grid-cols-5 gap-2 mt-2">
              {valid.map((item, index) => (
                <div key={index} className="text-center">
                  <img 
                    src={getImageUrl(item[imageProperty])} 
                    alt={item[nameProperty]} 
                    className="w-20 h-20 object-cover mx-auto border border-gray-200 rounded"
                  />
                  <p className="text-xs mt-1">{item[nameProperty]}</p>
                </div>
              ))}
            </div>
          </div>
          
          {invalid.length > 0 && (
            <div>
              <h4 className="font-medium text-red-600">Invalid Images: {invalid.length}</h4>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {invalid.map((item, index) => (
                  <div key={index} className="flex items-center border border-red-200 rounded p-2">
                    <div className="bg-red-100 w-20 h-20 flex items-center justify-center rounded">
                      <svg className="w-8 h-8 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">{item[nameProperty]}</p>
                      <p className="text-sm text-red-600">Error: {item.error}</p>
                      <p className="text-xs text-gray-500 break-all">{getImageUrl(item[imageProperty]) || 'No URL'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>,
    document.body
  );
};

export default ImageDebugPanel;
