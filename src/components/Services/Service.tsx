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
      className={`group bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-500 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
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
        <div className="relative h-56 sm:h-64 overflow-hidden">
          <img
            src={service.image}
            alt={`${service.title} service`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Service Content */}
        <div className="p-6 sm:p-8">
          {/* Service Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {service.title}
          </h3>

          {/* Service Description */}
          <p className="text-base text-gray-600 leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Learn More Link */}
          <div className="inline-flex items-center text-base font-semibold text-blue-600 group-hover:gap-2 transition-all">
            <span>Learn more</span>
            <svg className="w-5 h-5 ml-1 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ServiceCard;