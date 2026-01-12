import { ASSETS } from "../../config/data";
import { MdSettingsSuggest, MdLocalGasStation } from "react-icons/md";

export default function Hero() {
  return (
    <section className="relative h-[85vh] flex items-center overflow-hidden">
      {/* Background media */}
      <figure className="absolute inset-0 z-0 m-0">
        <video
          className="w-full h-full object-cover"
          src={ASSETS.HERO_BG}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent" />
      </figure>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-block bg-accent text-white font-display px-4 py-1 mb-6 enamel-button">
            ESTABLISHED 1982  •  I-CAR CERTIFIED
          </div>

          <h1 className="font-display text-6xl md:text-8xl text-gold mb-6 leading-none drop-shadow-[4px_4px_0px_#d64436]">
            QUALITY <br />
            <span className="text-white">WITHOUT COMPROMISE</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-100 mb-10 font-retro tracking-wide max-w-xl">
            Where satisfaction is a tradition.
          </p>

          <div className="flex flex-wrap gap-6">
            <a
              className="enamel-button bg-gold text-primary px-10 py-4 rounded-sm font-display tracking-widest text-lg hover:brightness-105 flex items-center gap-3"
              href="#services"
            >
              OUR SPECIALTIES <MdSettingsSuggest />
            </a>

            <a
              className="enamel-button bg-white text-primary px-10 py-4 rounded-sm font-display tracking-widest text-lg hover:bg-slate-100"
              href="#contact"
            >
              FREE ESTIMATE
            </a>
          </div>
        </div>
      </div>

      <div className="absolute right-10 bottom-10 hidden lg:block opacity-20">
        <MdLocalGasStation className="text-[200px] text-gold" />
      </div>
    </section>
  );
}
