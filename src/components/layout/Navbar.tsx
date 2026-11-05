import { useEffect, useState } from 'react';
import { Phone, Menu, X, ArrowRight, MapPin } from 'lucide-react';
import { SHOP_INFO } from '../../content/shop';
import { formatHoursShort } from '../../lib/hours';

const NAV_LINKS = [
  { href: '#services', label: 'Services', mobile: 'Repair Services' },
  { href: '#how-it-works', label: 'How It Works', mobile: 'How It Works' },
  { href: '#about', label: 'About Our Shop', mobile: 'About Our Shop & Heritage' },
  { href: '#insurance', label: 'Insurance Claims', mobile: 'Insurance Claim Help' },
  { href: '#reviews', label: 'Reviews', mobile: `Customer Reviews (${SHOP_INFO.rating} ★)` },
  { href: '#contact', label: 'Contact', mobile: 'Location & Hours' },
];

interface NavbarProps {
  onOpenEstimate: () => void;
}

/**
 * SM-4 — mobile menu: `closed ⇄ open` (a boolean is the right size).
 *   open  entry: lock body scroll, listen for Escape. exit: restore both.
 *   close triggers: toggle button, any link/CTA in the drawer, Escape, resize to desktop.
 * The drawer is conditionally rendered, so it is never tabbable while closed.
 */
export const Navbar = ({ onOpenEstimate }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const close = () => setMobileMenuOpen(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileMenuOpen(false);
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onResize = () => desktop.matches && setMobileMenuOpen(false);
    document.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-vnavy text-white border-b border-vamber/30 shadow-md">
      {/* Top Utility Strip */}
      <div className="bg-vnavy-dark border-b border-vnavy text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-slate-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-vamber shrink-0" />
            <span className="truncate">{SHOP_INFO.fullAddress}</span>
            <span className="hidden sm:inline text-slate-500">·</span>
            <span className="hidden sm:inline text-slate-400">Torrance, CA</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="hidden md:inline text-slate-400">{formatHoursShort(SHOP_INFO.hours[0])}</span>
            <a 
              href={`tel:${SHOP_INFO.phoneRaw}`} 
              className="flex items-center gap-1.5 font-bold text-vamber hover:text-amber-300 transition-colors"
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
        <a href="#main" aria-label={`${SHOP_INFO.name} — back to top`} className="flex items-center gap-3.5 sm:gap-4 whitespace-nowrap shrink-0 group py-1">
          <img 
            src="/assets/aistudio/logo_copy_5_ac7ffbc9.PNG" 
            alt=""
            width="160"
            height="160"
            className="h-14 sm:h-18 md:h-20 w-auto object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-md"
          />
          <div className="hidden sm:flex flex-col">
            <span className="font-display text-2xl md:text-3xl tracking-wider uppercase font-bold text-white group-hover:text-vamber transition-colors leading-none">
              RON'S BODY SHOP
            </span>
            <span className="text-[11px] md:text-xs uppercase tracking-widest text-amber-200/90 font-semibold mt-1">
              Collision & Auto Repair · Est. {SHOP_INFO.foundedYear}
            </span>
          </div>
        </a>

        {/* Zone 2: Nav Links */}
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-200">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-vamber transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenEstimate}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-vamber hover:bg-vamber-hover text-vnavy font-bold text-sm tracking-wide uppercase rounded-md transition-all shadow-md hover:shadow-lg whitespace-nowrap shrink-0"
          >
            <span>Get Free Estimate</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="lg:hidden p-2 text-slate-200 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav id="mobile-nav" aria-label="Mobile" className="lg:hidden bg-vnavy-dark border-b border-vamber/40 px-5 py-6 space-y-4 max-h-[calc(100dvh-8rem)] overflow-y-auto">
          <div className="flex flex-col space-y-3 font-medium text-slate-200 text-sm">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={close}
                className="py-2 px-3 rounded hover:bg-vnavy hover:text-vamber transition-colors"
              >
                {l.mobile}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                close();
                onOpenEstimate();
              }}
              className="w-full py-3 bg-vamber text-vnavy font-bold text-center rounded-md text-sm uppercase tracking-wide flex items-center justify-center gap-2"
            >
              <span>Request Free Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`tel:${SHOP_INFO.phoneRaw}`}
              onClick={close}
              className="w-full py-2.5 border border-vamber/50 text-white font-semibold text-center rounded-md text-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-vamber" />
              <span>Call Direct: {SHOP_INFO.phone}</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
