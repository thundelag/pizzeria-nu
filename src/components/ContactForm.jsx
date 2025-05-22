import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    orderType: 'delivery'
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.phone && !/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real application, you would send this data to a server
      console.log('Form submitted:', formData);
      setFormSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          orderType: 'delivery'
        });
      }, 3000);
    }
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-500">
            Have questions or special requests? Contact us directly or fill out the form below.
          </p>
        </div>
        
        <div className="mt-12 max-w-lg mx-auto grid gap-8 lg:grid-cols-2 lg:max-w-none">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <h3 className="text-xl font-medium text-gray-900">Contact Information</h3>
              <p className="mt-4 text-base text-gray-500">
                We're here to help with any questions about our pizzas, special events, or catering services.
              </p>
              
              <div className="mt-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-3 text-base text-gray-500">
                    <p>123 Pizza Street</p>
                    <p className="mt-1">New York, NY 10001</p>
                  </div>
                </div>
                
                <div className="mt-6 flex">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-3 text-base text-gray-500">
                    <p>(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="mt-6 flex">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3 text-base text-gray-500">
                    <p>info@pizzerianu.com</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-lg font-medium text-gray-900">Hours</h4>
                  <ul className="mt-4 space-y-2">
                    <li className="text-base text-gray-500">Monday - Thursday: 11am - 10pm</li>
                    <li className="text-base text-gray-500">Friday - Saturday: 11am - 11pm</li>
                    <li className="text-base text-gray-500">Sunday: 12pm - 9pm</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <h3 className="text-xl font-medium text-gray-900">Send us a message</h3>
              
              {formSubmitted ? (
                <div className="mt-6 bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded relative flex items-center">
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-medium">Thank you for your message!</p>
                    <p className="text-sm">We'll get back to you as soon as possible.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      id="name" 
                      value={formData.name}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md ${errors.name ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md ${errors.email ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      id="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md ${errors.phone ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm`}
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="orderType" className="block text-sm font-medium text-gray-700">I'm interested in</label>
                    <select 
                      id="orderType" 
                      name="orderType" 
                      value={formData.orderType}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    >
                      <option value="delivery">Delivery</option>
                      <option value="pickup">Pickup</option>
                      <option value="catering">Catering</option>
                      <option value="feedback">Providing Feedback</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md ${errors.message ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm`}
                    ></textarea>
                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                  </div>
                  
                  <div>
                    <button 
                      type="submit" 
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
