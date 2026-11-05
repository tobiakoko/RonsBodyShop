import React from 'react';
import { SHOP_INFO } from '../data/shopData';
import { Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenEstimate: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEstimate }) => {
  return (
    <footer className="bg-[#0F1626] text-white border-t border-[#E7A622]/40 pt-16 pb-24 lg:pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Emblem */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <img
                src="/assets/aistudio/logo_copy_5_ac7ffbc9.PNG"
                alt="Ron's Body Shop Emblem"
                referrerPolicy="no-referrer"
                className="h-14 sm:h-16 w-auto object-contain"
              />
              <div className="font-['Oswald'] text-2xl font-bold tracking-wider uppercase text-white">
                RON'S BODY SHOP
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Where satisfaction is a tradition. Serving Torrance and the South Bay with dedicated collision repair, unibody straightening, and vintage vehicle preservation since 1980.
            </p>
            <div className="text-[11px] text-amber-300/80 font-medium">
              BAR License · I-CAR Certified Team
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Oswald'] text-sm uppercase font-bold text-[#E7A622] tracking-wider mb-4">
              Explore Our Shop
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#services" className="hover:text-[#E7A622] transition-colors">
                  Collision & Structural Repair
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E7A622] transition-colors">
                  Computerized Color Matching
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E7A622] transition-colors">
                  Paintless Dent Repair (PDR)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E7A622] transition-colors">
                  Classic Car Restoration
                </a>
              </li>
              <li>
                <a href="#heritage" className="hover:text-[#E7A622] transition-colors">
                  Antique Gas Pump Museum
                </a>
              </li>
            </ul>
          </div>

          {/* California Insurance Notice */}
          <div>
            <h4 className="font-['Oswald'] text-sm uppercase font-bold text-[#E7A622] tracking-wider mb-4">
              Insurance Protection
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              California Insurance Code § 758.5 gives you the legal right to select Ron's Body Shop regardless of what any insurer recommends.
            </p>
            <button
              onClick={onOpenEstimate}
              className="text-xs font-bold text-[#E7A622] hover:text-amber-200 transition-colors uppercase tracking-wider underline"
            >
              Start Free Photo Estimate →
            </button>
          </div>

          {/* Direct Contact info */}
          <div>
            <h4 className="font-['Oswald'] text-sm uppercase font-bold text-[#E7A622] tracking-wider mb-4">
              Torrance Location
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E7A622] shrink-0 mt-0.5" />
                <span>1324 Cabrillo Ave, Torrance, CA 90501</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E7A622] shrink-0" />
                <a href={`tel:${SHOP_INFO.phoneRaw}`} className="font-semibold text-white hover:text-[#E7A622]">
                  {SHOP_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E7A622] shrink-0" />
                <a href={`mailto:${SHOP_INFO.email}`} className="text-slate-300 hover:text-white">
                  {SHOP_INFO.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Quiet Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} Ron's Body Shop, Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Crafted with pride in Old Town Torrance, CA</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
