/**
 * Utility functions to help normalize pizza names to match our image filenames
 */

/**
 * Normalize a pizza name to better match our available images
 * @param {string} pizzaName - The original pizza name
 * @returns {string} - The normalized pizza name
 */
export const normalizePizzaName = (pizzaName) => {
  if (!pizzaName) return '';
  
  // Convert to lowercase and trim whitespace
  let normalized = pizzaName.toLowerCase().trim();
  
  // Replace common variations
  const replacements = {
    // Basic replacements
    'classic': '',
    'original': '',
    'traditional': '',
    'special': '',
    'deluxe': '',
    'signature': '',
    'homemade': '',
    'house': '',
    'ultimate': '',
    'fresh': '',
    
    // Specific pizza variations
    'chicken bbq': 'bbq chicken',
    'bbq chick': 'bbq chicken',
    'buffalo chick': 'buffalo chicken',
    'truffled mushroom': 'mushroom truffle',
    'mushroom with truffle': 'mushroom truffle',
    'truffle & mushroom': 'mushroom truffle',
    'veggie pesto': 'pesto veggie',
    'tropical': 'hawaiian',
    'pineapple supreme': 'hawaiian',
    'veggie supreme': 'vegetarian',
    'garden veggie': 'vegetarian',
    'vegan': 'vegetarian'
  };
  
  // Apply replacements
  Object.entries(replacements).forEach(([find, replace]) => {
    if (normalized.includes(find)) {
      // If it's an empty replacement, remove the word and surrounding spaces
      if (replace === '') {
        normalized = normalized.replace(new RegExp(`\\b${find}\\b\\s*`, 'g'), '');
      } else {
        normalized = normalized.replace(new RegExp(`\\b${find}\\b`, 'g'), replace);
      }
    }
  });
  
  // Remove extra whitespace and trim again
  normalized = normalized.replace(/\s+/g, ' ').trim();
  
  return normalized;
};

/**
 * Get a list of pizza name variations to try for image matching
 * @param {string} pizzaName - The original pizza name
 * @returns {string[]} - Array of variations to try
 */
export const getPizzaNameVariations = (pizzaName) => {
  if (!pizzaName) return [];
  
  const normalized = normalizePizzaName(pizzaName);
  const variations = [
    normalized,
    normalized.replace(/\s+/g, '-'),  // hyphenated
    normalized.replace(/-/g, ' ')      // spaces instead of hyphens
  ];
  
  // Add first word only
  const firstWord = normalized.split(/\s+/)[0];
  if (firstWord && !variations.includes(firstWord)) {
    variations.push(firstWord);
  }
  
  // Add without "pizza" suffix if it has one
  if (normalized.endsWith(' pizza')) {
    variations.push(normalized.replace(/ pizza$/, ''));
  }
  
  return [...new Set(variations)]; // Remove duplicates
};
