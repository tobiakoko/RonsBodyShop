import { useEffect, useState } from 'react';
import './App.css';
import ContactSection from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import NavigationLink from './components/Header/Navigation';
import HeroSection from './components/Hero/Hero';
import ServicesSection from './components/Services/Services';
import About from './components/About/About';
import type { FormData } from './components/Contact/ContactForm';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle initial page load
  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle contact form submission
  const handleContactSubmit = async (formData: FormData) => {
    try {
      console.log('Contact form submitted:', formData);
      
      // Simulate API call - Replace with your actual backend endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In production:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // if (!response.ok) throw new Error('Failed to submit form');
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw new Error('Failed to submit form. Please try again.');
    }
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          {/* Simple Spinner */}
          <div className="w-12 h-12 mx-auto mb-4 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          
          {/* Optional: Loading Text */}
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Skip to main content - Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <NavigationLink />
      
      {/* Main Content */}
      <main id="main-content">
        <HeroSection />
        <About />
        <ServicesSection />
        <ContactSection onSubmit={handleContactSubmit} />
        <Footer />
      </main>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-40 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center ${
          showScrollTop 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-16 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 10l7-7m0 0l7 7m-7-7v18" 
          />
        </svg>
      </button>
    </div>
  );
}

export default App;
