import Video from "../assets/rons-hero-vid.mp4";

export type ServiceItem = {
  title: string;
  description: string;
  icon: "auto_fix" | "handyman" | "format_paint";
  iconWrapClassName: string;
  cardShadowClassName: string;
  checks: Array<{ text: string; iconTone: "accent" | "primary" | "gold" }>;
};

export type GalleryItem = {
  alt: string;
  src: string;
};

export const ASSETS = {
  LOGO_URL:
    "/logo.png",
  HERO_BG:
    Video,
  STORY_IMG:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB4nhM83_mKmLPRdq2w3PDs3zYnI7hpcDjn_jxqPF4xrTWRPSiGQLThN-eBTJhBG0dQOvJxPy0scPxtaZCFJwaZLwobc1E206HIjjtXPJhXavDIJRdFYHFP8kYL1y3RRbZrZnIY_H-eCLnO8ih4qttaIwagkMBdHZPTDGbOopiTworcg_FrFwjJdGGkat-FtRfoGBvgD0aF_xqhOIYGLygYyzNXu5fwaQJCs4NKTOJezC7elDY9vDmpTyvJkygzAhuVqFgbjHacB9c",
  FOOTER_LOGO:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA3Ox9VwdcPDKK5bieseMQCI1Fjbcu25fUe9S2DnKITVSA9P4z9Wlp43DsvYIvv_467xGGBAf1WXAMEx8JvPKrlUa9pwDSsBjhp9S-4zEA5Efib0dVs1Qlf4oziG66gebSoQiYRf1GYr0x-jiuRsuCywbB3Bv6fc7SaQ6azl9CdqDImIbTSD2dDBjeezYSJ3qBq9W-lZPmyRZI6wqYAatRBtjUfyBWyhzvpAc_yZXfmPVIuznC3Swki9nqbSsng4DkZmivxojEGOnA",
} as const;

export const SERVICES: ServiceItem[] = [
  {
    title: "RESTORATION",
    description:
      "Full frame-off restorations. We don't just fix cars; we revive history with period-correct precision.",
    icon: "auto_fix",
    iconWrapClassName:
      "w-20 h-20 bg-accent text-white flex items-center justify-center mb-8 border-2 border-primary rotate-3 group-hover:rotate-0 transition-transform",
    cardShadowClassName: "shadow-[10px_10px_0px_0px_#f4b942]",
    checks: [
      { text: "Authentic Engine Rebuilds", iconTone: "accent" },
      { text: "OEM Component Sourcing", iconTone: "accent" },
      { text: "Hand-Stitched Interiors", iconTone: "accent" },
    ],
  },
  {
    title: "BODY WORK",
    description:
      "Old-school metal fabrication. From minor dings to custom panel beating, we shape perfection.",
    icon: "handyman",
    iconWrapClassName:
      "w-20 h-20 bg-primary text-gold flex items-center justify-center mb-8 border-2 border-accent -rotate-3 group-hover:rotate-0 transition-transform",
    cardShadowClassName: "shadow-[10px_10px_0px_0px_#d64436]",
    checks: [
      { text: "Precision Metal Fab", iconTone: "primary" },
      { text: "Rust Elimination", iconTone: "primary" },
      { text: "Lead Sled Techniques", iconTone: "primary" },
    ],
  },
  {
    title: "CUSTOM PAINT",
    description:
      "Show-stopping finishes. We master the deep luster of nitrocellulose and modern pearls.",
    icon: "format_paint",
    iconWrapClassName:
      "w-20 h-20 bg-gold text-primary flex items-center justify-center mb-8 border-2 border-primary rotate-2 group-hover:rotate-0 transition-transform",
    cardShadowClassName: "shadow-[10px_10px_0px_0px_#1a2332]",
    checks: [
      { text: "Periodic Color Matching", iconTone: "gold" },
      { text: "Deep Clear-Coat Gloss", iconTone: "gold" },
      { text: "Pinstriping Artistry", iconTone: "gold" },
    ],
  },
];

export const GALLERY: GalleryItem[] = [
  {
    alt: "Vintage Blue Crown Pump",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA134rHXsLVJCj2LC9Fvvl_vRdt4fJvLfY5mmYfLeGi-IlmoBzoDerNT1vlbdFk3Ln_Vv-knmYCOdyzZuJ0cOeDIdOm7Zn211MsW5zr6C47npyouNRymJTuftroZ40gvlEvFTsItZ_xmzmdEJz8q6V50FOP8EVWeztLwDcKaKqBM2Tp8XZNaXFLtQzzdHwukIcbVYbta-49bqYJwle36jI8VcCZ9gI4ZRRkkLoF0xt1nuw37hKj9QkvMRVberShPEA_lAKTAN-jFU8",
  },
  {
    alt: "Classic Restoration",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtpJcypAoKvwFZCJS5H8XbHE0OcVO2jE3YE8V6m9kzfhViJmVrbWzOoRQ85McBaewMn7B7kq3JEo7vXf1juaeHHr3Nv3S75aergZ8FJykwezX61pY3awuMUc8rpkCRQuyUqBH8nrNfGQDmwkETg6OkV0LHpmLrhCKxwH_909gONNq2OuFVwv_-qlbArpfkDTdJOcfmO3BreIAxoU880WYCOuBFVSyGZZfUB2M0oAC8eBmKrYuagaMjbZvMl14c5ainY76xter8vCQ",
  },
  {
    alt: "Shop Decor",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAz4yYBWv4pKc3XfFVa6UsIGyY7XYL_0FI3Kmbh5qGygmhHPB0dP_Y2a7t56wU_41G1O-DTbB2m_IMQ42v4eb80tM6HETzgWqvO3mur5JfyblHJO_b_8YcIt-0LdjE-C1C_95sBm2SPNmZJnCT6jnunFCzGg0TN4CI3O1uSUe3wG8lRyIki0sTptO-b1VMqhoQroyxqmDcaxOp3DgPuGkbHG2hb8qSNwGvDjKxlh-nb8ehsJC2t0ogeWyRQZBbYxl9knuJoRbj62Oo",
  },
  {
    alt: "Classic Details",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCo76BF8kuptJZQvWg1--FU_FRvjqq8mgPbLfGsBxDAbOpmqoOivEPw9UNjCRSo4vi4WrEqTexh-ZVcuzWa0iddGbFGBfNab7H0ICXdquvLDkLxdq_VqTEdcQagDSOUeuaew-bW-qkQxabFNJqT4vxShrfgoz2YBMftTai0XMwOEUtqENQeex1RoBPIsa6u1ZM9RgHlBMlRYJYzrnqjHrIFQPyqsW68pSzzHSSFgWmdi6ISwEbeQqNIf-7kVCdAHZ-d_cwnZ7bJQnQ",
  },
];
