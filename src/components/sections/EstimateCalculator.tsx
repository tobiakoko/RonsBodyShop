import { useEffect, useId, useReducer, useRef, type ReactNode } from 'react';
import { ArrowRight, Check, Loader2, Phone, Shield, X } from 'lucide-react';
import { SHOP_INFO, INSURANCE_PARTNERS } from '../../content/shop';
import { CORE_SERVICES, type ServiceId } from '../../content/services';
import {
  STEPS,
  estimateReducer,
  initialWizardState,
  type EstimateData,
  type EstimateField,
  type Step,
} from '../../lib/estimateWizard';
import { formatHoursShort } from '../../lib/hours';
import { submitLead } from '../../lib/submitLead';
import { FormField } from '../ui/FormField';
import { inputClass } from '../ui/formStyles';
import { SubmitErrorNotice } from '../ui/SubmitErrorNotice';
import { TurnstileWidget } from '../ui/Turnstile';
import { useTurnstile } from '../ui/useTurnstile';

const POPULAR_MAKES = [
  'Toyota',
  'Honda',
  'Ford',
  'Chevrolet',
  'Mercedes-Benz',
  'BMW',
  'Lexus',
  'Nissan',
  'Classic / Custom',
];

interface EstimateCalculatorProps {
  isModal?: boolean;
  onClose?: () => void;
  /** Pre-select a damage type, e.g. from the Services section. `nonce` lets the same id re-trigger. */
  preselect?: { id: ServiceId; nonce: number };
}

/**
 * Renders inline (`<section id="estimate">`) and as a modal. The two instances
 * keep independent wizard state on purpose — they are alternate entry points.
 */
export const EstimateCalculator = ({
  isModal = false,
  onClose,
  preselect,
}: EstimateCalculatorProps) => {
  const [state, dispatch] = useReducer(estimateReducer, preselect?.id ?? '', initialWizardState);
  const { status, step, data, errors } = state;
  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;
  const titleId = fid('title');
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const turnstile = useTurnstile();

  const set = <K extends EstimateField>(key: K, value: EstimateData[K]) =>
    dispatch({ type: 'FIELD', key, value });

  // Services section → pre-fill the damage type.
  useEffect(() => {
    if (preselect) dispatch({ type: 'FIELD', key: 'damageType', value: preselect.id });
  }, [preselect]);

  // Move focus to the step heading when the step changes (skip first render).
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    stepHeading.current?.focus();
  }, [step]);

  // Side effect of entering `submitting`: perform the real network call.
  useEffect(() => {
    if (status !== 'submitting') return;
    let active = true;
    submitLead('estimate', data, turnstile.getToken())
      .then(({ reference }) => active && dispatch({ type: 'RESOLVED', ticket: reference }))
      .catch(
        (err: unknown) =>
          active &&
          dispatch({ type: 'REJECTED', message: err instanceof Error ? err.message : '' }),
      );
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire once per entry into `submitting`
  }, [status]);

  const selectedService = CORE_SERVICES.find((s) => s.id === data.damageType);
  const submitting = status === 'submitting';
  const weekdayHours = SHOP_INFO.hours[0];

  const content = (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Header banner */}
      <div className="bg-vnavy text-white p-5 sm:p-6 border-b-2 border-vamber">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-vamber">
              Free Online Estimate
            </span>
            <h2
              id={titleId}
              className="font-display text-2xl sm:text-3xl uppercase font-bold text-white mt-0.5"
            >
              Request Your Free Estimate
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Takes under 2 minutes. Ron's estimators will call you back with next steps.
            </p>
          </div>
          {isModal && onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close estimate form"
              className="text-slate-300 hover:text-white p-2 rounded-md transition-colors"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Step indicator, rendered from STEPS */}
        {status !== 'success' && (
          <ol className="mt-5 grid grid-cols-4 gap-2 text-xs font-semibold" aria-label="Progress">
            {STEPS.map((s) => {
              const reached = step >= s.n;
              const canJump = s.n < step && !submitting;
              const label = `${s.n}. ${s.label}`;
              return (
                <li
                  key={s.n}
                  aria-current={step === s.n ? 'step' : undefined}
                  className={`pb-1.5 border-b-2 transition-colors ${
                    reached ? 'border-vamber text-vamber' : 'border-slate-700 text-slate-400'
                  }`}
                >
                  {canJump ? (
                    <button
                      type="button"
                      className="hover:underline"
                      onClick={() => dispatch({ type: 'GOTO', step: s.n })}
                    >
                      {label}
                    </button>
                  ) : (
                    label
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </div>

      <div className="p-5 sm:p-8" aria-live="polite">
        {status === 'success' ? (
          <div className="text-center py-8 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <Check className="w-8 h-8 stroke-[2.5]" aria-hidden="true" />
            </div>
            <span className="text-xs uppercase font-bold tracking-widest text-vnavy">
              Estimate Request Received
            </span>
            <h3 className="font-display text-3xl font-bold uppercase text-slate-900">
              Reference #{state.ticket}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Thank you, <strong className="text-slate-900">{data.contactName}</strong>. We've
              received your {data.vehicleYear} {data.vehicleMake} details and will call you at{' '}
              <strong className="text-slate-900">{data.contactPhone}</strong> within 1–2 business
              hours.
            </p>

            <div className="p-4 bg-vcream border border-amber-200/80 rounded-lg text-left text-xs space-y-2 text-slate-700">
              <div className="font-semibold text-vnavy flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-vamber" aria-hidden="true" />
                Next Steps with {SHOP_INFO.name}:
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                <li>
                  Have photos of the damage? Text them to {SHOP_INFO.phone} with your reference
                  number.
                </li>
                <li>
                  If using insurance, we handle adjuster communication and supplemental filings
                  directly.
                </li>
                <li>Drop-offs welcome {formatHoursShort(weekdayHours)}.</li>
              </ul>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`tel:${SHOP_INFO.phoneRaw}`}
                className="w-full sm:w-auto px-5 py-2.5 bg-vnavy text-white font-semibold rounded-md text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-vamber" aria-hidden="true" />
                <span>Call Shop Directly: {SHOP_INFO.phone}</span>
              </a>
              <button
                type="button"
                onClick={() => dispatch({ type: 'RESET' })}
                className="w-full sm:w-auto px-4 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-md text-sm hover:bg-slate-50"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <form
            noValidate
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(step === 4 ? { type: 'SUBMIT' } : { type: 'NEXT' });
            }}
          >
            {/* Honeypot — hidden from humans and assistive tech */}
            <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
              <label>
                Company
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={data.company}
                  onChange={(e) => set('company', e.target.value)}
                />
              </label>
            </div>

            {step === 1 && (
              <StepFrame headingRef={stepHeading} title="Select Type of Damage or Project">
                <div
                  role="radiogroup"
                  aria-label="Type of damage or project"
                  aria-describedby={errors.damageType ? fid('damage-error') : undefined}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {CORE_SERVICES.map((opt) => {
                    const selected = data.damageType === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => set('damageType', opt.id)}
                        className={`text-left p-4 rounded-lg border transition-all ${
                          selected
                            ? 'border-vnavy bg-slate-50 ring-2 ring-vamber'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-sm">
                            {opt.wizardLabel}
                          </span>
                          {selected && (
                            <span
                              className="w-5 h-5 rounded-full bg-vnavy text-vamber flex items-center justify-center"
                              aria-hidden="true"
                            >
                              <Check className="w-3 h-3" aria-hidden="true" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{opt.wizardDesc}</p>
                      </button>
                    );
                  })}
                </div>
                {errors.damageType && (
                  <p id={fid('damage-error')} className="text-xs font-medium text-vred">
                    {errors.damageType}
                  </p>
                )}
                <StepNav step={step} onBack={() => dispatch({ type: 'BACK' })} />
              </StepFrame>
            )}

            {step === 2 && (
              <StepFrame headingRef={stepHeading} title="Vehicle Details">
                <div className="flex flex-wrap gap-2" aria-label="Popular makes">
                  {POPULAR_MAKES.map((make) => (
                    <button
                      key={make}
                      type="button"
                      aria-pressed={data.vehicleMake === make}
                      onClick={() => set('vehicleMake', make)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
                        data.vehicleMake === make
                          ? 'bg-vnavy text-white border-vnavy'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {make}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormField id={fid('make')} label="Make" required error={errors.vehicleMake}>
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="e.g. Toyota"
                      value={data.vehicleMake}
                      onChange={(e) => set('vehicleMake', e.target.value)}
                      className={inputClass(!!errors.vehicleMake)}
                    />
                  </FormField>
                  <FormField
                    id={fid('model')}
                    label="Model / Trim"
                    required
                    error={errors.vehicleModel}
                  >
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="e.g. Camry, C300, F-150"
                      value={data.vehicleModel}
                      onChange={(e) => set('vehicleModel', e.target.value)}
                      className={inputClass(!!errors.vehicleModel)}
                    />
                  </FormField>
                  <FormField id={fid('year')} label="Year" required error={errors.vehicleYear}>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      placeholder="e.g. 2019"
                      value={data.vehicleYear}
                      onChange={(e) => set('vehicleYear', e.target.value)}
                      className={inputClass(!!errors.vehicleYear)}
                    />
                  </FormField>
                </div>
                <StepNav step={step} onBack={() => dispatch({ type: 'BACK' })} />
              </StepFrame>
            )}

            {step === 3 && (
              <StepFrame headingRef={stepHeading} title="How Will This Repair Be Handled?">
                <div
                  role="radiogroup"
                  aria-label="Payment type"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {(
                    [
                      ['insurance', 'Insurance Claim', 'We coordinate adjusters & deductibles'],
                      [
                        'out-of-pocket',
                        'Customer Pay / Out-of-Pocket',
                        'Direct transparent estimate',
                      ],
                    ] as const
                  ).map(([value, title, desc]) => (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={data.paymentType === value}
                      onClick={() => set('paymentType', value)}
                      className={`p-3.5 rounded-lg border text-left transition-all ${
                        data.paymentType === value
                          ? 'border-vnavy bg-slate-50 ring-2 ring-vamber'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="font-bold text-slate-900 text-sm">{title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
                    </button>
                  ))}
                </div>
                {errors.paymentType && (
                  <p className="text-xs font-medium text-vred">{errors.paymentType}</p>
                )}

                {data.paymentType === 'insurance' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <FormField
                      id={fid('carrier')}
                      label="Insurance Carrier"
                      required
                      error={errors.insuranceCarrier}
                    >
                      <select
                        value={data.insuranceCarrier}
                        onChange={(e) => set('insuranceCarrier', e.target.value)}
                        className={inputClass(!!errors.insuranceCarrier)}
                      >
                        <option value="">Select your carrier…</option>
                        {INSURANCE_PARTNERS.map((p) => (
                          <option key={p.name} value={p.name}>
                            {p.name}
                          </option>
                        ))}
                        <option value="Other">Other Carrier</option>
                      </select>
                    </FormField>
                    <FormField
                      id={fid('claim')}
                      label="Claim Number (if available)"
                      error={errors.claimNumber}
                    >
                      <input
                        type="text"
                        placeholder="e.g. 0123456-CA"
                        value={data.claimNumber}
                        onChange={(e) => set('claimNumber', e.target.value)}
                        className={inputClass(!!errors.claimNumber)}
                      />
                    </FormField>
                  </div>
                )}
                <StepNav step={step} onBack={() => dispatch({ type: 'BACK' })} />
              </StepFrame>
            )}

            {step === 4 && (
              <StepFrame headingRef={stepHeading} title="Your Contact Info">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField id={fid('name')} label="Full Name" required error={errors.contactName}>
                    <input
                      type="text"
                      autoComplete="name"
                      value={data.contactName}
                      onChange={(e) => set('contactName', e.target.value)}
                      className={inputClass(!!errors.contactName)}
                    />
                  </FormField>
                  <FormField
                    id={fid('phone')}
                    label="Phone Number"
                    required
                    error={errors.contactPhone}
                  >
                    <input
                      type="tel"
                      autoComplete="tel"
                      placeholder="(310) 555-0199"
                      value={data.contactPhone}
                      onChange={(e) => set('contactPhone', e.target.value)}
                      className={inputClass(!!errors.contactPhone)}
                    />
                  </FormField>
                </div>
                <FormField id={fid('email')} label="Email Address" error={errors.contactEmail}>
                  <input
                    type="email"
                    autoComplete="email"
                    value={data.contactEmail}
                    onChange={(e) => set('contactEmail', e.target.value)}
                    className={inputClass(!!errors.contactEmail)}
                  />
                </FormField>
                <FormField
                  id={fid('notes')}
                  label="Details or Special Needs (optional)"
                  error={errors.notes}
                >
                  <textarea
                    rows={3}
                    placeholder="Describe the damage, tow assistance needed, timeline…"
                    value={data.notes}
                    onChange={(e) => set('notes', e.target.value)}
                    className={inputClass(!!errors.notes)}
                  />
                </FormField>

                {/* Summary preview */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-900 space-y-1">
                  <div className="font-bold uppercase tracking-wider">Summary of Request:</div>
                  <div className="text-amber-800">
                    {selectedService?.wizardLabel} for {data.vehicleYear} {data.vehicleMake}{' '}
                    {data.vehicleModel} (Billing:{' '}
                    {data.paymentType === 'insurance' ? data.insuranceCarrier : 'Customer Pay'})
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-2.5">
                    <input
                      id={fid('consent')}
                      type="checkbox"
                      checked={data.consent}
                      onChange={(e) => set('consent', e.target.checked)}
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={errors.consent ? fid('consent-error') : undefined}
                      className="mt-0.5 w-4 h-4 accent-vnavy"
                    />
                    <label
                      htmlFor={fid('consent')}
                      className="text-xs text-slate-700 leading-relaxed"
                    >
                      I agree that {SHOP_INFO.name} may use the information above to contact me
                      about this estimate. We never sell or share your information.{' '}
                      <span className="text-vred" aria-hidden="true">
                        *
                      </span>
                    </label>
                  </div>
                  {errors.consent && (
                    <p id={fid('consent-error')} className="mt-1 text-xs font-medium text-vred">
                      {errors.consent}
                    </p>
                  )}
                </div>

                <TurnstileWidget onToken={turnstile.setToken} />

                {status === 'error' && <SubmitErrorNotice message={state.errorMessage} />}

                <StepNav
                  step={step}
                  submitting={submitting}
                  onBack={() => dispatch({ type: 'BACK' })}
                />
              </StepFrame>
            )}
          </form>
        )}
      </div>
    </div>
  );

  if (isModal)
    return (
      <EstimateModal titleId={titleId} onClose={onClose}>
        {content}
      </EstimateModal>
    );

  return (
    <section id="estimate" className="py-16 bg-vsand border-b border-slate-300/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">{content}</div>
    </section>
  );
};

// ─── pieces ───────────────────────────────────────────────────────────────────

const StepFrame = ({
  title,
  headingRef,
  children,
}: {
  title: string;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  children: ReactNode;
}) => (
  <div className="space-y-5">
    <h3
      ref={headingRef}
      tabIndex={-1}
      className="text-sm font-bold text-slate-900 uppercase tracking-wide outline-none"
    >
      {title}
    </h3>
    {children}
  </div>
);

const StepNav = ({
  step,
  submitting = false,
  onBack,
}: {
  step: Step;
  submitting?: boolean;
  onBack: () => void;
}) => {
  const meta = STEPS[step - 1];
  return (
    <div className={`flex pt-4 ${step === 1 ? 'justify-end' : 'justify-between'} gap-3`}>
      {step > 1 && (
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="px-5 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-50 disabled:opacity-50"
        >
          Back
        </button>
      )}
      {meta.next ? (
        <button
          type="submit"
          className="px-6 py-2.5 bg-vnavy text-white font-bold text-sm uppercase tracking-wide rounded-md hover:bg-vnavy-dark transition-colors flex items-center gap-2"
        >
          <span>Next: {meta.next}</span>
          <ArrowRight className="w-4 h-4 text-vamber" aria-hidden="true" />
        </button>
      ) : (
        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className="px-6 sm:px-8 py-3 bg-vamber hover:bg-vamber-hover text-vnavy font-bold text-sm uppercase tracking-wider rounded-md transition-all shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-60 disabled:cursor-wait"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 motion-safe:animate-spin" aria-hidden="true" />
              <span>Sending…</span>
            </>
          ) : (
            <>
              <span>Submit Free Estimate Request</span>
              <Check className="w-4 h-4 stroke-[3]" aria-hidden="true" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

/** Dialog chrome: Escape closes, background scroll locked, focus moved in and restored on close. */
const EstimateModal = ({
  titleId,
  onClose,
  children,
}: {
  titleId: string;
  onClose?: () => void;
  children: ReactNode;
}) => {
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- backdrop click is a mouse convenience; Escape handles keyboard
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="max-w-2xl w-full my-8 outline-none"
      >
        {children}
      </div>
    </div>
  );
};
