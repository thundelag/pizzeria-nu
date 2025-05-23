import React, { useState, useEffect } from 'react';
import { getPizzaImage } from '../constants/images';
import { usePreloadImages } from '../hooks/usePreloadImages';
import { getPizzas } from '../services/pizzaService';
import { useCart } from '../context/CartContext';
import PizzaPlaceholder from './PizzaPlaceholder';
import ImageDebugOverlay from './ImageDebugOverlay';
import { generatePizzaImageReport, getAvailablePizzaImageKeys } from '../utils/imageUtils';
import { isLocalEnvironment, debugLog } from '../utils/environmentUtils';
import { isDebugFeatureEnabled } from '../config/debugConfig';

const MenuItem = ({ pizza, onAddToCart }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imageSrc = getPizzaImage(pizza.name);
  
  // Log image resolution attempts at component level in local environment only
  useEffect(() => {
    if (!pizza.name || !isDebugFeatureEnabled('imageDebug.logImageMatches')) return;
    
    const normalizedName = pizza.name.toLowerCase().trim();
    // Silent logging - only for debugging specific issues
    if (imageSrc && imageSrc.includes('pizza-placeholder')) {
      debugLog(`MenuItem: No match found for "${pizza.name}" (normalized: "${normalizedName}")`);
    } else {
      debugLog(`MenuItem: Successfully mapped "${pizza.name}" to image`);
    }
  }, [pizza.name, imageSrc]);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 bg-gray-200">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse bg-gray-300 w-full h-full"></div>
          </div>
        )}
        <img
          src={imageSrc}
          alt={pizza.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">Image unavailable</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{pizza.name}</h3>
        <p className="text-gray-700 text-sm mb-4">{pizza.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-bold">${pizza.price.toFixed(2)}</span>
          <button 
            onClick={() => onAddToCart(pizza)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Menu() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');

  // Preload all images
  usePreloadImages();  useEffect(() => {
    const loadPizzas = async () => {
      const data = await getPizzas();
      setPizzas(data);
      setLoading(false);
      
      // Only log debug information in local environment
      if (isLocalEnvironment()) {
        // Generate and log image mapping report
        const report = generatePizzaImageReport(data);
        debugLog('Pizza Image Report:', report);
        
        // Log available image keys for reference
        debugLog('Available image keys:', getAvailablePizzaImageKeys());
        
        // Alert if we have unmapped pizzas
        if (report.unmatched > 0) {
          console.warn(`⚠️ ${report.unmatched} pizzas are missing proper image mappings:`, 
            report.unmatchedPizzas.map(p => p.name));
        }
      }
    };
    loadPizzas();
  }, []);

  // Log all pizza names when component mounts to help with debugging
  useEffect(() => {
    console.log('All pizza names:', pizzas.map(p => p.name));
  }, [pizzas]);

  const filteredPizzas = activeCategory === 'all'
    ? pizzas
    : pizzas.filter(pizza => pizza.category === activeCategory);

  const categories = ['all', 'classic', 'specialty', 'vegetarian'];

  if (loading) {
    return (
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <PizzaPlaceholder key={n} />
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Menu</h2>
        
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full capitalize transition-colors ${
                activeCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPizzas.map((pizza) => (
            <MenuItem
              key={pizza.id}
              pizza={pizza}
              onAddToCart={addToCart}
            />
          ))}        </div>      </div>
      
      {/* Image debugging overlay - only visible in local development */}
      {isDebugFeatureEnabled('imageDebug.enabled') && <ImageDebugOverlay pizzas={pizzas} />}
    </section>
  );}