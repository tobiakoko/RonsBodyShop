import { Phone, FileText, Navigation } from 'lucide-react';
import { SHOP_INFO } from '../../content/shop';
import { useShopStatus } from '../../lib/useShopStatus';

interface MobileFloatingBarProps {
  onOpenEstimate: () => void;
}

export const MobileFloatingBar = ({ onOpenEstimate }: MobileFloatingBarProps) => {
  const status = useShopStatus();

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#16203B]/95 backdrop-blur-md border-t border-[#E7A622]/40 lg:hidden shadow-2xl safe-area-bottom">
      <div className="grid grid-cols-3 divide-x divide-slate-800 text-center py-2 px-1">
        {/* Call Now */}
        <a
          href={`tel:${SHOP_INFO.phoneRaw}`}
          className="flex flex-col items-center justify-center py-1 text-slate-100 active:text-[#E7A622]"
        >
          <div className="w-8 h-8 rounded-full bg-[#E7A622]/20 flex items-center justify-center mb-0.5 text-[#E7A622]">
            <Phone className="w-4 h-4" aria-hidden="true" />
          </div>
          <span className="text-[11px] font-bold tracking-tight">Call Shop</span>
          <span className={`text-[9px] ${status.isOpen ? 'text-emerald-300' : 'text-slate-400'}`}>
            {status.isOpen ? status.text : 'Closed now'}
          </span>
        </a>

        {/* Free Estimate */}
        <button
          type="button"
          onClick={onOpenEstimate}
          className="flex flex-col items-center justify-center py-1 text-slate-100 active:text-[#E7A622]"
        >
          <div className="w-8 h-8 rounded-full bg-[#D83A27] text-white flex items-center justify-center mb-0.5 shadow">
            <FileText className="w-4 h-4" aria-hidden="true" />
          </div>
          <span className="text-[11px] font-bold tracking-tight text-amber-300">Get Estimate</span>
          <span className="text-[9px] text-slate-400">Free & Fast</span>
        </button>

        {/* Directions / Map */}
        <a
          href={SHOP_INFO.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 text-slate-100 active:text-[#E7A622]"
        >
          <div className="w-8 h-8 rounded-full bg-[#E7A622]/20 flex items-center justify-center mb-0.5 text-[#E7A622]">
            <Navigation className="w-4 h-4" aria-hidden="true" />
          </div>
          <span className="text-[11px] font-bold tracking-tight">Directions</span>
          <span className="text-[9px] text-slate-400">{SHOP_INFO.address.replace(/ Ave$/, '')}</span>
        </a>
      </div>
    </div>
  );
};
