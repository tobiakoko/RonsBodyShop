import React from 'react';
import useScrollAnimation from '../../hooks/useScroll';
import heroVideo from '../../assets/rons-hero-vid.mp4'

const HeroSection: React.FC = () => {
  const animatedElements = useScrollAnimation();

  const getAnimationClass = (id: string, baseClass: string = '') => {
    const isAnimated = animatedElements.has(id);
    return `${baseClass} transition-all duration-700 ease-out ${
      isAnimated 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-12'
    }`;
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden w-full"
    >
      {/* Background Video with Overlay */}
      <div className="absolute inset-0">
        {/* Video Element */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
          {/* Fallback image if video doesn't load */}
          Your browser does not support the video tag.
        </video>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full px-6 lg:px-8 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            {/* Label */}
            <div 
              data-animate-id="hero-label"
              className={getAnimationClass(
                'hero-label',
                'inline-block text-sm font-semibold text-blue-400 mb-6'
              )}
            >
              Ron's Auto — Since 1995
            </div>

            {/* Hero Title */}
            <h1 
              data-animate-id="hero-title"
              className={getAnimationClass(
                'hero-title',
                'text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight'
              )}
              style={{ transitionDelay: '100ms' }}
            >
              Expert Collision Repair You Can Trust
            </h1>
            
            {/* Hero Subtitle */}
            <p 
              data-animate-id="hero-subtitle"
              className={getAnimationClass(
                'hero-subtitle',
                'text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl'
              )}
              style={{ transitionDelay: '200ms' }}
            >
              Precision craftsmanship meets decades of experience. We restore your vehicle to factory condition with care and attention to detail.
            </p>
            
            {/* CTA Buttons */}
            <div 
              data-animate-id="hero-cta"
              className={getAnimationClass('hero-cta', 'flex flex-col sm:flex-row gap-4')}
              style={{ transitionDelay: '300ms' }}
            >
              <a
                href="#services"
                className="inline-block px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors text-center"
              >
                View Our Services
              </a>
              
              <a
                href="#contact"
                className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-md hover:bg-white/20 border border-white/30 hover:border-white/50 transition-all text-center"
              >
                Get Free Estimate
              </a>
            </div>

            {/* Trust Indicators */}
            <div 
              data-animate-id="hero-badges"
              className={getAnimationClass(
                'hero-badges',
                'flex flex-wrap gap-6 mt-12 pt-8 border-t border-white/20'
              )}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="flex items-center gap-2 text-white text-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">30+ Years Experience</span>
              </div>
              
              <div className="flex items-center gap-2 text-white text-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Certified Technicians</span>
              </div>
              
              <div className="flex items-center gap-2 text-white text-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Lifetime Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;