import React from 'react';
import { Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { SHOP_INFO, HOW_IT_WORKS_STEPS } from '../../content/shop';

interface HowItWorksProps {
  onOpenEstimate: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenEstimate }) => {
  return (
    <section id="how-it-works" className="py-14 bg-vsand border-b border-slate-300/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-widest text-vred font-bold mb-1">
            Simple & Transparent Process
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase font-bold text-vnavy tracking-tight">
            How To Get Your Vehicle Repaired
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-light">
            We make collision repair and bodywork straightforward from first contact to final delivery.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOW_IT_WORKS_STEPS.map((item, idx) => (
            <div
              key={item.step}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm relative group hover:border-vnavy/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <span className="font-display text-2xl font-bold text-vamber">
                    STEP {item.step}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Phase {idx + 1} of 3
                  </span>
                </div>

                <h3 className="font-display text-xl uppercase font-bold text-vnavy">
                  {item.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 text-xs font-semibold text-vnavy">
                {idx === 0 && (
                  <button
                    onClick={onOpenEstimate}
                    className="inline-flex items-center gap-1.5 text-vred hover:underline"
                  >
                    <span>Request estimate online</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                {idx === 1 && (
                  <span className="text-slate-500">
                    We handle adjuster supplements directly
                  </span>
                )}
                {idx === 2 && (
                  <span className="text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Complete safety & paint inspection
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Direct Action Strip */}
        <div className="mt-8 bg-white rounded-xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-vnavy text-vamber flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500">Need Immediate Help or Towing Advice?</div>
              <div className="font-bold text-base text-vnavy">
                Call Our Shop: <a href={`tel:${SHOP_INFO.phoneRaw}`} className="text-vred hover:underline">{SHOP_INFO.phone}</a>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onOpenEstimate}
              className="w-full sm:w-auto px-5 py-2.5 bg-vnavy hover:bg-vnavy-dark text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors"
            >
              Get Free Estimate
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
