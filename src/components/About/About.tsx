import React from 'react';
import useScrollAnimation from '../../hooks/useScroll';

// About Section Component
const AboutSection: React.FC = () => {
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
      id="about" 
      className="py-16 lg:py-24 bg-gray-900 text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Content Column */}
          <div className="order-2 lg:order-1">
            {/* Title */}
            <h2 
              data-animate-id="about-title"
              className={getAnimationClass(
                'about-title',
                'font-poppins font-semibold text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight'
              )}
            >
              Expert collision repairs
            </h2>
            
            {/* Subtitle */}
            <div 
              data-animate-id="about-subtitle"
              className={getAnimationClass(
                'about-subtitle',
                'font-poppins font-medium text-xl md:text-2xl text-blue-400 mb-6'
              )}
              style={{ animationDelay: '50ms' }}
            >
              Trusted quality and precision
            </div>
            
            {/* Paragraph */}
            <div 
              data-animate-id="about-paragraph"
              className={getAnimationClass(
                'about-paragraph',
                'font-poppins font-normal text-lg text-gray-300 leading-relaxed mb-8'
              )}
              style={{ animationDelay: '100ms' }}
            >
              <p>
                Ron's Body Shop delivers top-tier collision repair services with unmatched precision and care. 
                Serving Torrance and Southern California, we specialize in dent repair, paint matching, frame 
                straightening, and more. Our ASE-certified technicians use cutting-edge Celette Integrated 
                Bench System technology to restore your vehicle to its prime condition. Count on us for 
                efficient, reliable service including car rentals and towing assistance.
              </p>
            </div>
            
            {/* CTA Button */}
            <div 
              data-animate-id="about-cta"
              className={getAnimationClass('about-cta')}
              style={{ animationDelay: '200ms' }}
            >
              <a
                href="#contact"
                className="inline-block font-poppins font-semibold px-8 py-4 border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg transform hover:scale-105 transition-all duration-200"
              >
                Get in touch
              </a>
            </div>
          </div>
          
          {/* Image Column */}
          <div className="order-1 lg:order-2">
            <div 
              data-animate-id="about-image"
              className={getAnimationClass(
                'about-image',
                'relative rounded-2xl overflow-hidden shadow-2xl'
              )}
            >
              <img
                src="https://cdn.b12.io/client_media/OIudL3H6/95df8b08-71ac-11f0-be53-0242ac110002-jpg-hero_image.jpeg"
                alt="A close up shot of a skilled auto technician carefully working on collision repair"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              
              {/* Optional overlay for better text contrast if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutSection;