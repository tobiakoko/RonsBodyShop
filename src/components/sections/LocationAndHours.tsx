import { Clock, Navigation, CheckCircle2, Send, Car, Loader2 } from 'lucide-react';
import { SHOP_INFO } from '../../content/shop';
import { formatHours } from '../../lib/hours';
import { useShopStatus } from '../../lib/useShopStatus';
import { useLeadForm } from '../../lib/useLeadForm';
import { messageSchema } from '../../lib/validation';
import { FormField } from '../ui/FormField';
import { inputClass } from '../ui/formStyles';
import { SubmitErrorNotice } from '../ui/SubmitErrorNotice';
import { TurnstileWidget } from '../ui/Turnstile';
import { useTurnstile } from '../ui/useTurnstile';

const INITIAL_MESSAGE = { name: '', contact: '', message: '', consent: false, company: '' };

export const LocationAndHours = () => {
  const status = useShopStatus();
  const turnstile = useTurnstile();
  const form = useLeadForm({
    kind: 'message',
    schema: messageSchema,
    initial: INITIAL_MESSAGE,
    getToken: turnstile.getToken,
  });
  const { data, errors, state } = form;
  const submitting = state.status === 'submitting';

  return (
    <section id="contact" className="py-20 bg-vsand border-b border-slate-300/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-widest text-vred-ink font-bold mb-2">
            Old Town Torrance, California
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase font-bold text-vnavy tracking-tight">
            Visit Our Shop & Reception
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base font-light">
            Conveniently located on Cabrillo Avenue in historic Old Town Torrance with easy access
            from the 110, 405, and Hawthorne Boulevard.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Business Details & Hours (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Hours and Live Status Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 font-display text-xl uppercase font-bold text-vnavy">
                  <Clock className="w-5 h-5 text-vamber" aria-hidden="true" />
                  <span>Shop Operating Hours</span>
                </div>
                {/* Live Status indicator */}
                <div className="text-right">
                  <span
                    className={`text-xs font-bold uppercase tracking-wide ${status.isOpen ? 'text-emerald-700' : 'text-slate-600'}`}
                  >
                    {status.phase === 'unknown'
                      ? 'Open Weekdays'
                      : status.isOpen
                        ? '● Open Now'
                        : '○ Currently Closed'}
                  </span>
                  <div className="text-[11px] text-slate-500">{status.text}</div>
                  <div className="text-[11px] text-slate-500">{status.subtext}</div>
                </div>
              </div>

              <div className="mt-4 space-y-2.5 text-sm">
                {SHOP_INFO.hours.map((h) => (
                  <div
                    key={h.label}
                    className="flex items-center justify-between py-1 border-b border-slate-50 last:border-0"
                  >
                    <span className="font-semibold text-slate-800">{h.label}</span>
                    <span className="text-slate-600 font-mono text-xs tabular-nums">
                      {formatHours(h)}
                    </span>
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
                <div className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-1">
                  Physical Address
                </div>
                <div className="font-bold text-slate-900 text-base font-display uppercase">
                  {SHOP_INFO.name}
                </div>
                <p className="text-sm text-slate-600 mt-1 leading-snug">
                  {SHOP_INFO.address}
                  <br />
                  {SHOP_INFO.city}, {SHOP_INFO.state} {SHOP_INFO.zip}
                </p>
                <div className="mt-3">
                  <a
                    href={SHOP_INFO.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-vred-ink hover:underline"
                  >
                    <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Open in Google Maps →</span>
                  </a>
                </div>
              </div>

              <div>
                <div className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-1">
                  Direct Inquiries
                </div>
                <div className="space-y-2 mt-1">
                  <div>
                    <span className="text-xs text-slate-500 block">Telephone:</span>
                    <a
                      href={`tel:${SHOP_INFO.phoneRaw}`}
                      className="font-bold text-base text-vnavy hover:text-vamber transition-colors"
                    >
                      {SHOP_INFO.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Email:</span>
                    <a
                      href={`mailto:${SHOP_INFO.email}`}
                      className="text-xs text-slate-700 hover:text-vnavy font-mono break-all"
                    >
                      {SHOP_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Parking & Dropoff Info */}
            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-3">
              <Car className="w-5 h-5 text-vamber shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong className="font-bold">Convenient Parking & Customer Access:</strong> Ample
                parking directly in front on Cabrillo Avenue as well as our private customer
                inspection bay inside the entrance.
              </div>
            </div>
          </div>

          {/* Right Column: Direct Quick Message Box (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-sm">
            <h3 className="font-display text-2xl uppercase font-bold text-vnavy">
              Quick Message to Ron
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-5">
              Have a question regarding restoration, insurance, or general collision inquiries? Drop
              us a quick note.
            </p>

            <div aria-live="polite">
              {state.status === 'success' ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" aria-hidden="true" />
                  <h4 className="font-display text-xl font-bold uppercase text-emerald-900">
                    Message Dispatched!
                  </h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Thank you, {data.name}. Ron's front office has your message
                    {state.reference ? ` (ref. ${state.reference})` : ''} and will get back to you
                    promptly.
                  </p>
                  <button
                    type="button"
                    onClick={form.reset}
                    className="text-xs font-semibold text-emerald-900 underline mt-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={form.handleSubmit} noValidate className="space-y-4">
                  <div
                    aria-hidden="true"
                    className="absolute -left-[9999px] w-px h-px overflow-hidden"
                  >
                    <label>
                      Company
                      <input
                        type="text"
                        name="company"
                        tabIndex={-1}
                        autoComplete="off"
                        value={data.company}
                        onChange={form.handleChange}
                      />
                    </label>
                  </div>

                  <FormField id="qm-name" label="Your Name" required error={errors.name}>
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      value={data.name}
                      onChange={form.handleChange}
                      className={inputClass(!!errors.name)}
                    />
                  </FormField>

                  <FormField id="qm-contact" label="Phone or Email" required error={errors.contact}>
                    <input
                      type="text"
                      name="contact"
                      autoComplete="tel"
                      placeholder="(310) 555-0199 or you@example.com"
                      value={data.contact}
                      onChange={form.handleChange}
                      className={inputClass(!!errors.contact)}
                    />
                  </FormField>

                  <FormField
                    id="qm-message"
                    label="How Can We Assist?"
                    required
                    error={errors.message}
                  >
                    <textarea
                      rows={4}
                      name="message"
                      placeholder="Tell us about your vehicle, insurance situation, or what you need…"
                      value={data.message}
                      onChange={form.handleChange}
                      className={inputClass(!!errors.message)}
                    />
                  </FormField>

                  <div>
                    <div className="flex items-start gap-2.5">
                      <input
                        id="qm-consent"
                        type="checkbox"
                        name="consent"
                        checked={data.consent}
                        onChange={form.handleChange}
                        aria-invalid={errors.consent ? true : undefined}
                        aria-describedby={errors.consent ? 'qm-consent-error' : undefined}
                        className="mt-0.5 w-4 h-4 accent-vnavy"
                      />
                      <label
                        htmlFor="qm-consent"
                        className="text-xs text-slate-700 leading-relaxed"
                      >
                        I agree that {SHOP_INFO.name} may use this information to respond to my
                        message.{' '}
                        <span className="text-vred-ink" aria-hidden="true">
                          *
                        </span>
                      </label>
                    </div>
                    {errors.consent && (
                      <p id="qm-consent-error" className="mt-1 text-xs font-medium text-vred-ink">
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  <TurnstileWidget onToken={turnstile.setToken} />

                  {state.status === 'error' && <SubmitErrorNotice message={state.message} />}

                  <button
                    type="submit"
                    disabled={submitting}
                    aria-busy={submitting}
                    className="w-full py-3 bg-vnavy hover:bg-vnavy-dark text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-wait"
                  >
                    {submitting ? (
                      <Loader2
                        className="w-4 h-4 text-vamber motion-safe:animate-spin"
                        aria-hidden="true"
                      />
                    ) : (
                      <Send className="w-4 h-4 text-vamber" aria-hidden="true" />
                    )}
                    <span>{submitting ? 'Sending…' : 'Send Direct Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
