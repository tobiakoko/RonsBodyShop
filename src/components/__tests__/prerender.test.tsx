import { act } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render as prerender } from '../../entry-server';
import App from '../../App';

describe('prerender + hydration', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('server markup contains the headline and hydrates without mismatches', async () => {
    const html = prerender();
    expect(html).toContain('Precision Auto Body');
    // Time-dependent status is neutral in the static HTML.
    expect(html).not.toMatch(/Open now\.|Closed now\./);

    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container);

    const onRecoverableError = vi.fn();
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    let root: ReturnType<typeof hydrateRoot> | undefined;
    await act(async () => {
      root = hydrateRoot(container, <App />, { onRecoverableError });
    });

    expect(onRecoverableError).not.toHaveBeenCalled();
    expect(consoleError).not.toHaveBeenCalled();
    // After hydration the live status replaces the neutral placeholder.
    expect(container.textContent).toMatch(/Open now\.|Closed now\./);

    act(() => root?.unmount());
    consoleError.mockRestore();
  });
});
