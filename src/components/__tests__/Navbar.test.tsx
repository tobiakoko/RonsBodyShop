import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navbar } from '../layout/Navbar';

describe('Navbar mobile menu', () => {
  it('toggles with aria-expanded, closes on link click and on Escape', async () => {
    const user = userEvent.setup();
    render(<Navbar onOpenEstimate={() => {}} />);
    const toggle = screen.getByRole('button', { name: /open navigation menu/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('navigation', { name: 'Mobile' })).not.toBeInTheDocument();

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveAttribute('aria-controls', 'mobile-nav');
    expect(document.body.style.overflow).toBe('hidden');

    await user.click(screen.getByRole('link', { name: 'Location & Hours' }));
    expect(screen.queryByRole('navigation', { name: 'Mobile' })).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');

    await user.click(toggle);
    await user.keyboard('{Escape}');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
