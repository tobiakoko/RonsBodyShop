/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import { buildAutoBodyShopJsonLd } from './src/lib/structuredData.ts';
import { SHOP_INFO } from './src/content/shop.ts';

/**
 * Keeps index.html in sync with SHOP_INFO: injects schema.org JSON-LD in place
 * of <!--JSON_LD--> and fills %SHOP_PHONE% / %SHOP_ADDRESS% placeholders.
 */
const structuredData = (): Plugin => ({
  name: 'rbs-structured-data',
  transformIndexHtml(html) {
    const json = JSON.stringify(buildAutoBodyShopJsonLd(), null, 2).replace(/</g, '\\u003c');
    return html
      .replaceAll('%SHOP_PHONE%', SHOP_INFO.phone)
      .replaceAll('%SHOP_ADDRESS%', SHOP_INFO.fullAddress)
      .replace('<!--JSON_LD-->', `<script type="application/ld+json">\n${json}\n    </script>`);
  },
});

export default defineConfig({
  plugins: [react(), tailwindcss(), structuredData()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
});
