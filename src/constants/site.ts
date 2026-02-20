/**
 * Site-wide content and links.
 * Single source of truth for labels, legal links, and static copy.
 */
export const SITE_NAV = [
  { label: "Sell a property", href: "/sell" },
  { label: "Rent a property", href: "/rent" },
  { label: "Join the Team", href: "/join" },
  { label: "Contact Us", href: "/#contact" },
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

export const CONTACT_HEADLINE = "Want to learn more about us?";
export const CONTACT_SUBHEADLINE =
  "We'd be happy to help you find your dream home.";
export const CONTACT_CTA = "SCHEDULE A VISIT";

/** Links for contact form consent (required checkboxes). View-only pages, no download. */
export const PRIVACY_POLICY_HREF = "/privacy-policy";
export const TERMS_AND_CONDITIONS_HREF = "/terms-and-conditions";

export const FOOTER_BRAND = "Sandstone Real Estate Group";
export const FOOTER_TAGLINE = "Luxury. Lifestyle. Legacy.";
export const FOOTER_ABOUT =
  "We don't just sell houses - we elevate lifestyles. Trust, innovation, and community in El Paso and the Southwest.";

/** Compliance logos for footer (in /public) */
export const FOOTER_BRAND_IMAGES = [
  { name: "Keller Williams", src: "/keller-williams.webp", alt: "Keller Williams" },
  { name: "MLS", src: "/mls.webp", alt: "MLS" },
] as const;
