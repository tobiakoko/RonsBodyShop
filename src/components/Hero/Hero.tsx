import { ASSETS } from "../../config/data";
import { MdSettingsSuggest, MdLocalGasStation } from "react-icons/md";

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] md:h-[85vh] flex items-center overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 md:via-primary/40 to-primary/50 md:to-transparent" />
      </figure>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-12 md:py-0">
        <div className="max-w-3xl">
          <div className="inline-block bg-accent text-white font-display px-3 py-1 sm:px-4 sm:py-1.5 mb-4 sm:mb-6 enamel-button text-xs sm:text-sm">
            ESTABLISHED 1982  •  I-CAR CERTIFIED
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-gold mb-4 sm:mb-6 leading-tight drop-shadow-[3px_3px_0px_#d64436] md:drop-shadow-[4px_4px_0px_#d64436]">
            QUALITY <br />
            <span className="text-white">WITHOUT COMPROMISE</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-slate-100 mb-6 sm:mb-8 md:mb-10 font-retro tracking-wide max-w-xl">
            Where satisfaction is a tradition.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
            <a
              className="enamel-button bg-gold text-primary px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-sm font-display tracking-widest text-sm sm:text-base md:text-lg hover:brightness-105 flex items-center justify-center gap-2 sm:gap-3"
              href="#services"
            >
              OUR SPECIALTIES <MdSettingsSuggest />
            </a>

            <a
              className="enamel-button bg-white text-primary px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-sm font-display tracking-widest text-sm sm:text-base md:text-lg hover:bg-slate-100 text-center"
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
