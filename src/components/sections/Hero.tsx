import React, { useMemo } from 'react';
import { Phone, ArrowRight, Star, MapPin, Clock } from 'lucide-react';
import { SHOP_INFO } from '../../content/shop';

interface HeroProps {
  onOpenEstimate: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEstimate }) => {
  // Compute open/closed status for Pacific Time
  const statusInfo = useMemo(() => {
    try {
      const now = new Date();
      const ptString = now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
      const ptDate = new Date(ptString);
      const day = ptDate.getDay();
      const hour = ptDate.getHours() + ptDate.getMinutes() / 60;

      if (day === 0) {
        return { isOpen: false, text: "Closed Sundays · Opens Mon 8:00 AM" };
      } else if (day >= 1 && day <= 5) {
        if (hour >= 8 && hour < 17.5) {
          return { isOpen: true, text: "Open Today until 5:30 PM" };
        } else if (hour < 8) {
          return { isOpen: false, text: "Opens Today at 8:00 AM" };
        } else {
          return { isOpen: false, text: "Closed · Opens Tomorrow at 8:00 AM" };
        }
      } else if (day === 6) {
        if (hour >= 8 && hour < 12) {
          return { isOpen: true, text: "Open Saturday until 12:00 PM" };
        } else {
          return { isOpen: false, text: "Closed · Opens Monday at 8:00 AM" };
        }
      }
    } catch {
      // fallback
    }
    return { isOpen: true, text: "Open Mon–Fri: 8:00 AM – 5:30 PM" };
  }, []);

  return (
    <section className="relative bg-[#16203B] text-white pt-8 pb-14 lg:py-16 overflow-hidden border-b border-[#E7A622]/30">
      {/* Background vintage texture */}
      <div className="absolute inset-0 vintage-pinstripe opacity-30 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Direct Value Proposition (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Header Kicker + Verified Rating */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-3 text-xs">
              <span className="font-bold uppercase tracking-wider text-[#E7A622]">
                Torrance, CA · Auto Body & Collision Repair
              </span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded border border-white/10 text-slate-200">
                <div className="flex text-[#E7A622]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-white text-xs">{SHOP_INFO.rating}</span>
                <span className="text-[11px] text-slate-400">({SHOP_INFO.reviewCount} Google Reviews)</span>
              </div>
            </div>

            {/* Clear Headline answering: What is this shop? */}
            <h1 className="font-['Oswald'] text-3xl sm:text-5xl lg:text-5xl uppercase font-bold tracking-tight text-white leading-[1.1] text-balance">
              Precision Auto Body, Collision Repair & Custom Paint
            </h1>

            {/* Subtitle answering: What does it do? */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light max-w-xl">
              Serving vehicle owners in Torrance and the South Bay for over 40 years. From minor dent removal and insurance collision repairs to frame straightening and classic car restorations, we return your car to factory condition.
            </p>

            {/* Quick Core Services Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-xs text-slate-200 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="text-[#E7A622]">✓</span>
                <span>Collision Repair</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#E7A622]">✓</span>
                <span>Custom Paint Matching</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#E7A622]">✓</span>
                <span>Dent Removal & PDR</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#E7A622]">✓</span>
                <span>Frame Straightening</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#E7A622]">✓</span>
                <span>Classic Restorations</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#E7A622]">✓</span>
                <span>All Insurances Handled</span>
              </div>
            </div>

            {/* Primary Action Buttons: How to get service */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={`tel:${SHOP_INFO.phoneRaw}`}
                className="px-6 py-3.5 bg-[#E7A622] hover:bg-[#D3951B] text-[#16203B] font-bold text-sm tracking-wide uppercase rounded-md transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap active:scale-[0.99]"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>Call Shop: {SHOP_INFO.phone}</span>
              </a>

              <button
                onClick={onOpenEstimate}
                className="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-800 text-white border border-slate-600 font-bold text-sm uppercase tracking-wide rounded-md transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Request Free Estimate</span>
                <ArrowRight className="w-4 h-4 text-[#E7A622]" />
              </button>
            </div>

            {/* Shop location & live status bar */}
            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E7A622]" />
                <span>Walk-ins Welcome: 1324 Cabrillo Ave, Torrance</span>
              </div>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <div className="flex items-center gap-1.5 text-amber-300">
                <Clock className="w-3.5 h-3.5 text-[#E7A622]" />
                <span>{statusInfo.text}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Authentic Shop Photo Frame (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#0F1626] rounded-xl overflow-hidden border border-[#E7A622]/30 shadow-2xl">
              
              {/* Photo showing real Torrance shop building and classic 1940s Chevy delivery truck */}
              <div className="aspect-[4/3] w-full overflow-hidden relative bg-slate-900">
                <img
                  src="/assets/aistudio/IMG_6810_63434b37.jpeg"
                  alt="Ron's Body Shop facility at 1324 Cabrillo Ave, Torrance, CA"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Clean vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1626] via-transparent to-transparent opacity-80" />

                {/* Unboxed caption */}
                <div className="absolute bottom-3 inset-x-3 bg-[#16203B]/90 backdrop-blur-sm border border-slate-700/80 p-2.5 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white font-['Oswald'] uppercase">
                      1324 Cabrillo Avenue
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Old Town Torrance Facility
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#E7A622] font-semibold uppercase tracking-wider">
                      Over 40 Years In Business
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified Trust Strip */}
              <div className="grid grid-cols-3 divide-x divide-slate-800 text-center py-2.5 text-xs bg-[#0F1626]">
                <div>
                  <div className="font-['Oswald'] text-base font-bold text-white">40+ YRS</div>
                  <div className="text-[10px] text-slate-400">Serving Torrance</div>
                </div>
                <div>
                  <div className="font-['Oswald'] text-base font-bold text-[#E7A622]">4.7 ★</div>
                  <div className="text-[10px] text-slate-400">Google Rating</div>
                </div>
                <div>
                  <div className="font-['Oswald'] text-base font-bold text-white">I-CAR</div>
                  <div className="text-[10px] text-slate-400">Trained Team</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
