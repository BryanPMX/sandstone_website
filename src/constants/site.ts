/**
 * Site-wide content and links. Production domain: sandstone.home
 * Single source of truth for nav, contact, and address.
 */
import type { AgentProfile } from "@/types";

export const SITE_NAV = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about-us" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Agents", href: "/#agents" },
] as const;

export const SITE_CONTACT = {
  phone: "+1 (915) 328-9799",
  phoneRaw: "9153289799",
  email: "agamboa@kw.com",
} as const;

export const SITE_ADDRESS = {
  line1: "5822 Cromo Dr #205",
  city: "El Paso",
  state: "TX",
  zip: "79912",
  full: "5822 Cromo Dr #205 | El Paso, TX 79912",
} as const;

export const SITE_HOURS = {
  weekdays: "Monday to Friday 09:00 to 18:30",
  saturday: "Saturday we work until 15:30",
} as const;

export const HERO_TITLE = "Sandstone Real Estate Team";
export const HERO_SLOGAN = "Luxury. Lifestyle. Legacy.";
export const HERO_CTA = "Schedule a Private Tour";

export const ABOUT_HEADLINE =
  "Helping families find their place in El Paso & Fort Bliss";
export const ABOUT_WHAT_WE_DO =
  "We guide buyers, sellers, and military families with a clear, professional, and stress-free real estate experience designed around trust and excellence.";
export const ABOUT_FOUNDER_ALT =
  "Alejandro Gamboa, founder of Sandstone Real Estate Team";

/**
 * Single stat type supporting any rolling value (e.g. 0+, 1,500, 10,000).
 * Change rollDigits and commaAfterIndex to update the displayed number.
 */
export type Stat = {
  label: string;
  /** Display string for reference (e.g. "1,500", "10,000", "0+") */
  value: string;
  /** Digits to roll, one per column (e.g. [1,5,0,0] → 1500, [1,0,0,0,0] → 10,000) */
  rollDigits: number[];
  /** Insert comma after this many digits (e.g. 1 → "1,500", 2 → "10,000"). Omit for no comma. */
  commaAfterIndex?: number;
  /** Optional suffix after digits (e.g. "+" for "0+") */
  suffix?: string;
};

/** Stats block – all values use rollDigits; adjust numbers/comma/suffix as needed. */
export const STATS: Stat[] = [
  {
    label: "Homes Closed with Confidence",
    value: "1,500+",
    rollDigits: [1, 5, 0, 0],
    commaAfterIndex: 1,
    suffix: "+",
  },
  {
    label: "Served Families",
    value: "1,200+",
    rollDigits: [1, 2, 0, 0],
    commaAfterIndex: 1,
    suffix: "+",
  },
  {
    label: "Deals in Progress",
    value: "30+",
    rollDigits: [3, 0],
    suffix: "+",
  },
  {
    label: "Under Construction",
    value: "10+",
    rollDigits: [1, 0],
    suffix: "+",
  },
  {
    label: "Over 200 rentals",
    value: "200+",
    rollDigits: [2, 0, 0],
    commaAfterIndex: 1,
    suffix: "+",
  },
];

export const GALLERY_TITLE = "Gallery";
export const GALLERY_SUBTITLE = "Curated listings refreshed weekly";

/** Gallery slide images (place in /public/gallery/ or use URLs) */
export const GALLERY_IMAGES = [
  { src: "/gallery/1.jpg", alt: "Property 1" },
  { src: "/gallery/2.jpg", alt: "Property 2" },
  { src: "/gallery/3.jpg", alt: "Property 3" },
];

/** News items: title, description, image for each box */
export const NEWS_ITEMS = [
  { title: "Market pulse", description: "Inventory is tight; buyers are winning with pre-list intel and cinematic launches." },
  { title: "Relocation first", description: "Video tours, VA expertise, and on-base closings keep PCS timelines stress-free." },
  { title: "Concierge selling", description: "Staging, pro media, and dual MLS launches in under 10 days." },
];

/** Agents: name and image for each */
export const AGENTS: AgentProfile[] = [
  {
    name: "Alejandro Gamboa",
    title: "Team Leader",
    image: "/agents-1.jpg",
    phone: "+1 (915) 328-9799",
    email: "agamboa@kw.com",
    tagline: "Strategy-first guidance for luxury & relocation.",
    about:
      "I focus on high-trust advisory for sellers, relocation buyers, and investment clients across El Paso. My goal is to make each move feel clear, protected, and profitable.",
    specialties: ["Luxury Listings", "Relocation", "Investment Strategy"],
    socials: [
      { platform: "instagram", href: "#", handle: "@sandstonerealestate" },
      { platform: "facebook", href: "#", handle: "Sandstone Real Estate Team" },
      { platform: "linkedin", href: "#", handle: "Alejandro Gamboa" },
    ],
  },
  {
    name: "Valeria Ortiz",
    title: "Listing Specialist",
    image: "/agents-2.jpg",
    phone: "+1 (915) 555-4100",
    email: "valeria@sandstone.com",
    tagline: "Launch-ready listings with pro staging and cinematic media.",
    about:
      "I partner with homeowners to prepare and position properties for stronger first impressions and faster momentum from day one on market.",
    specialties: ["Listing Prep", "Home Staging", "Marketing Launches"],
    socials: [
      { platform: "instagram", href: "#", handle: "@valeria.listings" },
      { platform: "facebook", href: "#", handle: "Valeria Ortiz Realtor" },
      { platform: "linkedin", href: "#", handle: "Valeria Ortiz" },
    ],
  },
  {
    name: "Lisa Hart",
    title: "Buyer Partner",
    image: "/agents-3.jpg",
    phone: "+1 (915) 555-5100",
    email: "lisa@sandstone.com",
    tagline: "Video tours, offer strategy, and neighborhood expertise.",
    about:
      "I guide buyers from financing to closing with a clear game plan, neighborhood context, and negotiation support tailored to each family.",
    specialties: ["Buyer Advisory", "Offer Negotiation", "Fort Bliss Moves"],
    socials: [
      { platform: "instagram", href: "#", handle: "@lisahelpsbuy" },
      { platform: "facebook", href: "#", handle: "Lisa Hart Real Estate" },
      { platform: "linkedin", href: "#", handle: "Lisa Hart" },
    ],
  },
  {
    name: "Marco Reyes",
    title: "Concierge",
    image: "/agents-4.jpg",
    phone: "+1 (915) 555-6100",
    email: "marco@sandstone.com",
    tagline: "Seamless coordination from contract to close.",
    about:
      "I manage vendor coordination, timeline touchpoints, and client updates so every transaction remains smooth and on schedule.",
    specialties: ["Transaction Coordination", "Vendor Management", "Client Care"],
    socials: [
      { platform: "instagram", href: "#", handle: "@marco.concierge" },
      { platform: "facebook", href: "#", handle: "Marco Reyes Concierge" },
      { platform: "linkedin", href: "#", handle: "Marco Reyes" },
    ],
  },
];

export const CONTACT_HEADLINE = "Want to learn more about us?";
export const CONTACT_SUBHEADLINE =
  "We'd be happy to help you find your dream home.";
export const CONTACT_CTA = "SCHEDULE A VISIT";

export const FOOTER_CREDIT = "Site created by Rolu";
export const FOOTER_BRAND = "Sandstone Real Estate Team - by Keller Williams";

/** Social links for footer (add URLs when available) */
export const SOCIAL_LINKS = [
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
] as const;

/** Brand/partner image names for footer (place in /public/brands/) */
export const FOOTER_BRAND_IMAGES = [
  { name: "Keller Williams", src: "/brands/keller-williams.png", alt: "Keller Williams" },
  { name: "Equal Housing", src: "/brands/equal-housing.png", alt: "Equal Housing Opportunity" },
] as const;
