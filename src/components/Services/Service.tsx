import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  delay: number;
}

const ServiceCard: React.FC<{
  service: Service;
  isAnimated: boolean;
}> = ({ service, isAnimated }) => {
  return (
    <div
      data-animate-id={`service-${service.id}`}
      className={`group bg-white rounded-2xl border border-gray-200 hover:border-gray-300 overflow-hidden transition-all duration-500 ${
        isAnimated 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      }`}
      style={{ 
        transitionDelay: isAnimated ? `${service.delay}ms` : '0ms' 
      }}
    >
      <a
        href={service.href}
        className="block h-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-2xl"
        aria-label={`Learn more about ${service.title}`}
      >
        {/* Service Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={service.image}
            alt={`${service.title} service`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Service Content */}
        <div className="p-6">
          {/* Service Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {service.title}
          </h3>

          {/* Service Description */}
          <p className="text-gray-600 leading-relaxed mb-4">
            {service.description}
          </p>

          {/* Learn More Link */}
          <div className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
            <span>Learn more</span>
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ServiceCard;