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
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <a 
              href="#home" 
              className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors duration-200 mb-4"
            >
              <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="6" fill="currentColor"/>
                <path d="M12 10h8M12 16h8M12 22h5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="font-semibold text-lg">{brandName}</span>
            </a>
            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              Expert collision repair and auto body services. Trusted by thousands of satisfied customers for over 30 years.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Navigation</h3>
            <ul className="space-y-3">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target={link.target || ""}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Services</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>Collision Repair</li>
              <li>Paint Matching</li>
              <li>Dent Removal</li>
              <li>Frame Straightening</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Contact</h3>
            <div className="space-y-3">
              <a 
                href={`mailto:${email}`}
                className="block text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                {email}
              </a>
              <a 
                href={`tel:${phone.replace(/\D/g, '')}`}
                className="block text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                {phone}
              </a>
              <p className="text-sm text-gray-600">
                {address}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-600">
              © {currentYear} {brandName}. All rights reserved.
            </p>

            {/* Developer Branding */}
            {showLogoBranding && (
              <div className="inline-flex items-center gap-2">
                <span className="text-sm text-gray-600">Designed by</span>
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