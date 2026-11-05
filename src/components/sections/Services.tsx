import {
  ShieldCheck,
  Palette,
  Sparkles,
  Wrench,
  Flame,
  ArrowRight,
  Check,
  type LucideIcon,
} from 'lucide-react';
import { CORE_SERVICES, type ServiceId } from '../../content/services';
import { SHOP_INFO } from '../../content/shop';
import { formatHoursShort } from '../../lib/hours';

/**
 * SM-5 — exhaustive service → icon table. `Record<ServiceId, …>` makes adding a
 * service without an icon a compile error; there is no silent default.
 */
const SERVICE_ICON: Record<ServiceId, { Icon: LucideIcon; color: string }> = {
  collision: { Icon: ShieldCheck, color: 'text-vred' },
  paint: { Icon: Palette, color: 'text-vamber' },
  dent: { Icon: Sparkles, color: 'text-vnavy' },
  frame: { Icon: Wrench, color: 'text-vred' },
  classic: { Icon: Flame, color: 'text-vamber' },
};

interface ServicesProps {
  onSelectService: (serviceId: ServiceId) => void;
}

export const Services = ({ onSelectService }: ServicesProps) => {
  return (
    <section id="services" className="py-16 bg-vcream border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-widest text-vred font-bold mb-1">
            What We Do
          </div>
          <h2 className="font-display text-3xl sm:text-4xl uppercase font-bold text-vnavy tracking-tight">
            Auto Body & Repair Services
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 font-light leading-relaxed">
            From minor scratch repair and paintless dent removal to full-frame realignment and
            custom paint, our Torrance facility delivers quality automotive bodywork backed by four
            decades of experience.
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
                    <div className="w-8 h-8 rounded-lg bg-vcream border border-slate-200 flex items-center justify-center">
                      {(() => {
                        const { Icon, color } = SERVICE_ICON[service.id];
                        return (
                          <Icon
                            className={`w-5 h-5 ${color}`}
                            aria-hidden="true"
                            data-icon={service.id}
                          />
                        );
                      })()}
                    </div>
                    <span className="text-xs font-mono font-semibold text-slate-400">
                      0{index + 1}.
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{service.subtitle}</span>
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl font-bold uppercase text-vnavy mt-4 group-hover:text-vred transition-colors">
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
                      <Check
                        className="w-3.5 h-3.5 text-vamber shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
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
                  type="button"
                  onClick={() => onSelectService(service.id)}
                  aria-label={`Get an estimate for ${service.title}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-vnavy hover:text-vred transition-colors"
                >
                  <span>Get Estimate</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}

          {/* Quick Consultation Card */}
          <div className="bg-vnavy text-white rounded-xl border border-vamber/40 p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-vamber font-bold pb-3 border-b border-slate-700">
                Not Sure What You Need?
              </div>
              <h3 className="font-display text-2xl uppercase font-bold text-white mt-4">
                Bring Your Car In For Inspection
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Stop by our Cabrillo Avenue shop for an honest, in-person assessment. We inspect the
                damage, explain your options clearly, and prepare an itemized estimate.
              </p>
              <div className="mt-4 text-xs text-slate-300 space-y-1">
                <div>{SHOP_INFO.fullAddress}</div>
                {SHOP_INFO.hours
                  .filter((h) => h.open)
                  .map((h) => (
                    <div key={h.label}>{formatHoursShort(h)}</div>
                  ))}
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-700">
              <button
                type="button"
                onClick={() => onSelectService('collision')}
                className="w-full py-2.5 bg-vamber hover:bg-vamber-hover text-vnavy font-bold text-xs uppercase tracking-wider rounded transition-colors text-center"
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
