import { Scale, Phone } from 'lucide-react';
import { SHOP_INFO } from '../../content/shop';

interface InsuranceAdvocacyProps {
  onOpenEstimate: () => void;
}

export const InsuranceAdvocacy = ({ onOpenEstimate }: InsuranceAdvocacyProps) => {
  return (
    <section
      id="insurance"
      className="py-16 bg-vnavy text-white border-b border-vamber/30 relative"
    >
      <div className="absolute inset-0 vintage-pinstripe opacity-25 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs uppercase tracking-widest text-vamber font-bold mb-1 flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5" aria-hidden="true" />
            <span>California Insurance Code § 758.5</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl uppercase font-bold text-white tracking-tight">
            You Choose Your Body Shop — Not The Insurance Company
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Under California law, you have the total legal right to have your vehicle repaired at
            the facility of your choice. An insurer cannot mandate where you take your vehicle.
          </p>
        </div>

        {/* 3 Practical Truths Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-vnavy-dark border border-slate-800 rounded-xl p-6 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-vamber/20 text-vamber flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="font-display text-xl uppercase font-bold text-white">
              One Estimate Is All You Need
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              You are not required by law to drive around getting three estimates. Simply bring your
              car or claim information to Ron's Body Shop, and we handle the itemized estimate.
            </p>
          </div>

          <div className="bg-vnavy-dark border border-slate-800 rounded-xl p-6 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-vred/20 text-vred flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="font-display text-xl uppercase font-bold text-white">
              We Work With All Carriers
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Whether your claim is through AAA, State Farm, Farmers, Geico, Allstate, Progressive,
              or Mercury, we communicate directly with your adjuster to approve necessary repairs.
            </p>
          </div>

          <div className="bg-vnavy-dark border border-slate-800 rounded-xl p-6 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-vamber/20 text-vamber flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="font-display text-xl uppercase font-bold text-white">
              We Advocate For Your Vehicle
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Insurance adjusters may write minimal preliminary allowances. When we disassemble your
              vehicle, we submit digital supplement requests for any hidden damage found.
            </p>
          </div>
        </div>

        {/* Direct Action Strip */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-300">
            Have questions about an open claim or deductible? We are happy to review your paperwork
            with no obligation.
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${SHOP_INFO.phoneRaw}`}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-vamber" aria-hidden="true" />
              <span>Call Claims Line: {SHOP_INFO.phone}</span>
            </a>
            <button
              type="button"
              onClick={onOpenEstimate}
              className="px-5 py-2.5 bg-vamber hover:bg-vamber-hover text-vnavy font-bold text-xs uppercase tracking-wider rounded transition-colors"
            >
              Submit Claim Info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
