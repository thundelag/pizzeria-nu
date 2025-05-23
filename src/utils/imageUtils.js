/**
 * Utility functions for handling image resources
 */
import { PIZZA_IMAGES, getPizzaImage } from '../constants/images';
import { isLocalEnvironment, debugLog } from './environmentUtils';

/**
 * Converts an image name to a proper URL or imports the local image
 * @param {string} imageName - The name of the image without extension
 * @returns {string} The URL or imported image path
 */
export const getImageUrl = (imageName) => {
  if (!imageName) return PIZZA_IMAGES.placeholder;
  return getPizzaImage(imageName);
};

/**
 * Check if a URL is a valid image by attempting to load it
 * 
 * @param {string} url - The URL to check
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<boolean>} - Promise resolving to true if image is valid, false otherwise
 */
export const isValidImageUrl = (url, timeout = 5000) => {
  if (!url) return Promise.resolve(false);
  
  // Handle imported images from Vite which are already resolved
  if (url && typeof url === 'string' && (
    url.startsWith('data:') || 
    url.startsWith('blob:') || 
    url.includes('assets/')
  )) {
    return Promise.resolve(true);
  }
  
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(false);
    }, timeout);

    const img = new Image();
    
    img.onload = () => {
      clearTimeout(timer);
      resolve(true);
    };
    
    img.onerror = () => {
      clearTimeout(timer);
      resolve(false);
    };
    
    img.src = url;
  });
};

/**
 * Generates a debugging report for pizza image mapping
 * @param {Array} pizzaData - Array of pizza objects
 * @returns {Object} - Object containing match statistics and unmatched pizzas
 */
export const generatePizzaImageReport = (pizzaData) => {
  if (!pizzaData || !Array.isArray(pizzaData) || pizzaData.length === 0) {
    return { 
      total: 0, 
      matched: 0, 
      unmatched: 0, 
      matchRate: '0%',
      unmatchedPizzas: [] 
    };
  }

  const results = {
    total: pizzaData.length,
    matched: 0,
    unmatched: 0,
    unmatchedPizzas: []
  };

  pizzaData.forEach(pizza => {
    const pizzaName = pizza.name;
    const imageSrc = getPizzaImage(pizzaName);
    
    // Check if we got a placeholder image back
    const isPlaceholder = imageSrc === PIZZA_IMAGES.placeholder;
    
    if (isPlaceholder) {
      results.unmatched++;
      results.unmatchedPizzas.push({
        name: pizzaName,
        normalizedName: pizzaName ? pizzaName.toLowerCase().trim() : 'undefined'
      });
    } else {
      results.matched++;
    }
  });
  
  results.matchRate = `${((results.matched / results.total) * 100).toFixed(1)}%`;
  
  return results;
};

/**
 * Get all available pizza image keys
 * @returns {Array} - Array of available pizza image keys
 */
export const getAvailablePizzaImageKeys = () => {
  return Object.keys(PIZZA_IMAGES)
    .filter(key => key !== 'placeholder')
    .sort();
};
