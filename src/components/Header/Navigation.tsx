import { useState } from "react";
import { ASSETS } from "../../config/data";
import {
  MdBuild,
  MdHistoryEdu,
  MdGarage,
  MdContactSupport,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { track } from "@vercel/analytics";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    if (newState) {
      track("Mobile Menu Opened");
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  const handleNavClick = (label: string, isMobile: boolean) => {
    track("Navigation Link Clicked", {
      section: label,
      device: isMobile ? "mobile" : "desktop"
    });
  };

  const handleCallClick = (isMobile: boolean) => {
    track("Call Button Clicked", {
      location: "Header",
      device: isMobile ? "mobile" : "desktop"
    });
  };

  const navLinks = [
    { href: "#services", icon: MdBuild, label: "Services" },
    { href: "#story", icon: MdHistoryEdu, label: "Our Story" },
    { href: "#gallery", icon: MdGarage, label: "Showroom" },
    { href: "#contact", icon: MdContactSupport, label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-2xl border-b-8 border-gold">
      <div className="container mx-auto px-4 flex items-center justify-between h-20 md:h-auto">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/">
            <img
              alt="Ron's Body Shop Logo"
              className="h-16 w-auto md:h-32 md:w-36 object-contain"
              src={ASSETS.LOGO_URL}
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 lg:space-x-10 text-white font-display uppercase tracking-widest text-sm">
          {navLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={href}
              className="hover:text-gold transition-colors flex items-center gap-2"
              href={href}
              onClick={() => handleNavClick(label, false)}
            >
              <Icon className="text-lg" /> {label}
            </a>
          ))}
        </nav>

        {/* Desktop Call Button */}
        <div className="hidden md:flex items-center">
          <a
            className="enamel-button bg-accent text-white px-6 lg:px-8 py-2.5 rounded-sm font-display text-sm tracking-widest hover:brightness-110"
            href="tel:+13106188791"
            onClick={() => handleCallClick(false)}
          >
            CALL NOW
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white hover:text-gold transition-colors p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <MdClose className="text-3xl" /> : <MdMenu className="text-3xl" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-primary border-b-4 border-gold shadow-2xl transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
          {navLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={href}
              className="text-white hover:text-gold transition-colors flex items-center gap-3 font-display uppercase tracking-widest text-base py-3 border-b border-gold/20"
              href={href}
              onClick={() => {
                handleNavClick(label, true);
                closeMenu();
              }}
            >
              <Icon className="text-2xl" /> {label}
            </a>
          ))}
          <a
            className="enamel-button bg-accent text-white px-8 py-3 rounded-sm font-display text-sm tracking-widest hover:brightness-110 text-center mt-4"
            href="tel:+13106188791"
            onClick={() => {
              handleCallClick(true);
              closeMenu();
            }}
          >
            CALL NOW
          </a>
        </nav>
      </div>
    </header>
  );
}
