import React from 'react';
import useScrollAnimation from '../../hooks/useScroll';
import aboutVideo from '../../assets/rons-about-vid.mp4'

const AboutSection: React.FC = () => {
  const animatedElements = useScrollAnimation();

  const getAnimationClass = (id: string, baseClass: string = '') => {
    const isAnimated = animatedElements.has(id);
    return `${baseClass} transition-all duration-700 ease-out ${
      isAnimated 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-12'
    }`;
  };

  const features = [
    { title: 'ASE-Certified', description: 'Expert technicians' },
    { title: 'Advanced Tech', description: 'Celette frame system' },
    { title: 'Fast Service', description: 'Quick turnaround' },
    { title: 'Full Support', description: 'Rentals & towing' }
  ];

  return (
    <section
      id="about"
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 bg-gray-50 overflow-hidden w-full"
    >

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 50px,
            rgba(255,255,255,.03) 50px,
            rgba(255,255,255,.03) 100px
          )`
        }} />
      </div>

      {/* Enhanced Gradient Accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-800/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* Content Column */}
          <div className="order-2 lg:order-1">
            {/* Section Label */}
            <div
              data-animate-id="about-label"
              className={getAnimationClass(
                'about-label',
                'inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-blue-600 mb-4 sm:mb-6'
              )}
            >
              <span className="w-8 h-0.5 bg-blue-600"></span>
              About Us
            </div>

            {/* Title */}
            <h2
              data-animate-id="about-title"
              className={getAnimationClass(
                'about-title',
                'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight tracking-tight'
              )}
              style={{ transitionDelay: '100ms' }}
            >
              Expert Collision Repairs
            </h2>

            {/* Description */}
            <div
              data-animate-id="about-description"
              className={getAnimationClass(
                'about-description',
                'text-base sm:text-lg text-gray-600 leading-relaxed mb-8 sm:mb-10 space-y-4 sm:space-y-5'
              )}
              style={{ transitionDelay: '200ms' }}
            >
              <p>
                Ron's Auto delivers top-tier collision repair services with unmatched precision and care.
                Serving Torrance and Southern California, we specialize in dent repair, paint matching,
                frame straightening, and comprehensive restoration.
              </p>
              <p>
                Our ASE-certified technicians use cutting-edge Celette Integrated Bench System technology
                to restore your vehicle to factory condition.
              </p>
            </div>

            {/* Features Grid */}
            <div
              data-animate-id="about-features"
              className={getAnimationClass('about-features', 'grid grid-cols-2 gap-4 sm:gap-5 mb-8 sm:mb-10')}
              style={{ transitionDelay: '300ms' }}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-5 sm:p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div
              data-animate-id="about-cta"
              className={getAnimationClass('about-cta')}
              style={{ transitionDelay: '400ms' }}
            >
              <a
                href="#contact"
                className="group inline-flex items-center px-8 py-4 bg-blue-600 text-white text-base font-semibold rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/50 transition-all duration-300 hover:-translate-y-0.5"
              >
                Get in Touch
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Image Column */}
          <div className="order-1 lg:order-2">
            <div
              data-animate-id="about-image"
              className={getAnimationClass('about-image', 'relative')}
              style={{ transitionDelay: '200ms' }}
            >
              {/* Main Image */}
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto object-cover"
                >
                  <source src={aboutVideo} type="video/mp4" />
                  {/* Fallback image if video doesn't load */}
                  Your browser does not support the video tag.
                </video>

                {/* Enhanced Badge */}
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 bg-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl shadow-2xl backdrop-blur-sm bg-white/95">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-bold text-gray-900">30+</div>
                      <div className="text-xs sm:text-sm font-medium text-gray-600">Years Experience</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutSection;