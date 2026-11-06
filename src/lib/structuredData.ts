import { SHOP_INFO } from '../content/shop.ts';
import { CORE_SERVICES } from '../content/services.ts';

const DAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * schema.org AutoBodyShop JSON-LD, built from SHOP_INFO so it can never drift
 * from the displayed data. Injected into index.html at build time (vite.config.ts).
 */
export function buildAutoBodyShopJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoBodyShop',
    name: SHOP_INFO.name,
    image: `${SHOP_INFO.url}/og-image.jpg`,
    logo: `${SHOP_INFO.url}/logo.png`,
    url: `${SHOP_INFO.url}/`,
    telephone: SHOP_INFO.phoneE164,
    email: SHOP_INFO.email,
    slogan: SHOP_INFO.tagline,
    description: `Collision repair, custom paint, dent removal, frame straightening and classic car restoration in ${SHOP_INFO.city}, ${SHOP_INFO.state}. Serving the South Bay since ${SHOP_INFO.foundedYear}.`,
    foundingDate: String(SHOP_INFO.foundedYear),
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SHOP_INFO.address,
      addressLocality: SHOP_INFO.city,
      addressRegion: SHOP_INFO.state,
      postalCode: SHOP_INFO.zip,
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', ...SHOP_INFO.geo },
    hasMap: SHOP_INFO.mapUrl,
    areaServed: [
      { '@type': 'City', name: SHOP_INFO.city },
      { '@type': 'AdministrativeArea', name: 'South Bay, Los Angeles County' },
    ],
    openingHoursSpecification: SHOP_INFO.hours
      .filter((h) => h.open && h.close)
      .map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days.map((d) => DAY[d]),
        opens: h.open,
        closes: h.close,
      })),
    makesOffer: CORE_SERVICES.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, description: s.description },
    })),
  };
}
