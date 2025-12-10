import React from 'react';
import ContactForm, { type FormData } from './ContactForm';

interface WorkingHours {
  day: string;
  from: string;
  to: string;
}

interface ContactInfo {
  email: string;
  phone?: string;
  location: {
    address?: string;
    city: string;
    state: string;
    googleMapsUrl: string;
  };
  workingHours: WorkingHours[];
}

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  contactInfo?: ContactInfo;
  onSubmit?: (formData: FormData) => Promise<void> | void;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  title = "Get in Touch",
  subtitle = "Fill out the form and we'll get back to you within 24 hours",
  contactInfo = {
    email: "contact@ronsauto.com",
    phone: "(310) 555-0123",
    location: {
      address: "1234 Pacific Coast Highway",
      city: "Torrance",
      state: "CA",
      googleMapsUrl: "https://www.google.com/maps/place/+Torrance+California"
    },
    workingHours: [
      { day: "Monday", from: "9:00am", to: "10:00pm" },
      { day: "Tuesday", from: "9:00am", to: "10:00pm" },
      { day: "Wednesday", from: "9:00am", to: "10:00pm" },
      { day: "Thursday", from: "9:00am", to: "10:00pm" },
      { day: "Friday", from: "9:00am", to: "10:00pm" },
      { day: "Saturday", from: "9:00am", to: "6:00pm" },
      { day: "Sunday", from: "9:00am", to: "12:00pm" }
    ]
  },
  onSubmit
}) => {
  return (
    <section id="contact" className="py-20 sm:py-24 lg:py-32 xl:py-40 bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-blue-600 mb-4 sm:mb-6">
            <span className="w-8 h-0.5 bg-blue-600"></span>
            Contact Us
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm onSubmit={onSubmit} />
          </div>

          {/* Contact Information */}
          <div className="space-y-8 lg:space-y-10">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
              <h3 className="text-base font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4 text-base text-gray-600">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-blue-600 transition-colors font-medium">
                    {contactInfo.email}
                  </a>
                </div>
                {contactInfo.phone && (
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} className="hover:text-blue-600 transition-colors font-medium">
                      {contactInfo.phone}
                    </a>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <a
                    href={contactInfo.location.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-blue-600 transition-colors font-medium"
                  >
                    {contactInfo.location.address && <div>{contactInfo.location.address}</div>}
                    <div>{contactInfo.location.city}, {contactInfo.location.state}</div>
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
              <h3 className="text-base font-bold text-gray-900 mb-6">Business Hours</h3>
              <div className="space-y-3 text-sm">
                {contactInfo.workingHours.map((hours, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="font-medium text-gray-700">{hours.day}</span>
                    <span className="text-gray-600">{hours.from} – {hours.to}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;