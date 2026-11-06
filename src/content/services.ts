/**
 * The single service taxonomy. Used by the Services section, the estimate
 * wizard's damage-type step, and the shared Zod schema (`lib/validation.ts`).
 *
 * Pure data — no logic, no React. Imported by the serverless function too.
 */

export const SERVICE_IDS = ['collision', 'paint', 'dent', 'frame', 'classic'] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export interface ServiceItem {
  id: ServiceId;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  /** Shorter wording for the estimate wizard's damage-type cards. */
  wizardLabel: string;
  wizardDesc: string;
}

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: 'collision',
    title: 'Collision Repair',
    subtitle: 'Complete Accident Recovery',
    description:
      'Full-service structural and body repair following an accident. Our I-CAR trained technicians restore vehicle alignment, panels, and safety components back to pre-collision specifications.',
    features: [
      'Insurance claim coordination & direct billing',
      'Structural unibody and bumper repair',
      'Foreign, domestic, and luxury vehicles (Mercedes, BMW, Lexus)',
      'Thorough pre-delivery safety inspection',
    ],
    wizardLabel: 'Collision & Body Damage',
    wizardDesc: 'Fender, bumper, door, or structural impact',
  },
  {
    id: 'paint',
    title: 'Custom Paint & Refinishing',
    subtitle: 'Precise Factory Color-Matching',
    description:
      "Professional paint application using climate-controlled spray facilities and computerized color-matching to achieve a seamless, high-gloss factory finish that matches your car's original paint.",
    features: [
      'Computerized color-matching formulation',
      'Down-draft heated spray booth baking',
      'Spot repairs and complete vehicle refinishing',
      'Deep clear-coat gloss and durable protection',
    ],
    wizardLabel: 'Custom Paint & Scratch',
    wizardDesc: 'Down-draft refinishing & spot color match',
  },
  {
    id: 'dent',
    title: 'Dent Removal',
    subtitle: 'Paintless & Traditional Metalwork',
    description:
      'Eliminating door dings, creases, and hail dents. We use paintless dent repair (PDR) when possible to protect your factory paint, or traditional metal bumping for deeper creases.',
    features: [
      'Paintless Dent Repair (PDR) where applicable',
      'Panel beating and traditional sheet metal repair',
      'Door ding and parking lot crease elimination',
      'Preservation of original factory paint',
    ],
    wizardLabel: 'Paintless Dent Repair (PDR)',
    wizardDesc: 'Hail, door dings & minor metal creases',
  },
  {
    id: 'frame',
    title: 'Frame Straightening',
    subtitle: 'Precision Unibody Realignment',
    description:
      'Accidents can twist or bend the underlying frame. We utilize hydraulic frame pulling systems and measuring equipment to return your chassis to strict manufacturer tolerances.',
    features: [
      'Chassis and unibody measurement',
      'Hydraulic multi-angle pulling towers',
      'Corrects alignment, suspension, and tracking issues',
      'Ensures structural safety and integrity',
    ],
    wizardLabel: 'Frame Alignment & Pull',
    wizardDesc: 'Chassis measurement & hydraulic pull',
  },
  {
    id: 'classic',
    title: 'Classic Car Restoration',
    subtitle: 'Handcrafted Vintage Iron Care',
    description:
      'Decades of passion for vintage American iron, hot rods, and classic cars. We handle custom metal fabrication, rust elimination, and period-correct finishing.',
    features: [
      'Custom metal fabrication & rust repair',
      'Vintage muscle cars, trucks, and classic models',
      'Multi-stage prep, prime, and custom paint',
      'Patient, old-school attention to detail',
    ],
    wizardLabel: 'Classic Car Restoration',
    wizardDesc: 'Vintage fabrication & custom project',
  },
];

export const isServiceId = (value: string): value is ServiceId =>
  (SERVICE_IDS as readonly string[]).includes(value);
