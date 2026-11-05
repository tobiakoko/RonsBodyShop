import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocationAndHours } from '../sections/LocationAndHours';
import { submitLead } from '../../lib/submitLead';

vi.mock('../../lib/submitLead', () => ({ submitLead: vi.fn() }));
const mockSubmit = vi.mocked(submitLead);

describe('Quick message form', () => {
  beforeEach(() => mockSubmit.mockClear());

  it('validates before sending', async () => {
    const user = userEvent.setup();
    render(<LocationAndHours />);
    await user.click(screen.getByRole('button', { name: /send direct message/i }));
    expect(mockSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toHaveAttribute('aria-invalid', 'true');
  });

  it('sends the message and shows success', async () => {
    mockSubmit.mockResolvedValue({ reference: 'RBS-111222' });
    const user = userEvent.setup();
    render(<LocationAndHours />);
    await user.type(screen.getByLabelText(/your name/i), 'Al');
    await user.type(screen.getByLabelText(/phone or email/i), 'al@example.com');
    await user.type(screen.getByLabelText(/how can we assist/i), 'Bumper quote please');
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: /send direct message/i }));

    expect(await screen.findByText(/message dispatched/i)).toBeInTheDocument();
    expect(screen.getByText(/RBS-111222/)).toBeInTheDocument();
    expect(mockSubmit).toHaveBeenCalledWith(
      'message',
      expect.objectContaining({ name: 'Al', contact: 'al@example.com', consent: true }),
      undefined,
    );
  });
});
