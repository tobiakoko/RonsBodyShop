import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { track } from '@vercel/analytics';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Track form submission with service type
    track('Contact Form Submitted', {
      service: formData.service || 'not specified',
      hasPhone: !!formData.phone,
      messageLength: formData.message.length
    });

    // Mock form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhoneClick = () => {
    track('Phone Number Clicked', { location: 'Contact Section' });
  };

  const handleEmailClick = () => {
    track('Email Clicked', { location: 'Contact Section' });
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-[#1a1f2e] relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#f4b942]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#f4b942] mb-3 tracking-wider uppercase">
            GET IN TOUCH
          </h2>
          <p className="text-white text-base sm:text-lg">
            Ready to restore your vehicle? Contact us today for a free estimate
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-[#0f1419] border-2 border-[#f4b942] p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl text-[#f4b942] mb-4 sm:mb-6 tracking-wider uppercase">
                CONTACT INFO
              </h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#d64436] flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-white mb-1 text-sm sm:text-base">Address</p>
                    <p className="text-gray-400 text-xs sm:text-sm">1324 Cabrillo Ave.</p>
                    <p className="text-gray-400 text-xs sm:text-sm">Torrance, CA 90501</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#d64436] flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-white mb-1 text-sm sm:text-base">Phone</p>
                    <a
                      href="tel:+15555551975"
                      className="text-gray-400 text-xs sm:text-sm hover:text-[#f4b942] transition-colors"
                      onClick={handlePhoneClick}
                    >
                      (310) 618-8791
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#d64436] flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-white mb-1 text-sm sm:text-base">Email</p>
                    <a
                      href="mailto:info@ronsbodyshop.net"
                      className="text-gray-400 text-xs sm:text-sm hover:text-[#f4b942] transition-colors break-all"
                      onClick={handleEmailClick}
                    >
                      ronsbodyshop@sbcglobal.net
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#d64436] flex items-center justify-center flex-shrink-0">
                    <Clock className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-white mb-2 text-sm sm:text-base">Hours</p>
                    <p className="text-gray-400 text-xs sm:text-sm">Mon - Fri: 8:00 AM - 5:30 PM</p>
                    <p className="text-gray-400 text-xs sm:text-sm">Sat: 8:00 AM - 12:00 PM</p>
                    <p className="text-gray-400 text-xs sm:text-sm">Sun: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-2 text-sm tracking-wider">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0f1419] border-2 border-gray-700 px-4 py-3 text-white focus:outline-none focus:border-[#f4b942] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white mb-2 text-sm tracking-wider">
                    YOUR EMAIL *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0f1419] border-2 border-gray-700 px-4 py-3 text-white focus:outline-none focus:border-[#f4b942] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="phone" className="block text-white mb-2 text-sm tracking-wider">
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#0f1419] border-2 border-gray-700 px-4 py-3 text-white focus:outline-none focus:border-[#f4b942] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-white mb-2 text-sm tracking-wider">
                    SERVICE NEEDED
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-[#0f1419] border-2 border-gray-700 px-4 py-3 text-white focus:outline-none focus:border-[#f4b942] transition-colors"
                  >
                    <option value="">Select a service</option>
                    <option value="collision">Collision Repair</option>
                    <option value="paint">Custom Paint</option>
                    <option value="dent">Dent Removal</option>
                    <option value="frame">Frame Straightening</option>
                    <option value="restoration">Classic Restoration</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-white mb-2 text-sm tracking-wider">
                  YOUR MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full bg-[#0f1419] border-2 border-gray-700 px-4 py-3 text-white focus:outline-none focus:border-[#f4b942] transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#d64436] text-white px-8 py-4 hover:bg-[#f4b942] hover:text-[#1a1f2e] transition-all text-base tracking-wider font-medium flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>{submitted ? 'MESSAGE SENT!' : 'SEND MESSAGE'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#f4b942]"></div>
    </section>
  );
}