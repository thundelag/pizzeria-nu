import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const MenuItem = ({ pizza, onAddToCart }) => {
  const getCategoryColor = (category) => {
    switch(category) {
      case 'classic': return 'bg-blue-100 text-blue-600';
      case 'specialty': return 'bg-purple-100 text-purple-600';
      case 'vegetarian': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative">
        <img className="h-48 w-full object-cover" src={pizza.image} alt={pizza.name} />
        <span className={`absolute top-2 left-2 py-1 px-2 rounded-full text-xs font-semibold ${getCategoryColor(pizza.category)}`}>
          {pizza.category.charAt(0).toUpperCase() + pizza.category.slice(1)}
        </span>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">{pizza.name}</h3>
          <span className="bg-red-100 text-red-600 py-1 px-2 rounded-full text-xs font-semibold">
            ${pizza.price.toFixed(2)}
          </span>
        </div>
        <p className="mt-2 text-gray-600 text-sm">{pizza.description}</p>
        <button 
          onClick={() => onAddToCart(pizza)}
          className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const Menu = () => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Pizzas' },
    { id: 'classic', name: 'Classic' },
    { id: 'specialty', name: 'Specialty' },
    { id: 'vegetarian', name: 'Vegetarian' }
  ];

  const pizzas = [
    {
      id: 1,
      name: 'Margherita',
      description: 'Classic tomato sauce, fresh mozzarella, basil, and extra virgin olive oil',
      price: 12.99,
      category: 'classic',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80'
    },
    {
      id: 2,
      name: 'Pepperoni',
      description: 'Tomato sauce, mozzarella, and spicy pepperoni',
      price: 14.99,
      category: 'classic',
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80'
    },    {
      id: 3,
      name: 'Vegetarian',
      description: 'Tomato sauce, mozzarella, bell peppers, mushrooms, onions, and olives',
      price: 13.99,
      category: 'vegetarian',
      image: 'https://images.unsplash.com/photo-1511689841353-d5e22ec7c6e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80'
    },
    {
      id: 4,
      name: 'BBQ Chicken',
      description: 'BBQ sauce, mozzarella, grilled chicken, red onions, and cilantro',
      price: 15.99,
      category: 'specialty',
      image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1028&q=80'
    },
    {
      id: 5,
      name: 'Supreme',
      description: 'Tomato sauce, mozzarella, pepperoni, sausage, bell peppers, onions, and mushrooms',
      price: 16.99,
      category: 'specialty',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 6,
      name: 'Mushroom Truffle',
      description: 'Creamy garlic sauce, mozzarella, wild mushrooms, and truffle oil',
      price: 17.99,
      category: 'vegetarian',
      image: 'https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80'
    },    {
      id: 7,
      name: 'Hawaiian',
      description: 'Tomato sauce, mozzarella, ham, and pineapple',
      price: 15.99,
      category: 'classic',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 8,
      name: 'Buffalo Chicken',
      description: 'Spicy buffalo sauce, mozzarella, grilled chicken, and blue cheese dressing',
      price: 16.99,
      category: 'specialty',
      image: 'https://images.unsplash.com/photo-1571066811602-716837d681de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 9,
      name: 'Pesto Veggie',
      description: 'Pesto sauce, mozzarella, sun-dried tomatoes, artichokes, and olives',
      price: 14.99,
      category: 'vegetarian',
      image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80'
    }
  ];
  const handleAddToCart = (pizza) => {
    addToCart(pizza);
    // Show a notification or feedback here if desired
  };

  const filteredPizzas = activeCategory === 'all' 
    ? pizzas 
    : pizzas.filter(pizza => pizza.category === activeCategory);

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Our Menu</h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-500">
            Choose from our selection of handcrafted pizzas, made with the freshest ingredients.
          </p>
        </div>
        
        <div className="mt-8 flex justify-center">
          <div className="inline-flex flex-wrap gap-2 justify-center p-1 bg-gray-100 rounded-lg">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-red-600 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPizzas.map((pizza) => (
            <MenuItem key={pizza.id} pizza={pizza} onAddToCart={handleAddToCart} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="#menu" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
          >
            View Full Menu
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Menu;
