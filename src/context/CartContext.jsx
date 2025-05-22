import React, { createContext, useContext, useState } from 'react';

// Create context for cart functionality
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState({ message: '', isVisible: false });
  
  const showNotification = (message) => {
    setNotification({ message, isVisible: true });
  };

  const hideNotification = () => {
    setNotification({ ...notification, isVisible: false });
  };
  
  const addToCart = (item) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        // Increase quantity if item already exists
        showNotification(`Added another ${item.name} to your cart`);
        return prevItems.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      } else {
        // Add new item with quantity 1
        showNotification(`${item.name} added to your cart`);
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };
  
  const removeFromCart = (id) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    if (itemToRemove) {
      showNotification(`${itemToRemove.name} removed from your cart`);
    }
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCartItems([]);
    showNotification('Your cart has been cleared');
  };

  // Calculate cart total items
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      cartItemCount,
      notification,
      hideNotification
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
