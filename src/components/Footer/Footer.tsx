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
}


const Footer: React.FC<FooterProps> = ({
  brandName = "Ron's Body Shop",
  navigationLinks = [
    { href: "/scheduling", text: "Schedule appointment" },
    { href: "/intake-form", text: "Complete intake" }
  ],
  showLogoBranding = true
}) => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <div className="w-full">
            <div className="mb-8">
              {/* Brand Name */}
              <h2 className="text-2xl font-bold mb-6">
                <a 
                  href="/" 
                  className="text-white hover:text-gray-300 transition-colors duration-200"
                >
                  {brandName}
                </a>
              </h2>

              {/* Navigation Links */}
              <nav aria-label="Secondary navigation">
                <ul className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8">
                  {navigationLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        target={link.target || ""}
                        className="text-gray-300 hover:text-white hover:underline transition-colors duration-200 text-lg"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* B12 Branding */}
            {showLogoBranding && (
              <div className="mt-8 pt-8 border-t border-gray-700">
                <a
                  href="https://www.b12.io/ai-web-design/?utm_source=client&utm_medium=footer&utm_campaign=ai-web-design"
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <span className="text-sm">Web design by</span>
                  <Logo />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;