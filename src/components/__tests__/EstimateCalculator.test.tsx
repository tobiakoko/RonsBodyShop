import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EstimateCalculator } from '../sections/EstimateCalculator';
import { submitLead } from '../../lib/submitLead';

vi.mock('../../lib/submitLead', () => ({ submitLead: vi.fn() }));
const mockSubmit = vi.mocked(submitLead);

async function completeWizard(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('radio', { name: /collision & body damage/i }));
  await user.click(screen.getByRole('button', { name: /next: vehicle specs/i }));

  await user.type(screen.getByLabelText(/^make/i), 'Toyota');
  await user.type(screen.getByLabelText(/model/i), 'Camry');
  await user.type(screen.getByLabelText(/^year/i), '2019');
  await user.click(screen.getByRole('button', { name: /next: insurance/i }));

  await user.click(screen.getByRole('radio', { name: /customer pay/i }));
  await user.click(screen.getByRole('button', { name: /next: your contact/i }));

  await user.type(screen.getByLabelText(/full name/i), 'Jane Driver');
  await user.type(screen.getByLabelText(/phone number/i), '(310) 555-0199');
  await user.click(screen.getByRole('checkbox'));
}

describe('EstimateCalculator', () => {
  beforeEach(() => mockSubmit.mockClear());

  it('blocks advancing with missing required fields and shows errors', async () => {
    const user = userEvent.setup();
    render(<EstimateCalculator />);
    await user.click(screen.getByRole('button', { name: /next: vehicle specs/i }));
    expect(screen.getByText(/select the type of damage/i)).toBeInTheDocument();

    await user.click(screen.getByRole('radio', { name: /paintless dent/i }));
    await user.click(screen.getByRole('button', { name: /next: vehicle specs/i }));
    await user.click(screen.getByRole('button', { name: /next: insurance/i }));

    const model = screen.getByLabelText(/model/i);
    expect(model).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Model is required')).toBeInTheDocument();
  });

  it('submits to the real transport and shows the server-issued reference', async () => {
    mockSubmit.mockResolvedValue({ reference: 'RBS-424242' });
    const user = userEvent.setup();
    render(<EstimateCalculator />);
    await completeWizard(user);
    await user.click(screen.getByRole('button', { name: /submit free estimate request/i }));

    expect(await screen.findByText('Reference #RBS-424242')).toBeInTheDocument();
    expect(mockSubmit).toHaveBeenCalledTimes(1);
    const [kind, data] = mockSubmit.mock.calls[0];
    expect(kind).toBe('estimate');
    expect(data).toMatchObject({
      damageType: 'collision',
      vehicleMake: 'Toyota',
      vehicleModel: 'Camry',
      contactPhone: '(310) 555-0199',
      consent: true,
    });
  });

  it('requires consent before submitting', async () => {
    const user = userEvent.setup();
    render(<EstimateCalculator />);
    await completeWizard(user);
    await user.click(screen.getByRole('checkbox')); // uncheck
    await user.click(screen.getByRole('button', { name: /submit free estimate request/i }));
    expect(mockSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(/please agree/i)).toBeInTheDocument();
  });

  it('pre-selects a damage type from the Services section', () => {
    render(<EstimateCalculator preselect={{ id: 'frame', nonce: 1 }} />);
    expect(screen.getByRole('radio', { name: /frame alignment/i })).toHaveAttribute('aria-checked', 'true');
  });
});
