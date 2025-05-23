import { useEffect, useState } from 'react';
import { PIZZA_IMAGES } from '../constants/images';
import { isLocalEnvironment, debugLog } from '../utils/environmentUtils';

export function usePreloadImages() {
  const [preloadStatus, setPreloadStatus] = useState({
    loaded: 0,
    total: Object.keys(PIZZA_IMAGES).length,
    complete: false
  });

  useEffect(() => {
    // Track image load status
    let loadedCount = 0;
    const totalImages = Object.keys(PIZZA_IMAGES).length;
    
    // Preload all pizza images
    Object.entries(PIZZA_IMAGES).forEach(([key, imageUrl]) => {
      // Skip duplicates by checking if the URL is already in our Set
      const img = new Image();
      
      img.onload = () => {
        loadedCount++;
        setPreloadStatus({
          loaded: loadedCount,
          total: totalImages,
          complete: loadedCount >= totalImages
        });
      };
      
      img.onerror = () => {
        if (isLocalEnvironment()) {
          console.warn(`Failed to preload image: ${key}`);
        }
        loadedCount++;
        setPreloadStatus({
          loaded: loadedCount,
          total: totalImages,
          complete: loadedCount >= totalImages
        });
      };
      
      img.src = imageUrl;
    });
    
    // Log initial status only in local environment
    if (isLocalEnvironment()) {
      debugLog(`Preloading ${totalImages} pizza images...`);
    }
    
    return () => {
      // Cleanup
    };
  }, []);
  
  return preloadStatus;
}
