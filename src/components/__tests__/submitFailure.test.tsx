/**
 * Failure path end-to-end through the real submitLead: fetch returns 502 →
 * submitLead throws → UI shows the error with the shop phone as fallback.
 */
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EstimateCalculator } from '../sections/EstimateCalculator';
import { LocationAndHours } from '../sections/LocationAndHours';
import { SHOP_INFO } from '../../content/shop';

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => new Response(JSON.stringify({ error: 'We could not send your request.' }), { status: 502 })),
  );
});
afterEach(() => vi.unstubAllGlobals());

it('estimate wizard: failed submit shows the phone fallback', async () => {
  const user = userEvent.setup();
  render(<EstimateCalculator preselect={{ id: 'collision', nonce: 1 }} />);
  await user.click(screen.getByRole('button', { name: /next: vehicle specs/i }));
  await user.type(screen.getByLabelText(/^make/i), 'Toyota');
  await user.type(screen.getByLabelText(/model/i), 'Camry');
  await user.type(screen.getByLabelText(/^year/i), '2019');
  await user.click(screen.getByRole('button', { name: /next: insurance/i }));
  await user.click(screen.getByRole('radio', { name: /customer pay/i }));
  await user.click(screen.getByRole('button', { name: /next: your contact/i }));
  await user.type(screen.getByLabelText(/full name/i), 'Jane');
  await user.type(screen.getByLabelText(/phone number/i), '310-555-0199');
  await user.click(screen.getByRole('checkbox'));
  await user.click(screen.getByRole('button', { name: /submit free estimate request/i }));

  const alert = await screen.findByRole('alert');
  expect(within(alert).getByRole('link', { name: SHOP_INFO.phone })).toHaveAttribute('href', `tel:${SHOP_INFO.phoneRaw}`);
  // Can retry from the error state
  expect(screen.getByRole('button', { name: /submit free estimate request/i })).toBeEnabled();
});

it('quick message: failed submit shows the phone fallback', async () => {
  const user = userEvent.setup();
  render(<LocationAndHours />);
  await user.type(screen.getByLabelText(/your name/i), 'Al');
  await user.type(screen.getByLabelText(/phone or email/i), '310-555-0100');
  await user.type(screen.getByLabelText(/how can we assist/i), 'Hi');
  await user.click(screen.getByRole('checkbox'));
  await user.click(screen.getByRole('button', { name: /send direct message/i }));
  expect(await screen.findByRole('alert')).toHaveTextContent(/call us directly/i);
});
