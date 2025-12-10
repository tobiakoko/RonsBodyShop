import React from 'react';
import useScrollAnimation from '../../hooks/useScroll';
import ServiceCard, { type Service } from './Service';
import ronsCollisionRepair from '../../assets/rons-collision-repair.jpg'
import ronsColorMatching from '../../assets/rons-color-matching.jpg'
import ronsDentRepair from '../../assets/rons-dent-repair.jpg'

const ServicesSection: React.FC = () => {
  const animatedElements = useScrollAnimation();

  const getAnimationClass = (id: string, baseClass: string = '') => {
    const isAnimated = animatedElements.has(id);
    return `${baseClass} transition-all duration-700 ease-out ${
      isAnimated 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-12'
    }`;
  };

  const services: Service[] = [
    {
      id: '1',
      title: 'Collision Repair',
      description: 'Restore your vehicle to pre-accident condition with our expert collision repair services using advanced techniques and OEM parts.',
      image: ronsCollisionRepair,
      href: '#contact',
      delay: 0
    },
    {
      id: '2',
      title: 'Paint-less Dent Repair',
      description: 'Efficiently remove dents without affecting your car\'s original paint finish with precision craftsmanship.',
      image: ronsDentRepair,
      href: '#contact',
      delay: 100
    },
    {
      id: '3',
      title: 'Color Matching',
      description: 'Achieve seamless paint color matching for flawless vehicle appearance with our advanced technology.',
      image: ronsColorMatching,
      href: '#contact',
      delay: 200
    }
  ];

  return (
    <section
      id="services"
      className="py-20 sm:py-24 lg:py-32 xl:py-40 bg-white w-full"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          {/* Label */}
          <div
            data-animate-id="services-label"
            className={getAnimationClass(
              'services-label',
              'inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-blue-600 mb-4 sm:mb-6'
            )}
          >
            <span className="w-8 h-0.5 bg-blue-600"></span>
            Our Services
          </div>

          {/* Title */}
          <h2
            data-animate-id="services-title"
            className={getAnimationClass(
              'services-title',
              'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight'
            )}
            style={{ transitionDelay: '100ms' }}
          >
            Expert Collision Repair
          </h2>

          {/* Description */}
          <p
            data-animate-id="services-description"
            className={getAnimationClass(
              'services-description',
              'text-base sm:text-lg text-gray-600 leading-relaxed'
            )}
            style={{ transitionDelay: '200ms' }}
          >
            From minor dents to major collision repairs, our ASE-certified technicians deliver exceptional results using state-of-the-art equipment.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isAnimated={animatedElements.has(`service-${service.id}`)}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div
          data-animate-id="services-cta"
          className={getAnimationClass('services-cta', 'text-center max-w-2xl mx-auto')}
          style={{ transitionDelay: '400ms' }}
        >
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
            Need a service not listed? We offer comprehensive auto body repair solutions.
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center px-8 py-4 bg-blue-600 text-white text-base font-semibold rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/50 transition-all duration-300 hover:-translate-y-0.5"
          >
            Get a Free Quote
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;