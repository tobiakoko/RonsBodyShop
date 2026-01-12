import { ASSETS } from "../../config/data";
import {
  MdBuild,
  MdHistoryEdu,
  MdGarage,
  MdContactSupport,
} from "react-icons/md";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-primary shadow-2xl border-b-8 border-gold">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <a href="/">
            <img
              alt="Ron's Body Shop Logo"
              className="h-38 w-40 object-contain"
              src={ASSETS.LOGO_URL}
            />
          </a>
        </div>

        <nav className="hidden md:flex space-x-10 text-white font-display uppercase tracking-widest text-sm">
          <a className="hover:text-gold transition-colors flex items-center gap-2" href="#services">
            <MdBuild className="text-lg" /> Services
          </a>
          <a className="hover:text-gold transition-colors flex items-center gap-2" href="#story">
            <MdHistoryEdu className="text-lg" /> Our Story
          </a>
          <a className="hover:text-gold transition-colors flex items-center gap-2" href="#gallery">
            <MdGarage className="text-lg" /> Showroom
          </a>
          <a className="hover:text-gold transition-colors flex items-center gap-2" href="#contact">
            <MdContactSupport className="text-lg" /> Contact
          </a>
        </nav>

        <div className="flex items-center space-x-6">
          <a
            className="enamel-button bg-accent text-white px-8 py-2.5 rounded-sm font-display text-sm tracking-widest hover:brightness-110"
            href="tel:+13106188791"
          >
            CALL NOW
          </a>
        </div>
      </div>
    </header>
  );
}
