import React from 'react';
import useScrollAnimation from '../../hooks/useScroll';

const HeroSection: React.FC = () => {
  const animatedElements = useScrollAnimation();

  const getAnimationClass = (id: string, baseClass: string = '') => {
    const isAnimated = animatedElements.has(id);
    return `${baseClass} transition-all duration-500 ease-out ${
      isAnimated 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-8'
    }`;
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[80vh] flex items-center justify-center bg-gray-900 overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `
            linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)),
            url('https://cdn.b12.io/client_media/OIudL3H6/948e926c-71ac-11f0-be53-0242ac110002-jpg-hero_image.jpeg')
          `
        }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Hero Title */}
          <h1 
            data-animate-id="hero-title"
            className={getAnimationClass(
              'hero-title',
              'font-poppins font-semibold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight'
            )}
          >
            Expert collision repair
          </h1>
          
          {/* Hero Subtitle */}
          <div 
            data-animate-id="hero-subtitle"
            className={getAnimationClass(
              'hero-subtitle',
              'font-poppins font-normal text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed'
            )}
            style={{ animationDelay: '50ms' }}
          >
            Trust our <span className="text-blue-400 font-semibold">precision</span> and care for your car
          </div>
          
          {/* CTA Button */}
          <div 
            data-animate-id="hero-cta"
            className={getAnimationClass('hero-cta')}
            style={{ animationDelay: '150ms' }}
          >
            <a
              href="#services"
              className="inline-block font-poppins font-semibold px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;