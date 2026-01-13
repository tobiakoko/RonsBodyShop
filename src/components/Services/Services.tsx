import { SERVICES } from "../../config/data";
import {
  MdStar,
  MdAutoFixHigh,
  MdHandyman,
  MdFormatPaint,
  MdCheckBox,
} from "react-icons/md";

function ServiceIcon({ name }: { name: "auto_fix" | "handyman" | "format_paint" }) {
  if (name === "auto_fix") return <MdAutoFixHigh className="text-5xl" />;
  if (name === "handyman") return <MdHandyman className="text-5xl" />;
  return <MdFormatPaint className="text-5xl" />;
}

function toneClass(tone: "accent" | "primary" | "gold") {
  if (tone === "accent") return "text-accent";
  if (tone === "primary") return "text-primary";
  return "text-gold";
}

export default function Services() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 brick-wall relative" id="services">
      <div className="absolute top-0 left-0 w-full h-4 bg-primary" />
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-primary mb-3 sm:mb-4 drop-shadow-md">
            EXPERT CRAFTSMANSHIP
          </h2>
          <div className="flex justify-center items-center gap-3 sm:gap-4">
            <div className="w-12 sm:w-16 md:w-20 h-1.5 bg-accent" />
            <MdStar className="text-gold text-2xl sm:text-3xl" />
            <div className="w-12 sm:w-16 md:w-20 h-1.5 bg-accent" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className={`bg-white p-6 sm:p-8 border-4 border-primary ${s.cardShadowClassName} group`}
            >
              <div className={s.iconWrapClassName}>
                <ServiceIcon name={s.icon} />
              </div>

              <h3 className="font-display text-xl sm:text-2xl text-primary mb-3 sm:mb-4 border-b-2 border-slate-100 pb-2">
                {s.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-700 mb-4 sm:mb-6 leading-relaxed">{s.description}</p>

              <ul className="space-y-2 sm:space-y-3 font-semibold text-sm sm:text-base text-slate-600">
                {s.checks.map((c) => (
                  <li key={c.text} className="flex items-start gap-2">
                    <MdCheckBox className={`${toneClass(c.iconTone)} text-lg sm:text-xl flex-shrink-0 mt-0.5`} />
                    <span>{c.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
