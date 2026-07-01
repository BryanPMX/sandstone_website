/**
 * Site-wide content and links.
 * Single source of truth for labels, legal links, and static copy.
 */
export const SITE_NAV = [
  { label: "PCS", href: "/pcs" },
  { label: "Blog", href: "/blog" },
  { label: "Areas", href: "/areas" },
  { label: "Contact Us", href: "/#contact" },
] as const;

export const AREAS_NAV_MENU = [
  { label: "Upper Valley El Paso",         href: "/areas/upper-valley" },
  { label: "Lower Valley El Paso", href: "/areas/lower-valley" },
  { label: "West El Paso",                 href: "/areas/west-el-paso" },
  { label: "Northeast El Paso",            href: "/areas/northeast-el-paso" },
  { label: "Horizon City TX",              href: "/areas/horizon-city-tx" },
  { label: "Santa Teresa NM",              href: "/areas/santa-teresa-nm" },
  { label: "Canutillo TX",                 href: "/areas/canutillo-tx" },
  { label: "Sandstone's New Builds",        href: "/areas/sandstones-new-builds" },
] as const;

export const CONTACT_US_MENU = [
  { label: "Sell a property", href: "/sell" },
  { label: "Rent a property", href: "/rent" },
  { label: "Join the Team", href: "/join" },
  { label: "Deer Vallye Ranch Estates", href: "/deer-valley-ranch-estates"},
  { label: "Contact Us", href: "/#contact" },
] as const;

export const FOOTER_NAV = [
  { label: "PCS", href: "/pcs" },
  ...CONTACT_US_MENU,
  { label: "Blog", href: "/blog" },
] as const;

export const SITE_BRAND = "Sandstone Real Estate Group";
export const SMS_DISCLOSURE_BRAND = `${SITE_BRAND} by Keller Williams`;

export const SITE_CONTACT = {
  phone: "+1 (915) 277-6707",
  phoneRaw: "9152776707",
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

export const HOME_FAQ_ES = [
  {
    question: "¿Cuáles son las mejores empresas de Real Estate Group en El Paso, Texas?",
    answer:
      "En El Paso, Texas, la mejor empresa de Real Estate Group depende de tus necesidades (compra, venta o inversión). Algunas de las más reconocidas incluyen Keller Williams Realty, RE/MAX, Coldwell Banker, Compass y eXp Realty, todas con presencia en el área de El Paso. Estas empresas destacan por su conocimiento del mercado local, acceso a listados en el MLS y experiencia en propiedades residenciales y comerciales en la región fronteriza.",
  },
  {
    question: "¿Cuánto cuesta contratar a una empresa de Real Estate Group en El Paso?",
    answer:
      "En El Paso, el costo de contratar una empresa inmobiliaria generalmente se basa en comisión y no en pagos por adelantado. La comisión estándar suele estar entre el 5% y el 6% del precio de venta de la propiedad. Normalmente, el vendedor paga esta comisión, la cual se divide entre el agente del vendedor y el del comprador. Para compradores, los servicios suelen ser gratuitos en términos de comisión directa, aunque deben considerar costos de cierre que pueden variar entre el 2% y el 5% del valor del préstamo.",
  },
  {
    question: "¿Qué servicios ofrece un Real Estate Group en El Paso?",
    answer:
      "Un Real Estate Group en El Paso ofrece servicios como análisis de mercado comparativo (CMA) basado en ventas recientes en la ciudad, marketing inmobiliario con fotografía profesional y tours virtuales, publicación en el MLS y portales como Zillow o Realtor.com, negociación de ofertas, gestión de trámites legales, inspecciones y tasaciones, así como asesoría en inversión inmobiliaria en zonas de alto crecimiento dentro de El Paso.",
  },
  {
    question: "¿Cómo elegir la mejor empresa de Real Estate Group en El Paso?",
    answer:
      "Para elegir la mejor empresa inmobiliaria en El Paso, es importante considerar su experiencia en vecindarios específicos como West El Paso, Eastside o Horizon City, revisar opiniones en Google, Zillow o Yelp, evaluar las herramientas tecnológicas que utilizan para marketing y búsqueda de propiedades, verificar su especialización (residencial o comercial) y asegurarse de que tengan una comunicación rápida y efectiva en un mercado competitivo.",
  },
] as const;

export const HOME_FAQ_EN = [
  {
    question: "What are the best real estate groups in El Paso, Texas?",
    answer:
      "In El Paso, Texas, the best real estate group depends on your goals (buying, selling, or investing). Some of the most recognized companies include Keller Williams Realty, RE/MAX, Coldwell Banker, Compass, and eXp Realty, all with a presence in the El Paso area. These firms stand out for their local market knowledge, access to MLS listings, and experience with both residential and commercial properties in the border region.",
  },
  {
    question: "How much does it cost to hire a real estate group in El Paso?",
    answer:
      "In El Paso, the cost of hiring a real estate company is generally commission-based rather than paid upfront. The standard commission is usually between 5% and 6% of the home's sale price. In most cases, the seller pays this commission, and it is split between the listing agent and the buyer's agent. For buyers, agent services are often free in terms of direct commission, though they should plan for closing costs that may range from 2% to 5% of the loan amount.",
  },
  {
    question: "What services does a real estate group in El Paso offer?",
    answer:
      "A real estate group in El Paso typically offers services such as comparative market analysis (CMA) based on recent city sales, property marketing with professional photography and virtual tours, listing distribution through MLS and portals like Zillow or Realtor.com, offer negotiation, legal paperwork coordination, inspections and appraisals support, and investment guidance in high-growth areas across El Paso.",
  },
  {
    question: "How do you choose the best real estate group in El Paso?",
    answer:
      "To choose the best real estate company in El Paso, review its experience in specific neighborhoods like West El Paso, Eastside, or Horizon City, check ratings on Google, Zillow, or Yelp, evaluate the technology they use for marketing and property search, confirm whether they specialize in residential or commercial transactions, and make sure they provide fast, effective communication in a competitive market.",
  },
] as const;

const toFaqMainEntity = (items: ReadonlyArray<{ question: string; answer: string }>) =>
  items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }));

export const HOME_FAQ_SCHEMA_ES = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
  mainEntity: toFaqMainEntity(HOME_FAQ_ES),
} as const;

export const HOME_FAQ_SCHEMA_EN = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "en",
  mainEntity: toFaqMainEntity(HOME_FAQ_EN),
} as const;
