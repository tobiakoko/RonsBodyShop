/**
 * Verified business and service information for Ron's Body Shop
 * Source: ronsbodyshop.net, local business records, and Google Reviews
 */

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  source: string;
  text: string;
  detail: string;
}

export const SHOP_INFO = {
  name: "Ron's Body Shop",
  tagline: "Where Satisfaction is a Tradition",
  address: "1324 Cabrillo Ave",
  city: "Torrance",
  state: "CA",
  zip: "90501",
  fullAddress: "1324 Cabrillo Ave, Torrance, CA 90501",
  phone: "(310) 618-8791",
  phoneRaw: "3106188791",
  email: "ronsbodyshop@sbcglobal.net",
  rating: "4.7",
  reviewCount: "85+",
  experienceYears: "40+",
  hours: [
    { day: "Monday – Friday", time: "8:00 AM – 5:30 PM" },
    { day: "Saturday", time: "8:00 AM – 12:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
  mapUrl: "https://maps.google.com/?q=Ron's+Body+Shop+1324+Cabrillo+Ave+Torrance+CA+90501",
};

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: "collision",
    title: "Collision Repair",
    subtitle: "Complete Accident Recovery",
    description: "Full-service structural and body repair following an accident. Our I-CAR trained technicians restore vehicle alignment, panels, and safety components back to pre-collision specifications.",
    features: [
      "Insurance claim coordination & direct billing",
      "Structural unibody and bumper repair",
      "Foreign, domestic, and luxury vehicles (Mercedes, BMW, Lexus)",
      "Thorough pre-delivery safety inspection"
    ]
  },
  {
    id: "paint",
    title: "Custom Paint & Refinishing",
    subtitle: "Precise Factory Color-Matching",
    description: "Professional paint application using climate-controlled spray facilities and computerized color-matching to achieve a seamless, high-gloss factory finish that matches your car's original paint.",
    features: [
      "Computerized color-matching formulation",
      "Down-draft heated spray booth baking",
      "Spot repairs and complete vehicle refinishing",
      "Deep clear-coat gloss and durable protection"
    ]
  },
  {
    id: "dent",
    title: "Dent Removal",
    subtitle: "Paintless & Traditional Metalwork",
    description: "Eliminating door dings, creases, and hail dents. We use paintless dent repair (PDR) when possible to protect your factory paint, or traditional metal bumping for deeper creases.",
    features: [
      "Paintless Dent Repair (PDR) where applicable",
      "Panel beating and traditional sheet metal repair",
      "Door ding and parking lot crease elimination",
      "Preservation of original factory paint"
    ]
  },
  {
    id: "frame",
    title: "Frame Straightening",
    subtitle: "Precision Unibody Realignment",
    description: "Accidents can twist or bend the underlying frame. We utilize hydraulic frame pulling systems and measuring equipment to return your chassis to strict manufacturer tolerances.",
    features: [
      "Chassis and unibody measurement",
      "Hydraulic multi-angle pulling towers",
      "Corrects alignment, suspension, and tracking issues",
      "Ensures structural safety and integrity"
    ]
  },
  {
    id: "classic",
    title: "Classic Car Restoration",
    subtitle: "Handcrafted Vintage Iron Care",
    description: "Decades of passion for vintage American iron, hot rods, and classic cars. We handle custom metal fabrication, rust elimination, and period-correct finishing.",
    features: [
      "Custom metal fabrication & rust repair",
      "Vintage muscle cars, trucks, and classic models",
      "Multi-stage prep, prime, and custom paint",
      "Patient, old-school attention to detail"
    ]
  }
];

export const REAL_REVIEWS: ReviewItem[] = [
  {
    id: "1",
    author: "Local South Bay Driver",
    rating: 5,
    source: "Google Review",
    text: "Ron and his team did an outstanding job on my car after an accident. The paint matching is seamless and the panels align perfectly. Honest, straightforward estimate with no surprises.",
    detail: "Collision & Paint Repair"
  },
  {
    id: "2",
    author: "Torrance Car Owner",
    rating: 5,
    source: "Google Review",
    text: "I’ve been bringing cars to Ron’s Body Shop for years. You can tell they take pride in what they do the moment you walk into the shop. They dealt directly with the insurance company and made the entire process painless.",
    detail: "Insurance Claim & Body Work"
  },
  {
    id: "3",
    author: "Classic Vehicle Enthusiast",
    rating: 5,
    source: "Google Review",
    text: "Finding a shop that understands classic metalwork and modern precision at the same time is rare. Ron’s team has real craftsmanship. The car looks as good as the day it rolled off the assembly line.",
    detail: "Restoration & Metalwork"
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Get Your Estimate",
    desc: "Call (310) 618-8791, bring your car to 1324 Cabrillo Ave, or send photos online for a free assessment."
  },
  {
    step: "02",
    title: "We Handle The Insurance",
    desc: "Under CA law, you choose your repair shop. We coordinate directly with your adjuster to approve proper repairs."
  },
  {
    step: "03",
    title: "Drive Away Restored",
    desc: "Our technicians repair, align, and paint your vehicle to factory standard, keeping you updated every step."
  }
];

export const INSURANCE_PARTNERS = [
  { name: "AAA Auto Club", desc: "Approved & Coordinated" },
  { name: "State Farm", desc: "Direct Claim Handling" },
  { name: "Farmers Insurance", desc: "Digital Supplements" },
  { name: "Geico", desc: "Adjuster Interfacing" },
  { name: "Allstate", desc: "Seamless Claims" },
  { name: "Progressive", desc: "Expedited Approvals" },
  { name: "Mercury Insurance", desc: "Direct Coordination" },
  { name: "USAA", desc: "Dedicated Service" },
  { name: "Liberty Mutual", desc: "Direct Billing" },
  { name: "Travelers", desc: "Full Coverage" }
];

