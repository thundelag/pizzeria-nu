import React, { useState } from 'react';
import useImageWithFallback from '../hooks/useImageWithFallback';
import pizzaPlaceholderImg from '../assets/img/pizza-placeholder.jpg';
import { getImageUrl } from '../utils/imageUtils';

/**
 * Reusable image component with built-in fallback handling
 * 
 * @param {Object} props - Component props
 * @param {string|import('*.jpg')|import('*.png')} props.src - Image source URL or import
 * @param {string} props.alt - Alternative text for the image
 * @param {string|import('*.jpg')|import('*.png')} props.fallbackSrc - Fallback image source if primary fails
 * @param {string} props.className - CSS classes to apply to the image
 * @param {Object} props.imageProps - Additional props to pass to the img element
 * @param {React.ReactNode} props.loadingComponent - Custom loading component
 * @param {React.ReactNode} props.errorComponent - Custom error component
 */
const Image = ({
  src,
  alt = '',
  fallbackSrc = pizzaPlaceholderImg,
  className = '',
  imageProps = {},
  loadingComponent = null,
  errorComponent = null,
  ...rest
}) => {
  const [isLoadingFailed, setIsLoadingFailed] = useState(false);
  const { src: imageSrc, onError, loading, error } = useImageWithFallback(src, fallbackSrc);

  const handleError = (e) => {
    setIsLoadingFailed(true);
    if (onError) onError(e);
  };

  if (loading && loadingComponent) {
    return loadingComponent;
  }

  if ((error || isLoadingFailed) && errorComponent) {
    return errorComponent;
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...imageProps}
      {...rest}
    />
  );
};

export default Image;
