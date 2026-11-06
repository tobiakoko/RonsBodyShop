import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Services } from '../sections/Services';
import { CORE_SERVICES } from '../../content/services';

describe('Services', () => {
  it('renders a dedicated icon for every service (no fallback)', () => {
    const { container } = render(<Services onSelectService={() => {}} />);
    for (const s of CORE_SERVICES) {
      expect(container.querySelector(`[data-icon="${s.id}"]`)).not.toBeNull();
    }
  });

  it('passes the selected service id up', async () => {
    const onSelect = vi.fn();
    render(<Services onSelectService={onSelect} />);
    await userEvent.click(
      screen.getByRole('button', { name: /estimate for frame straightening/i }),
    );
    expect(onSelect).toHaveBeenCalledWith('frame');
  });
});
