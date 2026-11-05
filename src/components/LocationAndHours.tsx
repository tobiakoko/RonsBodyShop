import React, { useState, useMemo } from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, CheckCircle2, Send, Car } from 'lucide-react';
import { SHOP_INFO } from '../data/shopData';

export const LocationAndHours: React.FC = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Pacific Time open/closed calculation
  const status = useMemo(() => {
    try {
      const now = new Date();
      const ptString = now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
      const ptDate = new Date(ptString);
      const day = ptDate.getDay();
      const hour = ptDate.getHours() + ptDate.getMinutes() / 60;

      if (day === 0) {
        return { isOpen: false, text: "Closed on Sundays", subtext: "Opens Monday at 8:00 AM" };
      } else if (day >= 1 && day <= 5) {
        if (hour >= 8 && hour < 17.5) {
          return { isOpen: true, text: "Open Today until 5:30 PM", subtext: "Walk-ins & Drop-offs Welcome" };
        } else if (hour < 8) {
          return { isOpen: false, text: "Opens Today at 8:00 AM", subtext: "Mon–Fri Schedule" };
        } else {
          return { isOpen: false, text: "Closed for the Evening", subtext: "Opens Tomorrow at 8:00 AM" };
        }
      } else if (day === 6) {
        if (hour >= 8 && hour < 12) {
          return { isOpen: true, text: "Open Saturday until 12:00 PM", subtext: "Morning Estimates & Pickups" };
        } else {
          return { isOpen: false, text: "Closed for the Weekend", subtext: "Opens Monday at 8:00 AM" };
        }
      }
    } catch {
      // Fallback
    }
    return { isOpen: true, text: "Open Mon–Fri: 8am–5:30pm", subtext: "Sat: 8am–12pm" };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-[#F3EFE6] border-b border-slate-300/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-widest text-[#D83A27] font-bold mb-2">
            Old Town Torrance, California
          </div>
          <h2 className="font-['Oswald'] text-3xl sm:text-4xl lg:text-5xl uppercase font-bold text-[#16203B] tracking-tight">
            Visit Our Shop & Reception
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base font-light">
            Conveniently located on Cabrillo Avenue in historic Old Town Torrance with easy access from the 110, 405, and Hawthorne Boulevard.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Business Details & Hours (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Hours and Live Status Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 font-['Oswald'] text-xl uppercase font-bold text-[#16203B]">
                  <Clock className="w-5 h-5 text-[#E7A622]" />
                  <span>Shop Operating Hours</span>
                </div>
                {/* Live Status indicator */}
                <div className="text-right">
                  <span className={`text-xs font-bold uppercase tracking-wide ${status.isOpen ? 'text-emerald-700' : 'text-slate-600'}`}>
                    {status.isOpen ? '● Open Now' : '○ Currently Closed'}
                  </span>
                  <div className="text-[11px] text-slate-500">{status.text}</div>
                </div>
              </div>

              <div className="mt-4 space-y-2.5 text-sm">
                {SHOP_INFO.hours.map((h, i) => (
                  <div key={i} className="flex items-center justify-between py-1 border-b border-slate-50 last:border-0">
                    <span className="font-semibold text-slate-800">{h.day}</span>
                    <span className="text-slate-600 font-mono text-xs tabular-nums">{h.time}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
                * After-hours vehicle drop-off and key drop-box available 24/7.
              </div>
            </div>

            {/* Contact Details & Address Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">
                  Physical Address
                </div>
                <div className="font-bold text-slate-900 text-base font-['Oswald'] uppercase">
                  {SHOP_INFO.name}
                </div>
                <p className="text-sm text-slate-600 mt-1 leading-snug">
                  1324 Cabrillo Ave<br />
                  Torrance, CA 90501
                </p>
                <div className="mt-3">
                  <a
                    href={SHOP_INFO.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D83A27] hover:underline"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Google Maps →</span>
                  </a>
                </div>
              </div>

              <div>
                <div className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">
                  Direct Inquiries
                </div>
                <div className="space-y-2 mt-1">
                  <div>
                    <span className="text-xs text-slate-500 block">Telephone:</span>
                    <a 
                      href={`tel:${SHOP_INFO.phoneRaw}`}
                      className="font-bold text-base text-[#16203B] hover:text-[#E7A622] transition-colors"
                    >
                      {SHOP_INFO.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Email:</span>
                    <a 
                      href={`mailto:${SHOP_INFO.email}`}
                      className="text-xs text-slate-700 hover:text-[#16203B] font-mono break-all"
                    >
                      {SHOP_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Parking & Dropoff Info */}
            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-3">
              <Car className="w-5 h-5 text-[#E7A622] shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Convenient Parking & Customer Access:</strong> Ample parking directly in front on Cabrillo Avenue as well as our private customer inspection bay inside the entrance.
              </div>
            </div>

          </div>

          {/* Right Column: Direct Quick Message Box (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-sm">
            <h3 className="font-['Oswald'] text-2xl uppercase font-bold text-[#16203B]">
              Quick Message to Ron
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-5">
              Have a question regarding restoration, insurance, or general collision inquiries? Drop us a quick note.
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-['Oswald'] text-xl font-bold uppercase text-emerald-900">
                  Message Dispatched!
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Thank you! Ron's front office team has received your inquiry and will reach back out promptly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="text-xs font-semibold text-emerald-900 underline mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. John Davis"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#16203B]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Phone or Email
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. (310) 555-0199 or email"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#16203B]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    How Can We Assist?
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your vehicle, insurance situation, or what you need..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#16203B]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#16203B] hover:bg-[#0F1626] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#E7A622]" />
                  <span>Send Direct Message</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
