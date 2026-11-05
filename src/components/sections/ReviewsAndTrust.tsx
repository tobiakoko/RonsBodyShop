import { Star, CheckCircle2 } from 'lucide-react';
import { REAL_REVIEWS, SHOP_INFO } from '../../content/shop';

export const ReviewsAndTrust = () => {
  return (
    <section id="reviews" className="py-16 bg-vcream border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with Verified 4.7 Rating */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-vred font-bold mb-1">
              Verified Reputation
            </div>
            <h2 className="font-display text-3xl sm:text-4xl uppercase font-bold text-vnavy tracking-tight">
              Customer Feedback & Reviews
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 font-light max-w-xl">
              Real feedback from local drivers in Torrance and the South Bay who depend on Ron's Body Shop for quality repairs and honest service.
            </p>
          </div>

          {/* Verified Google Rating Box (Truthful 4.7) */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm flex items-center gap-4 shrink-0">
            <div className="text-center pr-4 border-r border-slate-100">
              <div className="font-display text-4xl font-bold text-vnavy">{SHOP_INFO.rating}</div>
              <div className="flex items-center gap-0.5 text-vamber mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                ))}
              </div>
            </div>
            <div className="text-xs text-slate-600 space-y-0.5">
              <div className="font-bold text-vnavy">Google Rating</div>
              <div>Based on {SHOP_INFO.reviewCount} customer reviews</div>
              <div className="text-[11px] text-slate-400">{SHOP_INFO.city}, {SHOP_INFO.state} · Since {SHOP_INFO.foundedYear}</div>
            </div>
          </div>
        </div>

        {/* 3 Review Cards (Verified Real Review Themes) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REAL_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:border-slate-300 transition-colors"
            >
              <div>
                {/* Header: Stars + Source */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                  <div className="flex items-center text-vamber">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <span className="text-slate-400 font-medium text-[11px]">
                    {review.source}
                  </span>
                </div>

                {/* Body Quote */}
                <p className="text-xs sm:text-sm text-slate-700 mt-4 leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>

              {/* Author & Repair Detail */}
              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs uppercase text-vnavy font-display">
                    {review.author}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {review.detail}
                  </div>
                </div>
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Credentials Strip */}
        <div className="mt-12 py-5 px-6 bg-white border border-slate-200 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs">
          <div>
            <div className="font-display text-lg font-bold text-vnavy">{SHOP_INFO.experienceYears} YEARS</div>
            <div className="text-slate-500 text-[11px] mt-0.5">Torrance Heritage</div>
          </div>
          <div>
            <div className="font-display text-lg font-bold text-vnavy">I-CAR TRAINED</div>
            <div className="text-slate-500 text-[11px] mt-0.5">Technicians</div>
          </div>
          <div>
            <div className="font-display text-lg font-bold text-vnavy">ALL INSURANCES</div>
            <div className="text-slate-500 text-[11px] mt-0.5">Accepted & Handled</div>
          </div>
          <div>
            <div className="font-display text-lg font-bold text-vnavy">FREE ESTIMATES</div>
            <div className="text-slate-500 text-[11px] mt-0.5">In-Person & Online</div>
          </div>
        </div>

      </div>
    </section>
  );
};
