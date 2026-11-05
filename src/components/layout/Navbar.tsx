import React, { useState } from 'react';
import { Phone, Menu, X, ArrowRight, MapPin } from 'lucide-react';
import { SHOP_INFO } from '../../content/shop';

interface NavbarProps {
  onOpenEstimate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEstimate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#16203B] text-white border-b border-[#E7A622]/30 shadow-md">
      {/* Top Utility Strip */}
      <div className="bg-[#0F1626] border-b border-[#16203B] text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-slate-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#E7A622] shrink-0" />
            <span className="truncate">{SHOP_INFO.fullAddress}</span>
            <span className="hidden sm:inline text-slate-500">·</span>
            <span className="hidden sm:inline text-slate-400">Torrance, CA</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="hidden md:inline text-slate-400">Mon–Fri: 8:00 AM – 5:30 PM</span>
            <a 
              href={`tel:${SHOP_INFO.phoneRaw}`} 
              className="flex items-center gap-1.5 font-bold text-[#E7A622] hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{SHOP_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation (3-Zone Top Bar Contract) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 min-h-[5.75rem] py-2 flex items-center justify-between gap-6 sm:gap-8">
        
        {/* Zone 1: Prominent Official Emblem & Wordmark */}
        <a href="#" className="flex items-center gap-3.5 sm:gap-4 whitespace-nowrap shrink-0 group py-1">
          <img 
            src="/assets/aistudio/logo_copy_5_ac7ffbc9.PNG" 
            alt="Ron's Body Shop Logo" 
            referrerPolicy="no-referrer"
            className="h-14 sm:h-18 md:h-20 w-auto object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-md"
          />
          <div className="hidden sm:flex flex-col">
            <span className="font-['Oswald'] text-2xl md:text-3xl tracking-wider uppercase font-bold text-white group-hover:text-[#E7A622] transition-colors leading-none">
              RON'S BODY SHOP
            </span>
            <span className="text-[11px] md:text-xs uppercase tracking-widest text-amber-200/90 font-semibold mt-1">
              Collision & Auto Repair · Est. 1980
            </span>
          </div>
        </a>

        {/* Zone 2: Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-200">
          <a href="#services" className="hover:text-[#E7A622] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8">
            Services
          </a>
          <a href="#how-it-works" className="hover:text-[#E7A622] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8">
            How It Works
          </a>
          <a href="#about" className="hover:text-[#E7A622] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8">
            About Our Shop
          </a>
          <a href="#insurance" className="hover:text-[#E7A622] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8">
            Insurance Claims
          </a>
          <a href="#reviews" className="hover:text-[#E7A622] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8">
            Reviews
          </a>
          <a href="#contact" className="hover:text-[#E7A622] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8">
            Contact
          </a>
        </nav>

        {/* Zone 3: Primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenEstimate}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#E7A622] hover:bg-[#D3951B] text-[#16203B] font-bold text-sm tracking-wide uppercase rounded-md transition-all shadow-md hover:shadow-lg whitespace-nowrap shrink-0"
          >
            <span>Get Free Estimate</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-200 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F1626] border-b border-[#E7A622]/40 px-5 py-6 space-y-4">
          <div className="flex flex-col space-y-3 font-medium text-slate-200 text-sm">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-[#16203B] hover:text-[#E7A622] transition-colors"
            >
              Repair Services
            </a>
            <a 
              href="#how-it-works" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-[#16203B] hover:text-[#E7A622] transition-colors"
            >
              How It Works
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-[#16203B] hover:text-[#E7A622] transition-colors"
            >
              About Our Shop & Heritage
            </a>
            <a 
              href="#insurance" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-[#16203B] hover:text-[#E7A622] transition-colors"
            >
              Insurance Claim Help
            </a>
            <a 
              href="#reviews" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-[#16203B] hover:text-[#E7A622] transition-colors"
            >
              Customer Reviews (4.7 ★)
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-[#16203B] hover:text-[#E7A622] transition-colors"
            >
              Location & Hours
            </a>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEstimate();
              }}
              className="w-full py-3 bg-[#E7A622] text-[#16203B] font-bold text-center rounded-md text-sm uppercase tracking-wide flex items-center justify-center gap-2"
            >
              <span>Request Free Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`tel:${SHOP_INFO.phoneRaw}`}
              className="w-full py-2.5 border border-[#E7A622]/50 text-white font-semibold text-center rounded-md text-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#E7A622]" />
              <span>Call Direct: {SHOP_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
