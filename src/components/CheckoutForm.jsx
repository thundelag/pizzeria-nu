import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const CheckoutForm = ({ isOpen, onClose, onSuccess }) => {
  const { cartItems, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'credit-card'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = cartItems.length > 0 ? 3.99 : 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + deliveryFee + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'ZIP code is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      clearCart();
      onSuccess();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 overflow-hidden z-50" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
        
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Checkout</h2>
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

                <form onSubmit={handleSubmit} className="mt-8">
                  <div className="mb-6">
                    <h3 className="text-base font-medium text-gray-900 mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.name ? 'border-red-500' : ''}`}
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-base font-medium text-gray-900 mb-4">Delivery Address</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Street Address</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.address ? 'border-red-500' : ''}`}
                        />
                        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                      </div>
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.city ? 'border-red-500' : ''}`}
                        />
                        {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                      </div>
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">ZIP Code</label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.zipCode ? 'border-red-500' : ''}`}
                        />
                        {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-base font-medium text-gray-900 mb-4">Payment Method</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          id="credit-card"
                          name="paymentMethod"
                          type="radio"
                          value="credit-card"
                          checked={formData.paymentMethod === 'credit-card'}
                          onChange={handleChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
                          Credit Card
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="cash"
                          name="paymentMethod"
                          type="radio"
                          value="cash"
                          checked={formData.paymentMethod === 'cash'}
                          onChange={handleChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <label htmlFor="cash" className="ml-3 block text-sm font-medium text-gray-700">
                          Cash on Delivery
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <p>Delivery Fee</p>
                      <p>${deliveryFee.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <p>Tax (10%)</p>
                      <p>${tax.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900 mt-4 pt-4 border-t border-gray-200">
                      <p>Total</p>
                      <p>${total.toFixed(2)}</p>
                    </div>
                    
                    <div className="mt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting || cartItems.length === 0}
                        className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                          isSubmitting 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : cartItems.length === 0 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : 'bg-red-600 hover:bg-red-700'
                        }`}
                      >
                        {isSubmitting ? 'Processing...' : 'Place Order'}
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
