import React from 'react';
import useScrollAnimation from '../../hooks/useScroll';
import ServiceCard, {type Service } from './Service';

const ServicesSection: React.FC = () => {
  const animatedElements = useScrollAnimation();

  const getAnimationClass = (id: string, baseClass: string = '') => {
    const isAnimated = animatedElements.has(id);
    return `${baseClass} transition-all duration-500 ease-out ${
      isAnimated 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-8'
    }`;
  };

  // Services data
  const services: Service[] = [
    {
      id: '1',
      title: 'Collision repair',
      description: 'Restore your vehicle to pre-accident condition with expert collision repair.',
      image: 'https://cdn.b12.io/client_media/OIudL3H6/97a22d2e-71ac-11f0-be53-0242ac110002-jpg-regular_image.jpeg',
      href: '/collision-repair',
      delay: 0
    },
    {
      id: '2',
      title: 'Paint-less dent repair',
      description: 'Efficiently remove dents without affecting your car\'s original paint finish.',
      image: 'https://cdn.b12.io/client_media/OIudL3H6/9809e66c-71ac-11f0-be53-0242ac110002-jpg-regular_image.jpeg',
      href: '/paint-less-dent-repair',
      delay: 50
    },
    {
      id: '3',
      title: 'Color matching',
      description: 'Achieve seamless paint color matching for flawless vehicle appearance.',
      image: 'https://cdn.b12.io/client_media/OIudL3H6/97e2fe62-71ac-11f0-be53-0242ac110002-jpg-regular_image.jpeg',
      href: '/color-matching',
      delay: 100
    }
  ];

  return (
    <section 
      id="services" 
      className="py-16 lg:py-24 bg-gray-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Section Title */}
          <h2 
            data-animate-id="services-title"
            className={getAnimationClass(
              'services-title',
              'font-poppins font-semibold text-4xl md:text-5xl text-gray-900 mb-6'
            )}
          >
            Expert collision repair
          </h2>

          {/* Section Subtitle */}
          <div 
            data-animate-id="services-subtitle"
            className={getAnimationClass(
              'services-subtitle',
              'font-poppins font-medium text-xl md:text-2xl text-blue-600 mb-4'
            )}
            style={{ transitionDelay: '50ms' }}
          >
            Precision repairs and custom auto care
          </div>

          {/* Optional paragraph space - empty in original but keeping structure */}
          <div 
            data-animate-id="services-paragraph"
            className={getAnimationClass(
              'services-paragraph',
              'font-poppins font-normal text-lg text-gray-600 max-w-3xl mx-auto'
            )}
            style={{ transitionDelay: '100ms' }}
          >
            {/* Empty paragraph as in original, but you can add content here if needed */}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isAnimated={animatedElements.has(`service-${service.id}`)}
            />
          ))}
        </div>

        {/* Optional CTA Section */}
        <div className="text-center mt-16">
          <div 
            data-animate-id="services-cta"
            className={getAnimationClass('services-cta')}
            style={{ transitionDelay: '200ms' }}
          >
            <p className="font-poppins font-normal text-lg text-gray-600 mb-8">
              Need a service not listed? We offer comprehensive auto body repair solutions.
            </p>
            <a
              href="#contact"
              className="inline-block font-poppins font-semibold px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get a quote today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;