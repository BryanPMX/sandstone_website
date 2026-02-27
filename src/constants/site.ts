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

export const SITE_BRAND = "Sandstone Real Estate Group";
export const SMS_DISCLOSURE_BRAND = `${SITE_BRAND} by Keller Williams`;

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

export const HERO_TITLE = SITE_BRAND;
export const HERO_SLOGAN = "Luxury. Lifestyle. Legacy.";
export const HERO_CTA = "Schedule a Private Tour";

export const CONTACT_HEADLINE = "Want to learn more about us?";
export const CONTACT_SUBHEADLINE =
  "We'd be happy to help you find your dream home.";
export const CONTACT_CTA = "SCHEDULE A VISIT";

/** Links and labels for legal pages referenced across forms and footer. */
export const PRIVACY_POLICY_HREF = "/privacy-policy";
export const PRIVACY_POLICY_LABEL = "Privacy Policy";
export const TERMS_AND_CONDITIONS_HREF = "/terms-and-conditions";
export const TERMS_AND_CONDITIONS_LABEL = "Terms and Conditions";
export const FORM_PHONE_SMS_NOTICE =
  "Entering your phone number alone does not authorize text messages. Use the SMS options below to opt in.";
export const FORM_TRANSACTIONAL_SMS_COPY =
  `I agree to receive transactional text messages from ${SMS_DISCLOSURE_BRAND} at the phone number provided, including inquiry follow-ups, appointment reminders, and service updates. Message frequency may vary. Message & data rates may apply. Reply HELP for help or STOP to opt out.`;
export const FORM_MARKETING_SMS_COPY =
  `I agree to receive marketing and promotional text messages from ${SMS_DISCLOSURE_BRAND} at the phone number provided. Message frequency may vary. Message & data rates may apply. Reply HELP for help or STOP to opt out.`;

export const FOOTER_BRAND = SITE_BRAND;
export const FOOTER_TAGLINE = "Luxury. Lifestyle. Legacy.";
export const FOOTER_ABOUT =
  "We don't just sell houses - we elevate lifestyles. Trust, innovation, and community in El Paso and the Southwest.";

/** Compliance logos for footer (in /public) */
export const FOOTER_BRAND_IMAGES = [
  { name: "Keller Williams", src: "/keller-williams.webp", alt: "Keller Williams" },
  { name: "MLS", src: "/mls.webp", alt: "MLS" },
] as const;
