import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

describe('App smoke test', () => {
  it('renders the page with exactly one h1 and opens/closes the estimate modal', async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(screen.getAllByRole('button', { name: /get free estimate/i })[0]);
    expect(screen.getByRole('dialog', { name: /request your free estimate/i })).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
