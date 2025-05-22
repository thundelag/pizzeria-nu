import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Menu from './components/Menu'
import About from './components/About'
import Testimonials from './components/Testimonials'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import Notification from './components/Notification'
import { useCart } from './context/CartContext'

function App() {
  const { notification, hideNotification } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section id="hero">
        <Hero />
      </section>
      <section id="menu">
        <Menu />
      </section>
      <section id="about">
        <About />
      </section>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-red-600 font-semibold tracking-wide uppercase">Our Promise</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              The Best Pizza in Town
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We use only the finest ingredients, traditional recipes, and craft each pizza with care.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Fresh Ingredients</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  We source our ingredients from local farmers and suppliers, ensuring the freshest quality in every bite.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Fast Delivery</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Hot and fresh pizza delivered to your door in 30 minutes or less, guaranteed.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="contact">
        <ContactForm />
      </section>
      <Footer />
      <Notification 
        message={notification.message} 
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </div>
  )
}

export default App
