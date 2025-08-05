import React from 'react';
import ContactForm, { type FormData } from './ContactForm';

interface WorkingHours {
  day: string;
  from: string;
  to: string;
}

interface ContactInfo {
  email: string;
  location: {
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

const EmailIcon: React.FC = () => (
  <svg height="16px" width="16px" viewBox="0 0 12 8" xmlns="http://www.w3.org/2000/svg" className="fill-current">
    <path d="M0 8h11.2V0H0v8zm5.6-2.673l1.095-.914 3.522 2.947H.983l3.522-2.947 1.095.914zm1.594-1.33l3.366-2.81v5.626L7.194 3.996zM5.6 4.492L.985.64h9.23L5.6 4.493zm-1.594-.497L.64 6.813V1.186l3.366 2.81z" fillRule="nonzero" />
  </svg>
);

const LocationIcon: React.FC = () => (
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current">
    <path d="M256 0C156.748 0 76 80.748 76 180c0 33.534 9.289 66.26 26.869 94.652l142.885 230.257A15 15 0 00258.499 512h.119a14.997 14.997 0 0012.75-7.292L410.611 272.22C427.221 244.428 436 212.539 436 180 436 80.748 355.252 0 256 0zm128.866 256.818L258.272 468.186l-129.905-209.34C113.734 235.214 105.8 207.95 105.8 180c0-82.71 67.49-150.2 150.2-150.2S406.1 97.29 406.1 180c0 27.121-7.411 53.688-21.234 76.818z" />
    <path d="M256 90c-49.626 0-90 40.374-90 90 0 49.309 39.717 90 90 90 50.903 0 90-41.233 90-90 0-49.626-40.374-90-90-90zm0 150.2c-33.257 0-60.2-27.033-60.2-60.2 0-33.084 27.116-60.2 60.2-60.2s60.1 27.116 60.1 60.2c0 32.683-26.316 60.2-60.1 60.2z" />
  </svg>
);

const ContactSection: React.FC<ContactSectionProps> = ({
  title = "Reach out to ron's body shop",
  subtitle = "Expert collision repair support awaits you",
  contactInfo = {
    email: "email@email.com",
    location: {
      city: "Torrance",
      state: "California",
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
    <section id="contact" className="bg-gray-50 py-16 lg:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-5">
            <ContactForm
              title={title}
              subtitle={subtitle}
              onSubmit={onSubmit}
            />
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="space-y-8">
              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900">{title}</h3>

              {/* Email */}
              <div className="flex items-center space-x-3">
                <EmailIcon />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  aria-label={`Email us at ${contactInfo.email}`}
                >
                  {contactInfo.email}
                </a>
              </div>

              {/* Location */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Location</h4>
                <div className="flex items-center space-x-3">
                  <LocationIcon />
                  <a
                    href={contactInfo.location.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    aria-label={`Our location at ${contactInfo.location.city}, ${contactInfo.location.state}`}
                  >
                    {contactInfo.location.city}, {contactInfo.location.state}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Hours</h4>
                <ul className="space-y-2" aria-label="Working hours">
                  {contactInfo.workingHours.map((hours, index) => (
                    <li key={index} className="flex justify-between items-center py-1">
                      <span className="text-gray-700 font-medium">{hours.day}</span>
                      <span className="text-gray-600">
                        {hours.from} – {hours.to}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;