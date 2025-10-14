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
      className="relative py-20 lg:py-32 bg-gray-50 overflow-hidden w-full"
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

      {/* Gradient Accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-800/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Column */}
          <div className="order-2 lg:order-1">
            {/* Section Label */}
            <div 
              data-animate-id="about-label"
              className={getAnimationClass(
                'about-label',
                'inline-block text-sm font-semibold text-blue-600 mb-4'
              )}
            >
              About Us
            </div>

            {/* Title */}
            <h2 
              data-animate-id="about-title"
              className={getAnimationClass(
                'about-title',
                'text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight'
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
                'text-lg text-gray-600 leading-relaxed mb-8 space-y-4'
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
              className={getAnimationClass('about-features', 'grid grid-cols-2 gap-4 mb-8')}
              style={{ transitionDelay: '300ms' }}
            >
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
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
                className="inline-block px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Get in Touch
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
              <div className="relative rounded-2xl overflow-hidden">
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
                
                {/* Badge */}
                <div className="absolute bottom-6 left-6 bg-white px-5 py-3 rounded-lg shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-blue-600">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">30+</div>
                      <div className="text-sm text-gray-600">Years Experience</div>
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