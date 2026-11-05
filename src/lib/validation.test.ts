import { estimateSchema, messageSchema, validateEstimateStep } from './validation';

const validEstimate = {
  damageType: 'collision',
  vehicleMake: 'Toyota',
  vehicleModel: 'Camry',
  vehicleYear: '2019',
  paymentType: 'insurance',
  insuranceCarrier: 'State Farm',
  claimNumber: '',
  notes: '',
  contactName: 'Jane Driver',
  contactPhone: '(310) 555-0199',
  contactEmail: 'jane@example.com',
  consent: true,
  company: '',
};

describe('estimateSchema', () => {
  it('accepts a complete, valid estimate', () => {
    expect(estimateSchema.safeParse(validEstimate).success).toBe(true);
  });

  it('allows an empty optional email', () => {
    expect(estimateSchema.safeParse({ ...validEstimate, contactEmail: '' }).success).toBe(true);
  });

  it.each([
    ['contactEmail', 'not-an-email'],
    ['contactPhone', 'call me'],
    ['vehicleYear', '19'],
    ['vehicleYear', '1850'],
    ['damageType', 'spaceship'],
  ])('rejects invalid %s = %j', (field, value) => {
    expect(estimateSchema.safeParse({ ...validEstimate, [field]: value }).success).toBe(false);
  });

  it('requires consent', () => {
    const r = estimateSchema.safeParse({ ...validEstimate, consent: false });
    expect(r.success).toBe(false);
  });

  it('requires a carrier only for insurance claims', () => {
    expect(estimateSchema.safeParse({ ...validEstimate, insuranceCarrier: '' }).success).toBe(false);
    expect(
      estimateSchema.safeParse({ ...validEstimate, paymentType: 'out-of-pocket', insuranceCarrier: '' }).success,
    ).toBe(true);
  });

  it('rejects a filled honeypot', () => {
    expect(estimateSchema.safeParse({ ...validEstimate, company: 'Spam LLC' }).success).toBe(false);
  });
});

describe('validateEstimateStep', () => {
  it('only reports errors for the fields of that step', () => {
    const errors = validateEstimateStep(2, { ...validEstimate, vehicleModel: '', contactName: '' });
    expect(Object.keys(errors)).toEqual(['vehicleModel']);
  });

  it('applies the carrier rule on step 3', () => {
    expect(validateEstimateStep(3, { ...validEstimate, insuranceCarrier: '' })).toHaveProperty('insuranceCarrier');
  });
});

describe('messageSchema', () => {
  const valid = { name: 'Al', contact: 'al@example.com', message: 'Quote for a bumper?', consent: true, company: '' };

  it('accepts valid input', () => {
    expect(messageSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects missing message, short contact, missing consent, and honeypot', () => {
    expect(messageSchema.safeParse({ ...valid, message: '  ' }).success).toBe(false);
    expect(messageSchema.safeParse({ ...valid, contact: '123' }).success).toBe(false);
    expect(messageSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
    expect(messageSchema.safeParse({ ...valid, company: 'bot' }).success).toBe(false);
  });
});
