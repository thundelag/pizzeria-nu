import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { getAvailablePizzaImageKeys, generatePizzaImageReport } from '../utils/imageUtils';
import { PIZZA_IMAGES, getPizzaImage } from '../constants/images';
import { isLocalEnvironment } from '../utils/environmentUtils';
import debugConfig, { isDebugFeatureEnabled } from '../config/debugConfig';

const ImageDebugOverlay = ({ 
  pizzas = [], 
  show = isDebugFeatureEnabled('imageDebug.showDebugPanel')
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [report, setReport] = useState(null);
  
  // Generate report when pizzas change
  useEffect(() => {
    if (pizzas.length > 0 && isDebugFeatureEnabled('imageDebug.showImageReport')) {
      setReport(generatePizzaImageReport(pizzas));
    }
  }, [pizzas]);
  
  // Toggle visibility based on prop
  useEffect(() => {
    setIsVisible(show && isLocalEnvironment());
  }, [show]);
  
  // Toggle visibility with keyboard shortcut (Alt+I)
  useEffect(() => {
    // Only add shortcut listener in local environment
    if (!isLocalEnvironment()) return;
    
    const handleKeyDown = (e) => {
      if (e.altKey && e.key === 'i') {
        setIsVisible(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Don't render if not visible or not in local environment
  if (!isVisible || !isLocalEnvironment() || !isDebugFeatureEnabled('imageDebug.enabled')) return null;
  
  if (!isVisible || !report) return null;
  
  return createPortal(
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50 max-h-96 overflow-auto text-gray-900">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Pizza Image Debug Panel</h3>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Press Alt+I to toggle</span>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            Close
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">Match Statistics</h4>
          <div className="bg-gray-100 p-3 rounded text-sm">
            <div className="flex justify-between mb-1">
              <span>Total Pizzas:</span>
              <span className="font-medium">{report.total}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Matched:</span>
              <span className={`font-medium ${report.matched === report.total ? 'text-green-600' : ''}`}>
                {report.matched} ({report.matchRate})
              </span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Unmatched:</span>
              <span className={`font-medium ${report.unmatched > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {report.unmatched}
              </span>
            </div>
          </div>
          
          {report.unmatched > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2 text-red-600">Unmatched Pizzas</h4>
              <div className="bg-red-50 p-3 rounded text-sm">
                <ul className="list-disc pl-5">
                  {report.unmatchedPizzas.map((pizza, index) => (
                    <li key={index} className="mb-1">
                      <strong>{pizza.name}</strong> (normalized: {pizza.normalizedName})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          <div className="mt-4">
            <h4 className="font-medium mb-2">Available Image Keys</h4>
            <div className="bg-gray-100 p-3 rounded text-sm max-h-40 overflow-auto">
              <ul className="list-disc pl-5">
                {getAvailablePizzaImageKeys().map((key) => (
                  <li key={key} className="mb-1">{key}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Image Preview</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.entries(PIZZA_IMAGES)
              .filter(([key]) => key !== 'placeholder')
              .map(([key, image]) => (
                <div key={key} className="text-center">
                  <div className="bg-gray-100 p-1 rounded">
                    <img 
                      src={image} 
                      alt={key} 
                      className="w-full h-24 object-cover mx-auto border border-gray-200 rounded"
                    />
                  </div>
                  <p className="text-xs mt-1 truncate">{key}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ImageDebugOverlay;
