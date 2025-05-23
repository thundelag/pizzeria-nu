import { useState, useEffect } from 'react';
import { getImageUrl } from '../utils/imageUtils';
import { isLocalEnvironment, debugLog } from '../utils/environmentUtils';

/**
 * Helper hook to check which image imports are working and which are not
 * This is primarily a debugging tool to help diagnose image loading issues
 * 
 * @param {Object[]} imageObjects - Array of objects containing image imports
 * @param {string} imageProperty - Name of the property containing the image import
 * @param {string} nameProperty - Name of the property containing the image name/identifier
 */
const useImageVerification = (imageObjects, imageProperty = 'image', nameProperty = 'name') => {
  const [results, setResults] = useState({ 
    valid: [], 
    invalid: [], 
    checking: true 
  });

  useEffect(() => {
    // Skip verification in production environments
    if (!isLocalEnvironment()) {
      setResults({
        valid: [],
        invalid: [],
        checking: false
      });
      return;
    }
    
    const checkImages = async () => {
      const validItems = [];
      const invalidItems = [];

      // Create an array of promises for checking each image
      const checks = imageObjects.map(async (item) => {
        const image = item[imageProperty];
        const name = item[nameProperty];
        const imageUrl = getImageUrl(image);
        
        try {
          // Test if the image can be loaded
          const loadTest = await new Promise((resolve) => {
            if (!imageUrl) {
              resolve({ success: false, name, error: 'Empty URL' });
              return;
            }
            
            const img = new Image();
            
            img.onload = () => resolve({ success: true, name, url: imageUrl });
            img.onerror = () => resolve({ success: false, name, url: imageUrl, error: 'Failed to load' });
            
            img.src = imageUrl;
            
            // Add a timeout
            setTimeout(() => {
              if (!img.complete) {
                resolve({ success: false, name, url: imageUrl, error: 'Timeout' });
              }
            }, 3000);
          });
          
          if (loadTest.success) {
            validItems.push({ ...item, url: loadTest.url });
          } else {
            invalidItems.push({ ...item, error: loadTest.error });
          }
        } catch (error) {
          invalidItems.push({ ...item, error: error.message });
        }
      });
      
      await Promise.all(checks);
      
      setResults({
        valid: validItems,
        invalid: invalidItems,
        checking: false
      });
    };
    
    checkImages();
  }, [imageObjects, imageProperty, nameProperty]);
  
  return results;
};

export default useImageVerification;
