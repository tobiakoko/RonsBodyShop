/**
 * Build-time prerender entry. `scripts/prerender.mjs` renders this to static
 * HTML and inlines it into `dist/index.html`, so the hero headline paints
 * before the JS bundle has loaded. `main.tsx` then hydrates the same tree.
 */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
