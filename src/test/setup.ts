import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';

if (typeof document !== 'undefined') afterEach(() => cleanup());

// jsdom lacks matchMedia (used by the Navbar to close the drawer on desktop resize).
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}
// jsdom lacks scrollIntoView.
if (typeof Element !== 'undefined') Element.prototype.scrollIntoView ??= () => {};
