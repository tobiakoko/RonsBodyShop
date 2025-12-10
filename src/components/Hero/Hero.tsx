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

        {/* Enhanced Dark Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/60 to-black/70"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 py-20 sm:py-24 md:py-32 lg:py-40">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            {/* Label */}
            <div
              data-animate-id="hero-label"
              className={getAnimationClass(
                'hero-label',
                'inline-flex items-center gap-2 text-sm font-semibold text-blue-400 mb-6 sm:mb-8'
              )}
            >
              <span className="w-8 h-0.5 bg-blue-400"></span>
              Ron's Auto — Since 1995
            </div>

            {/* Hero Title */}
            <h1
              data-animate-id="hero-title"
              className={getAnimationClass(
                'hero-title',
                'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 md:mb-8 leading-[1.1] tracking-tight'
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
                'text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-relaxed max-w-3xl'
              )}
              style={{ transitionDelay: '200ms' }}
            >
              Precision craftsmanship meets decades of experience. We restore your vehicle to factory condition with care and attention to detail.
            </p>
            
            {/* CTA Buttons */}
            <div
              data-animate-id="hero-cta"
              className={getAnimationClass('hero-cta', 'flex flex-col sm:flex-row gap-3 sm:gap-4')}
              style={{ transitionDelay: '300ms' }}
            >
              <a
                href="#services"
                className="group inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/50 transition-all duration-300 hover:-translate-y-0.5"
              >
                View Our Services
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-white/10 backdrop-blur-md text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-white/20 border-2 border-white/30 hover:border-white/60 transition-all duration-300"
              >
                Get Free Estimate
              </a>
            </div>

            {/* Trust Indicators */}
            <div
              data-animate-id="hero-badges"
              className={getAnimationClass(
                'hero-badges',
                'flex flex-wrap gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12 md:mt-16 pt-6 sm:pt-8 md:pt-10 border-t border-white/20'
              )}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="flex items-center gap-2 sm:gap-3 text-white">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="font-semibold text-sm sm:text-base">30+ Years Experience</span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 text-white">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-semibold text-sm sm:text-base">Certified Technicians</span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 text-white">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-semibold text-sm sm:text-base">Lifetime Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;