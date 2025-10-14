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
    <section id="contact" className="py-20 lg:py-32 bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-block text-sm font-semibold text-blue-600 mb-4">
            Contact Us
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm onSubmit={onSubmit} />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Contact</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div>
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-gray-900 transition-colors">
                    {contactInfo.email}
                  </a>
                </div>
                {contactInfo.phone && (
                  <div>
                    <a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} className="hover:text-gray-900 transition-colors">
                      {contactInfo.phone}
                    </a>
                  </div>
                )}
                <div>
                  <a
                    href={contactInfo.location.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-gray-900 transition-colors"
                  >
                    {contactInfo.location.address && <div>{contactInfo.location.address}</div>}
                    <div>{contactInfo.location.city}, {contactInfo.location.state}</div>
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Hours</h3>
              <div className="space-y-2 text-sm text-gray-600">
                {contactInfo.workingHours.map((hours, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{hours.day}</span>
                    <span>{hours.from} – {hours.to}</span>
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