import { estimateReducer, initialWizardState, type WizardState } from './estimateWizard';

const fill = (state: WizardState, patch: Partial<WizardState['data']>): WizardState => ({
  ...state,
  data: { ...state.data, ...patch },
});

describe('estimateReducer', () => {
  it('starts editing at step 1 with no pre-filled vehicle/insurance data', () => {
    const s = initialWizardState();
    expect(s).toMatchObject({ status: 'editing', step: 1 });
    expect(s.data.vehicleMake).toBe('');
    expect(s.data.insuranceCarrier).toBe('');
  });

  it('NEXT with invalid data stays on the step and sets errors', () => {
    const s = estimateReducer(initialWizardState(), { type: 'NEXT' });
    expect(s.step).toBe(1);
    expect(s.errors.damageType).toBeTruthy();
  });

  it('NEXT with valid data advances; BACK returns', () => {
    let s = estimateReducer(initialWizardState('paint'), { type: 'NEXT' });
    expect(s.step).toBe(2);
    s = estimateReducer(s, { type: 'BACK' });
    expect(s.step).toBe(1);
  });

  it('cannot jump forward with GOTO', () => {
    const s = estimateReducer(initialWizardState('paint'), { type: 'GOTO', step: 4 });
    expect(s.step).toBe(1);
  });

  it('FIELD clears that field’s error', () => {
    let s = estimateReducer(initialWizardState(), { type: 'NEXT' });
    s = estimateReducer(s, { type: 'FIELD', key: 'damageType', value: 'dent' });
    expect(s.errors.damageType).toBeUndefined();
  });

  it('SUBMIT → submitting → RESOLVED stores the server ticket', () => {
    let s: WizardState = fill({ ...initialWizardState(), step: 4 }, {
      damageType: 'collision',
      vehicleMake: 'Ford',
      vehicleModel: 'F-150',
      vehicleYear: '2020',
      paymentType: 'out-of-pocket',
      contactName: 'Sam',
      contactPhone: '310-555-0100',
      consent: true,
    });
    s = estimateReducer(s, { type: 'SUBMIT' });
    expect(s.status).toBe('submitting');
    s = estimateReducer(s, { type: 'RESOLVED', ticket: 'RBS-123456' });
    expect(s).toMatchObject({ status: 'success', ticket: 'RBS-123456' });
  });

  it('SUBMIT with an earlier invalid step jumps back to it', () => {
    const s = estimateReducer(fill({ ...initialWizardState('collision'), step: 4 }, { consent: true }), { type: 'SUBMIT' });
    expect(s).toMatchObject({ status: 'editing', step: 2 });
  });

  it('REJECTED → error, and SUBMIT can retry', () => {
    const submitting: WizardState = { ...initialWizardState(), status: 'submitting', step: 4 };
    const err = estimateReducer(submitting, { type: 'REJECTED', message: 'boom' });
    expect(err).toMatchObject({ status: 'error', errorMessage: 'boom' });
  });

  it('ignores RESOLVED unless submitting', () => {
    const s = estimateReducer(initialWizardState(), { type: 'RESOLVED', ticket: 'X' });
    expect(s.status).toBe('editing');
  });
});
