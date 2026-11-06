import { CheckCircle2 } from 'lucide-react';
import { SHOP_INFO } from '../../content/shop';
import { MEDIA } from '../../content/media';
import { ResponsiveImage } from '../ui/ResponsiveImage';

export const AboutShop = () => {
  return (
    <section id="about" className="py-16 bg-vsand border-b border-slate-300/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest text-vred-ink font-bold mb-1">
            Over {SHOP_INFO.experienceYears.replace('+', '')} Years in Old Town Torrance
          </div>
          <h2 className="font-display text-3xl sm:text-4xl uppercase font-bold text-vnavy tracking-tight">
            A South Bay Landmark Dedicated To Quality
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 font-light leading-relaxed">
            Unlike cold corporate collision chains, Ron's Body Shop was built on traditional pride,
            personal honesty, and authentic automotive heritage. When you walk into our shop, you're
            treated like a neighbor.
          </p>
        </div>

        {/* 2-Column Split: Story & Real Atmosphere Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Authentic Shop Atmosphere Collage (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-3.5">
            {/* Image 1: Vintage Chevy Delivery Truck */}
            <div className="rounded-xl overflow-hidden border border-slate-300 bg-slate-900 shadow-sm relative group">
              <ResponsiveImage
                image={MEDIA.shopFront}
                alt="Ron's Body Shop vintage delivery truck on Cabrillo Ave"
                sizes="(min-width: 1024px) 330px, 50vw"
                className="w-full h-48 sm:h-56 object-cover object-center motion-safe:group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2.5 text-white text-[11px] font-medium">
                1940s Chevy Truck · Cabrillo Ave
              </div>
            </div>

            {/* Image 2: Restored Crown Gasoline Pumps & Waiting Lounge */}
            <div className="rounded-xl overflow-hidden border border-slate-300 bg-slate-900 shadow-sm relative group">
              <ResponsiveImage
                image={MEDIA.customerLounge}
                alt="Customer lounge with restored vintage Crown gasoline pumps"
                sizes="(min-width: 1024px) 330px, 50vw"
                className="w-full h-48 sm:h-56 object-cover object-center motion-safe:group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2.5 text-white text-[11px] font-medium">
                Customer Lounge & Antique Pumps
              </div>
            </div>

            {/* Image 3: Vintage Wurlitzer Jukebox & Coca-Cola Booth */}
            <div className="rounded-xl overflow-hidden border border-slate-300 bg-slate-900 shadow-sm relative group">
              <ResponsiveImage
                image={MEDIA.reception}
                alt="Reception desk and vintage Wurlitzer jukebox"
                sizes="(min-width: 1024px) 330px, 50vw"
                className="w-full h-48 sm:h-56 object-cover object-center motion-safe:group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2.5 text-white text-[11px] font-medium">
                Welcoming Reception Area
              </div>
            </div>

            {/* Image 4: Wall of Accolades & I-CAR Certifications */}
            <div className="rounded-xl overflow-hidden border border-slate-300 bg-slate-900 shadow-sm relative group">
              <ResponsiveImage
                image={MEDIA.awardsWall}
                alt="Wall of certifications and community awards"
                sizes="(min-width: 1024px) 330px, 50vw"
                className="w-full h-48 sm:h-56 object-cover object-center motion-safe:group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2.5 text-white text-[11px] font-medium">
                Decades of Certifications & Awards
              </div>
            </div>
          </div>

          {/* Right Column: Values & Proof (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <h3 className="font-display text-2xl uppercase font-bold text-vnavy">
                Why South Bay Drivers Rely On Ron
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-vred shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">
                      Honest, Straightforward Pricing
                    </strong>
                    No hidden fees or surprise add-ons. We give you a clear written appraisal before
                    work begins.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-vred shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">
                      Precision Alignment & Paint Matching
                    </strong>
                    Our technicians use laser unibody measuring and computerized paint formulation
                    so repairs are seamless.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-vred shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">
                      Full Insurance Claims Assistance
                    </strong>
                    We coordinate directly with your insurance adjuster to ensure all required
                    repairs and proper parts are approved.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-vred shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">
                      Decades of Local Trust
                    </strong>
                    Family-owned and rooted in Torrance since {SHOP_INFO.foundedYear} with an
                    average {SHOP_INFO.rating}-star rating across Google reviews.
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  <span className="font-bold text-vnavy">{SHOP_INFO.address}</span>
                  <br />
                  Old Town Torrance, CA
                </div>
                <a
                  href={`tel:${SHOP_INFO.phoneRaw}`}
                  className="px-4 py-2 bg-vnavy hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors"
                >
                  Call Shop
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
