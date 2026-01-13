import { ASSETS } from "../../config/data";
import { MdRadio } from "react-icons/md";

export default function Story() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 wood-texture text-white relative border-y-4 sm:border-y-8 border-gold" id="story">
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 sm:gap-12 md:gap-16 lg:gap-20">
          <div className="w-full lg:w-1/2">
            <div className="relative p-3 sm:p-4 bg-white shadow-2xl rotate-2 max-w-md mx-auto lg:max-w-none">
              <img
                alt="The Shop Interior"
                className="w-full grayscale hover:grayscale-0 transition-all duration-700 border-2 border-slate-200"
                src={ASSETS.STORY_IMG}
              />
              <div className="mt-3 sm:mt-4 text-primary font-retro text-lg sm:text-xl md:text-2xl text-center">
                Circa 1982 - Our Roots
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <MdRadio className="text-gold text-4xl sm:text-5xl md:text-6xl flex-shrink-0" />
              <h2 className="font-retro text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gold">Our Story</h2>
            </div>

            <div className="space-y-4 sm:space-y-5 md:space-y-6 text-base sm:text-lg md:text-xl leading-relaxed font-light italic opacity-95">
              <p>
                Walk into Ron&apos;s and you step back in time. Our workshop isn&apos;t just a place
                of business; it&apos;s a sanctuary for chrome and steel. Between the glowing neon of
                our vintage jukebox and the towering blue crown gas pumps, we practice the dying arts
                of the automotive world.
              </p>
              <p>
                Born from a single workbench and a love for the &apos;57 Chevy, we&apos;ve spent over
                four decades perfecting the techniques that made the 50s and 60s the peak of American
                design. Every car that leaves our shop carries a piece of that heritage.
              </p>
              <p>
                Where satisfaction is a tradition.
                We strive on putting peoples dreams in peoples driveways. Repairs aren&apos;t
                expensive—they are priceless.
              </p>
            </div>

            <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div className="border-l-4 border-accent pl-4 sm:pl-6 bg-primary/40 p-3 sm:p-4">
                <span className="block font-display text-3xl sm:text-4xl text-gold">40+</span>
                <span className="uppercase tracking-widest text-xs font-bold text-slate-300">
                  Years of Heritage
                </span>
              </div>
              <div className="border-l-4 border-gold pl-4 sm:pl-6 bg-primary/40 p-3 sm:p-4">
                <span className="block font-display text-3xl sm:text-4xl text-gold">I-CAR</span>
                <span className="uppercase tracking-widest text-xs font-bold text-slate-300">
                  Certified Team
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
