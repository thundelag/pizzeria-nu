// Pizza Images - Optimized and properly imported
import margherita from '../assets/img/margherita.jpg';
import pepperoni from '../assets/img/pepperoni.jpg';
import vegetarian from '../assets/img/vegetarian.jpg';
import bbqChicken from '../assets/img/bbq-chicken.jpg';
import supreme from '../assets/img/supreme.jpg';
import mushroomTruffle from '../assets/img/mushroom-truffle.jpg';
import hawaiian from '../assets/img/hawaiian.jpg';
import buffaloChicken from '../assets/img/buffalo-chicken.jpg';
import pestoVeggie from '../assets/img/pesto-veggie.jpg';
import pizzaPlaceholder from '../assets/img/pizza-placeholder.jpg';
import { isLocalEnvironment, debugLog } from '../utils/environmentUtils';

// Create a comprehensive map of all possible pizza name variations to their image imports
export const PIZZA_IMAGES = {
  // Direct mappings
  'margherita': margherita,
  'pepperoni': pepperoni,
  'vegetarian': vegetarian,
  'veggie': vegetarian,
  'supreme': supreme,
  'hawaiian': hawaiian,
  
  // Variations with spaces
  'bbq chicken': bbqChicken,
  'buffalo chicken': buffaloChicken,
  'mushroom truffle': mushroomTruffle,
  'pesto veggie': pestoVeggie,
  
  // Variations with hyphens
  'bbq-chicken': bbqChicken,
  'buffalo-chicken': buffaloChicken,
  'mushroom-truffle': mushroomTruffle,
  'pesto-veggie': pestoVeggie,
  
  // Special cases (common variations)
  'classic margherita': margherita,
  'classic pepperoni': pepperoni,
  'veggie supreme': vegetarian,
  'vegetable': vegetarian,
  'classic vegetarian': vegetarian,
  'bbq': bbqChicken,
  'buffalo': buffaloChicken,
  'mushroom': mushroomTruffle,
  'truffle': mushroomTruffle,
  'pesto': pestoVeggie,
  'ham and pineapple': hawaiian,
  'ham & pineapple': hawaiian,
  'pineapple': hawaiian,
  
  // Placeholder
  'placeholder': pizzaPlaceholder
};

/**
 * Get the image for a pizza by name with robust fallback mechanisms
 * @param {string} name - The name of the pizza
 * @returns {string} - The image path
 */
export const getPizzaImage = (name) => {
  if (!name) {
    isLocalEnvironment() && debugLog('No pizza name provided, using placeholder');
    return pizzaPlaceholder;
  }
  
  // Step 1: Normalize the name (remove spaces, lowercase)
  const normalizedName = name.toLowerCase().trim();
  
  // Step 2: Try direct lookup with normalized name
  if (PIZZA_IMAGES[normalizedName]) {
    return PIZZA_IMAGES[normalizedName];
  }
  
  // Step 3: Try with hyphenated version
  const hyphenatedName = normalizedName.replace(/\s+/g, '-');
  if (PIZZA_IMAGES[hyphenatedName]) {
    return PIZZA_IMAGES[hyphenatedName];
  }
  
  // Step 4: Try with spaces instead of hyphens
  const spacedName = normalizedName.replace(/-/g, ' ');
  if (PIZZA_IMAGES[spacedName]) {
    return PIZZA_IMAGES[spacedName];
  }
  
  // Step 5: Check for partial matches (most specific first)
  const partialMatches = [];
  
  for (const [key, image] of Object.entries(PIZZA_IMAGES)) {
    // Skip placeholder
    if (key === 'placeholder') continue;
    
    // Calculate a match score - higher means better match
    let score = 0;
    
    // Exact substring match
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      // How much of the string matches?
      score += (key.length / normalizedName.length) * 10;
      
      partialMatches.push({ key, image, score });
    }
  }
  
  // Sort matches by score (highest first)
  partialMatches.sort((a, b) => b.score - a.score);
  
  // Return the best match if we have one
  if (partialMatches.length > 0) {
    return partialMatches[0].image;
  }
    // Step 6: Match by first word as last resort
  const firstWord = normalizedName.split(/\s+/)[0];
  for (const [key, image] of Object.entries(PIZZA_IMAGES)) {
    if (key.includes(firstWord) || firstWord.includes(key)) {
      return image;
    }
  }
  
  // If we get here, we couldn't find a match
  isLocalEnvironment() && debugLog(`No image match found for: "${normalizedName}", using placeholder`);
  return pizzaPlaceholder;
};
