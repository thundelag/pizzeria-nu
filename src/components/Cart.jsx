import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CheckoutForm from './CheckoutForm';

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, showNotification } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = cartItems.length > 0 ? 3.99 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckoutSuccess = () => {
    setIsCheckoutOpen(false);
    onClose();
    showNotification('Your order has been placed successfully! We\'ll deliver it soon.');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 overflow-hidden z-50" role="dialog" aria-modal="true">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
          
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <div className="w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
                    <div className="ml-3 h-7 flex items-center">
                      <button 
                        type="button" 
                        className="-m-2 p-2 text-gray-400 hover:text-gray-500" 
                        onClick={onClose}
                      >
                        <span className="sr-only">Close panel</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul className="-my-6 divide-y divide-gray-200">
                        {cartItems.length > 0 ? (
                          cartItems.map((item) => (
                            <li key={item.id} className="py-6 flex">
                              <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                {item.image ? (
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full bg-red-100 flex items-center justify-center text-red-600">
                                    <svg className="h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                  </div>
                                )}
                              </div>

                              <div className="ml-4 flex-1 flex flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{item.name}</h3>
                                    <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">{item.description ? item.description.substring(0, 30) + '...' : 'Classic'}</p>
                                </div>
                                <div className="flex-1 flex items-end justify-between text-sm">
                                  <div className="flex items-center">
                                    <button 
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      className="text-gray-500 focus:outline-none focus:text-gray-600 p-1"
                                    >
                                      <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                      </svg>
                                    </button>
                                    <span className="text-gray-700 mx-2">{item.quantity}</span>
                                    <button 
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      className="text-gray-500 focus:outline-none focus:text-gray-600 p-1"
                                    >
                                      <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                      </svg>
                                    </button>
                                  </div>

                                  <div className="flex">
                                    <button 
                                      type="button"
                                      onClick={() => removeFromCart(item.id)}
                                      className="font-medium text-red-600 hover:text-red-500"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))
                        ) : (
                          <li className="py-6">
                            <p className="text-center text-gray-500">Your cart is empty</p>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <p>Delivery Fee</p>
                    <p>${deliveryFee.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900 mt-4 pt-4 border-t border-gray-200">
                    <p>Total</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Taxes calculated at checkout</p>
                  <div className="mt-6">
                    <button
                      onClick={() => setIsCheckoutOpen(true)}
                      disabled={cartItems.length === 0}
                      className={`flex justify-center items-center w-full px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${cartItems.length > 0 ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                      Checkout
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                    <p>
                      or{' '}
                      <button
                        type="button"
                        className="text-red-600 font-medium hover:text-red-500"
                        onClick={onClose}
                      >
                        Continue Shopping<span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CheckoutForm 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        onSuccess={handleCheckoutSuccess}
      />
    </>
  );
};

export default Cart;
