import React from 'react';
import Logo from '../Logo/Logo';

interface NavigationLink {
  href: string;
  text: string;
  target?: string;
}

interface FooterProps {
  brandName?: string;
  navigationLinks?: NavigationLink[];
  showLogoBranding?: boolean;
  email?: string;
  phone?: string;
  address?: string;
}

const Footer: React.FC<FooterProps> = ({
  brandName = "Ron's Auto",
  navigationLinks = [
    { href: "#home", text: "Home" },
    { href: "#about", text: "About" },
    { href: "#services", text: "Services" },
    { href: "#contact", text: "Contact" }
  ],
  showLogoBranding = true,
  email = "contact@ronsauto.com",
  phone = "(310) 555-0123",
  address = "Torrance, CA"
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <a
              href="#home"
              className="inline-flex items-center gap-3 text-white hover:text-blue-400 transition-all duration-300 mb-6 group"
            >
              <svg className="w-9 h-9 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="6" fill="currentColor"/>
                <path d="M12 10h8M12 16h8M12 22h5" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="font-bold text-xl">{brandName}</span>
            </a>
            <p className="text-base text-gray-300 leading-relaxed max-w-sm">
              Expert collision repair and auto body services. Trusted by thousands of satisfied customers for over 30 years.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold tracking-wider uppercase text-white mb-6">Navigation</h3>
            <ul className="space-y-3">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target={link.target || ""}
                    className="text-base text-gray-300 hover:text-blue-400 transition-colors duration-300 inline-block"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold tracking-wider uppercase text-white mb-6">Services</h3>
            <ul className="space-y-3 text-base text-gray-300">
              <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">Collision Repair</li>
              <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">Paint Matching</li>
              <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">Dent Removal</li>
              <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">Frame Straightening</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold tracking-wider uppercase text-white mb-6">Contact</h3>
            <div className="space-y-4">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 text-base text-gray-300 hover:text-blue-400 transition-colors duration-300 group"
              >
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {email}
              </a>
              <a
                href={`tel:${phone.replace(/\D/g, '')}`}
                className="flex items-center gap-3 text-base text-gray-300 hover:text-blue-400 transition-colors duration-300 group"
              >
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {phone}
              </a>
              <div className="flex items-center gap-3 text-base text-gray-300">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {address}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-400">
              © {currentYear} {brandName}. All rights reserved.
            </p>

            {/* Developer Branding */}
            {showLogoBranding && (
              <div className="inline-flex items-center gap-2">
                <span className="text-sm text-gray-400">Designed by</span>
                <Logo />
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;