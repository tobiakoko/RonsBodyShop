import React from 'react';
import { ChevronRight } from 'lucide-react';

// Types
export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  delay: number;
}

// Service Card Component
const ServiceCard: React.FC<{
  service: Service;
  isAnimated: boolean;
}> = ({ service, isAnimated }) => {
  return (
    <div
      data-animate-id={`service-${service.id}`}
      className={`group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden transform hover:scale-105 ${
        isAnimated 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ 
        transitionDelay: isAnimated ? `${service.delay}ms` : '0ms' 
      }}
    >
      <a
        href={service.href}
        className="block h-full focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-xl"
        aria-label={`Read more about ${service.title}`}
      >
        {/* Service Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={service.image}
            alt={`${service.title} service illustration`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Service Content */}
        <div className="p-6">
          {/* Service Title with Arrow */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-poppins font-semibold text-xl text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
              {service.title}
            </h3>
            <ChevronRight 
              className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all duration-200" 
            />
          </div>

          {/* Service Description */}
          <p className="font-poppins font-normal text-gray-600 leading-relaxed">
            {service.description}
          </p>
        </div>
      </a>
    </div>
  );
};

export default ServiceCard;
