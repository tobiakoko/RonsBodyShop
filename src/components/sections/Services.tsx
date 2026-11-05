import React from 'react';
import { ShieldCheck, Palette, Sparkles, Wrench, Flame, ArrowRight, Check } from 'lucide-react';
import { CORE_SERVICES } from '../../content/shop';

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'collision': return <ShieldCheck className="w-5 h-5 text-[#D83A27]" />;
      case 'paint': return <Palette className="w-5 h-5 text-[#E7A622]" />;
      case 'dent': return <Sparkles className="w-5 h-5 text-[#16203B]" />;
      case 'frame': return <Wrench className="w-5 h-5 text-[#D83A27]" />;
      case 'classic': return <Flame className="w-5 h-5 text-[#E7A622]" />;
      default: return <Wrench className="w-5 h-5 text-[#16203B]" />;
    }
  };

  return (
    <section id="services" className="py-16 bg-[#FAF7F2] border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-widest text-[#D83A27] font-bold mb-1">
            What We Do
          </div>
          <h2 className="font-['Oswald'] text-3xl sm:text-4xl uppercase font-bold text-[#16203B] tracking-tight">
            Auto Body & Repair Services
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 font-light leading-relaxed">
            From minor scratch repair and paintless dent removal to full-frame realignment and custom paint, our Torrance facility delivers quality automotive bodywork backed by four decades of experience.
          </p>
        </div>

        {/* Services Grid (5 Verified Services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-400 hover:shadow-md transition-all duration-200 group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-slate-200 flex items-center justify-center">
                      {getIcon(service.id)}
                    </div>
                    <span className="text-xs font-mono font-semibold text-slate-400">
                      0{index + 1}.
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {service.subtitle}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-['Oswald'] text-2xl font-bold uppercase text-[#16203B] mt-4 group-hover:text-[#D83A27] transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {service.description}
                </p>

                {/* Key Bullet Features */}
                <ul className="mt-4 space-y-1.5 text-xs text-slate-700">
                  {service.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#E7A622] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  Free Estimates Available
                </span>
                <button
                  onClick={() => onSelectService(service.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16203B] hover:text-[#D83A27] transition-colors"
                >
                  <span>Select Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {/* Quick Consultation Card */}
          <div className="bg-[#16203B] text-white rounded-xl border border-[#E7A622]/40 p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#E7A622] font-bold pb-3 border-b border-slate-700">
                Not Sure What You Need?
              </div>
              <h3 className="font-['Oswald'] text-2xl uppercase font-bold text-white mt-4">
                Bring Your Car In For Inspection
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Stop by our Cabrillo Avenue shop for an honest, in-person assessment. We inspect the damage, explain your options clearly, and prepare an itemized estimate.
              </p>
              <div className="mt-4 text-xs text-slate-300 space-y-1">
                <div>📍 1324 Cabrillo Ave, Torrance, CA</div>
                <div>⏱ Mon–Fri: 8:00 AM – 5:30 PM</div>
                <div>⏱ Sat: 8:00 AM – 12:00 PM</div>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-700">
              <button
                onClick={() => onSelectService('collision')}
                className="w-full py-2.5 bg-[#E7A622] hover:bg-[#D3951B] text-[#16203B] font-bold text-xs uppercase tracking-wider rounded transition-colors text-center"
              >
                Start Online Estimate
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
