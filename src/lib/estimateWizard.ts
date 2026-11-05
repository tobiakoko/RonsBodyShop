/**
 * SM-1 — Estimate wizard state machine (see instructions/04-state-machines.md).
 *
 *   editing(1) ─NEXT✓→ editing(2) ─NEXT✓→ editing(3) ─NEXT✓→ editing(4) ─SUBMIT✓→ submitting
 *        ▲ BACK            ▲ BACK            ▲ BACK                              │
 *   NEXT✗ / SUBMIT✗: stay on step, errors populated          RESOLVED → success ─RESET→ editing(1)
 *                                                            REJECTED → error ─FIELD/SUBMIT→ …
 *
 * All transitions live in `estimateReducer`; the component only dispatches.
 * The reducer is pure — the network call happens in the component's effect.
 */
import type { ServiceId } from '../content/services';
import { validateEstimateStep, type FieldErrors } from './validation';

export type Step = 1 | 2 | 3 | 4;
export type WizardStatus = 'editing' | 'submitting' | 'success' | 'error';

export const STEPS: readonly { n: Step; label: string; next?: string }[] = [
  { n: 1, label: 'Damage', next: 'Vehicle Specs' },
  { n: 2, label: 'Vehicle', next: 'Insurance / Billing' },
  { n: 3, label: 'Insurance', next: 'Your Contact Info' },
  { n: 4, label: 'Contact' },
];
const LAST_STEP: Step = 4;

/** Raw form state (strings as typed). Validated into `EstimateInput` on submit. */
export interface EstimateData {
  damageType: ServiceId | '';
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  paymentType: 'insurance' | 'out-of-pocket' | '';
  insuranceCarrier: string;
  claimNumber: string;
  notes: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  consent: boolean;
  company: string; // honeypot
}

export type EstimateField = keyof EstimateData;

export interface WizardState {
  status: WizardStatus;
  step: Step;
  data: EstimateData;
  errors: FieldErrors<EstimateField>;
  ticket?: string; // set only on 'success' — issued by the server
  errorMessage?: string; // set only on 'error'
}

export type WizardAction =
  | { type: 'FIELD'; key: EstimateField; value: EstimateData[EstimateField] }
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'GOTO'; step: Step }
  | { type: 'SUBMIT' }
  | { type: 'RESOLVED'; ticket: string }
  | { type: 'REJECTED'; message: string }
  | { type: 'RESET'; damageType?: ServiceId };

export const emptyEstimate = (damageType: ServiceId | '' = ''): EstimateData => ({
  damageType,
  vehicleMake: '',
  vehicleModel: '',
  vehicleYear: '',
  paymentType: '',
  insuranceCarrier: '',
  claimNumber: '',
  notes: '',
  contactName: '',
  contactPhone: '',
  contactEmail: '',
  consent: false,
  company: '',
});

export const initialWizardState = (damageType: ServiceId | '' = ''): WizardState => ({
  status: 'editing',
  step: 1,
  data: emptyEstimate(damageType),
  errors: {},
});

const firstInvalidStep = (data: EstimateData): { step: Step; errors: FieldErrors } | null => {
  for (const { n } of STEPS) {
    const errors = validateEstimateStep(n, data as unknown as Record<string, unknown>);
    if (Object.keys(errors).length) return { step: n, errors };
  }
  return null;
};

export function estimateReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'FIELD': {
      if (state.status === 'submitting' || state.status === 'success') return state;
      const { [action.key]: _cleared, ...errors } = state.errors;
      void _cleared;
      return {
        ...state,
        status: 'editing',
        errorMessage: undefined,
        data: { ...state.data, [action.key]: action.value },
        errors,
      };
    }

    case 'NEXT': {
      if (state.status !== 'editing' || state.step === LAST_STEP) return state;
      const errors = validateEstimateStep(state.step, state.data as unknown as Record<string, unknown>);
      if (Object.keys(errors).length) return { ...state, errors };
      return { ...state, step: (state.step + 1) as Step, errors: {} };
    }

    case 'BACK':
      if (state.status === 'submitting' || state.status === 'success' || state.step === 1) return state;
      return { ...state, status: 'editing', step: (state.step - 1) as Step, errors: {} };

    case 'GOTO': {
      // Only backwards jumps (to already-validated steps) are allowed.
      if (state.status === 'submitting' || state.status === 'success' || action.step >= state.step) return state;
      return { ...state, status: 'editing', step: action.step, errors: {} };
    }

    case 'SUBMIT': {
      if (state.status !== 'editing' && state.status !== 'error') return state;
      if (state.step !== LAST_STEP) return state;
      const invalid = firstInvalidStep(state.data);
      if (invalid) return { ...state, status: 'editing', step: invalid.step, errors: invalid.errors };
      return { ...state, status: 'submitting', errors: {}, errorMessage: undefined };
    }

    case 'RESOLVED':
      if (state.status !== 'submitting') return state;
      return { ...state, status: 'success', ticket: action.ticket };

    case 'REJECTED':
      if (state.status !== 'submitting') return state;
      return { ...state, status: 'error', errorMessage: action.message };

    case 'RESET':
      return initialWizardState(action.damageType ?? '');
  }
}
