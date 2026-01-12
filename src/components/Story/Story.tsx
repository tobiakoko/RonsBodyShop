import { ASSETS } from "../../config/data";
import { MdRadio } from "react-icons/md";

export default function Story() {
  return (
    <section className="py-24 wood-texture text-white relative border-y-8 border-gold" id="story">
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2">
            <div className="relative p-4 bg-white shadow-2xl rotate-2">
              <img
                alt="The Shop Interior"
                className="w-full grayscale hover:grayscale-0 transition-all duration-700 border-2 border-slate-200"
                src={ASSETS.STORY_IMG}
              />
              <div className="mt-4 text-primary font-retro text-2xl text-center">
                Circa 1982 - Our Roots
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="flex items-center gap-4 mb-8">
              <MdRadio className="text-gold text-6xl" />
              <h2 className="font-retro text-6xl text-gold">Our Story</h2>
            </div>

            <div className="space-y-6 text-xl leading-relaxed font-light italic opacity-95">
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

            <div className="mt-12 grid grid-cols-2 gap-8">
              <div className="border-l-4 border-accent pl-6 bg-primary/40 p-4">
                <span className="block font-display text-4xl text-gold">40+</span>
                <span className="uppercase tracking-widest text-xs font-bold text-slate-300">
                  Years of Heritage
                </span>
              </div>
              <div className="border-l-4 border-gold pl-6 bg-primary/40 p-4">
                <span className="block font-display text-4xl text-gold">I-CAR</span>
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
