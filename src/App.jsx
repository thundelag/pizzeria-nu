import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import About from './components/About';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Notification from './components/Notification';
import { AuthProvider, useAuth } from './context/AuthContext';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" />;
}

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Notification />
      <Header />
      <main>
        <div id="hero" className="section">
          <Hero />
        </div>
        <div id="menu" className="section">
          <Menu />
        </div>
        <div id="about" className="section">
          <About />
        </div>
        <div id="testimonials" className="section">
          <Testimonials />
        </div>
        <div id="contact" className="section">
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
