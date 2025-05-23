import { useState, useEffect } from 'react';
import pizzaPlaceholderImg from '../assets/img/pizza-placeholder.jpg';
import { isValidImageUrl, getImageUrl } from '../utils/imageUtils';
import { isLocalEnvironment, debugLog } from '../utils/environmentUtils';

/**
 * Custom hook for handling image loading with fallback
 * 
 * @param {string|import('*.jpg')|import('*.png')} src - Primary image source (string URL or Vite import)
 * @param {string|import('*.jpg')|import('*.png')} fallbackSrc - Fallback image source if primary fails
 * @returns {Object} - Object containing src and onError handler
 */
const useImageWithFallback = (src, fallbackSrc = pizzaPlaceholderImg) => {
  // Get proper URL strings from our sources
  const sourceUrl = getImageUrl(src);
  const fallbackUrl = getImageUrl(fallbackSrc);
  
  // Initialize with src or fallback
  const [imgSrc, setImgSrc] = useState(sourceUrl || fallbackUrl);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!sourceUrl) {
      setImgSrc(fallbackUrl);
      setLoading(false);
      return;
    }

    // Reset states when src changes
    setLoading(true);
    setError(false);
    
    // Skip validation for certain image types that we know are valid
    if (typeof sourceUrl === 'string' && (
        sourceUrl.startsWith('data:') || 
        sourceUrl.startsWith('blob:') || 
        sourceUrl.includes('/assets/') || 
        sourceUrl.includes('_import')
      )) {
      setImgSrc(sourceUrl);
      setLoading(false);
      return;
    }
    
    // Validate the image URL
    isValidImageUrl(sourceUrl)
      .then(isValid => {
        setImgSrc(isValid ? sourceUrl : fallbackUrl);
        setLoading(false);
        if (!isValid) setError(true);
      })
      .catch(() => {
        setImgSrc(fallbackUrl);
        setLoading(false);
        setError(true);
      });
  }, [sourceUrl, fallbackUrl]);

  const onError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setError(true);
    }
  };

  return { 
    src: imgSrc, 
    onError, 
    loading, 
    error 
  };
};

export default useImageWithFallback;
