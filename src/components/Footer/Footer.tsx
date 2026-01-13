import { MapPin, Phone, Mail } from 'lucide-react';
import {
  MdLeaderboard,
  MdPhotoCamera,
  MdVideoLibrary,
} from "react-icons/md";
import { track } from "@vercel/analytics";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    track("Newsletter Subscription", { location: "Footer" });
    // Add your newsletter submission logic here
  };

  const handlePhoneClick = () => {
    track("Phone Number Clicked", { location: "Footer" });
  };

  const handleEmailClick = () => {
    track("Email Clicked", { location: "Footer" });
  };

  const handleSocialClick = (platform: string) => {
    track("Social Link Clicked", { platform });
  };

  return (
    <footer className="bg-[#0f1419] text-white relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#f4b942]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-6 sm:pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-12">
          {/* Company Info */}
          <div>
            <a href="/">
              <img
                src='/logo.png'
                alt="Ron's Body Shop"
                className="h-20 sm:h-24 w-auto mb-3 sm:mb-4"
              />
            </a>
            <p className="text-gray-400 leading-relaxed text-sm">
              Where satisfaction is a tradition.
            </p>
            <div className="flex space-x-4 sm:space-x-6 mt-6 sm:mt-8">
              <a
                className="w-8 h-8 rounded-none border-2 border-gold flex items-center justify-center hover:bg-gold hover:text-primary transition-all rotate-3"
                href="#"
                onClick={() => handleSocialClick("Platform 1")}
              >
                <MdLeaderboard />
              </a>
              <a
                className="w-8 h-8 rounded-none border-2 border-gold flex items-center justify-center hover:bg-gold hover:text-primary transition-all -rotate-3"
                href="#"
                onClick={() => handleSocialClick("Instagram")}
              >
                <MdPhotoCamera />
              </a>
              <a
                className="w-8 h-8 rounded-none border-2 border-gold flex items-center justify-center hover:bg-gold hover:text-primary transition-all rotate-6"
                href="#"
                onClick={() => handleSocialClick("YouTube")}
              >
                <MdVideoLibrary />
              </a>
            </div>
          </div>

          {/* The Shop */}
          <div>
            <h4 className="text-base sm:text-lg mb-4 sm:mb-6 tracking-wider text-white uppercase">
              THE SHOP
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="text-[#d64436] flex-shrink-0 mt-1" size={16} />
                <div>
                  <p className="text-sm text-gray-400">1324 Cabrillo Ave.</p>
                  <p className="text-sm text-gray-400">Torrance, CA 90501</p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="text-[#d64436] flex-shrink-0 mt-1" size={16} />
                <a
                  href="tel:+13106188791"
                  className="text-sm text-gray-400 hover:text-[#f4b942] transition-colors"
                  onClick={handlePhoneClick}
                >
                  (310) 618-8791
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="text-[#d64436] flex-shrink-0 mt-1" size={16} />
                <a
                  href="mailto:info@ronsbodyshop.net"
                  className="text-sm text-gray-400 hover:text-[#f4b942] transition-colors"
                  onClick={handleEmailClick}
                >
                  ronsbodyshop@sbcglobal.net
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-base sm:text-lg mb-4 sm:mb-6 tracking-wider text-white uppercase">
              HOURS
            </h4>
            <ul className="space-y-2">
              <li className="flex justify-between text-sm">
                <span className="text-gray-400">MON - FRI</span>
                <span className="text-white">8AM - 5:30PM</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-400">SAT</span>
                <span className="text-white">8AM - 12:00PM</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-400">SUN</span>
                <span className="text-white">CLOSED</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-base sm:text-lg mb-4 sm:mb-6 tracking-wider text-white uppercase">
              NEWSLETTER
            </h4>
            <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
              Get the latest updates and special offers
            </p>
            <form className="flex flex-col space-y-2 sm:space-y-3" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Your email"
                required
                className="bg-[#1a1f2e] border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#f4b942]"
              />
              <button
                type="submit"
                className="bg-[#d64436] text-white px-6 py-3 hover:bg-[#f4b942] hover:text-[#1a1f2e] transition-all text-sm tracking-wider font-medium"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 text-xs sm:text-sm text-gray-500">
            <p>
              © {currentYear} Ron's Body Shop. All rights reserved.
            </p>
            <a 
              href="https://arkomedialabs.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[#f4b942] transition-colors"
            >
              Designed by Arko Media Labs
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}