export type Agent = {
  slug: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  phone?: string;
  email?: string;
  license?: string;
  specialties?: string[];
};

export const agents: Agent[] = [
  {
    slug: "alejandro-gamboa",
    name: "Alejandro Gamboa",
    role: "Texas REALTOR® & New Mexico Broker",
    image: "/agents/alejandro-headshot.png",
    bio: "I specialize in helping clients buy and sell luxury homes, while also proudly serving military families, veterans, and first responders looking to buy, build, or sell near Fort Bliss. I serve the entire El Paso and Las Cruces community with the same integrity, discipline, and dedication I brought to every post I’ve held.",
    license:
      "U.S. Navy Veteran • Retired El Paso County Police Officer • Home Builder • REALTOR®",
    specialties: [
      "Luxury real estate",
      "Military relocation",
      "New construction",
      "Residential real estate",
    ],
  },
  {
    slug: "jorge-gamboa-jr",
    name: "Jorge Gamboa Jr.",
    role: "Texas REALTOR®",
    image: "/agents/Jr-headshot.png",
    bio: "Jorge is a dedicated real estate professional who helps clients confidently navigate the home-buying and selling process. He brings a responsive, knowledgeable, and personalized approach to every transaction.",
    specialties: [
      "Residential real estate",
      "Buyer representation",
      "Seller representation",
    ],
  },
  {
    slug: "jorge-gamboa",
    name: "Jorge Gamboa",
    role: "Texas REALTOR®",
    image: "/agents/jorge-headshot.png",
    bio: "Jorge is a dedicated real estate professional with a passion for helping clients find the right home. He provides knowledgeable guidance, responsive communication, and personalized service throughout every transaction.",
    specialties: [
      "Residential real estate",
      "Buyer representation",
      "Seller representation",
    ],
  },
  {
    slug: "begona-gomez",
    name: "Begoña Gomez",
    role: "Texas REALTOR®",
    image: "/agents/begona-headshot.png",
    bio: "Begoña is a dedicated real estate professional with a passion for helping clients find the right home. She brings a knowledgeable, responsive, and personalized approach to every transaction.",
    specialties: [
      "Residential real estate",
      "Buyer representation",
      "Seller representation",
    ],
  },
  {
    slug: "abril-hernandez",
    name: "Abril Hernandez",
    role: "Texas REALTOR®",
    // Initials placeholder until Abril's headshot is available.
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 1000'%3E%3Cpath fill='%2317211d' d='M0 0h800v1000H0z'/%3E%3Ctext x='400' y='440' text-anchor='middle' fill='%23d8c3a5' font-family='Georgia' font-size='130'%3EAH%3C/text%3E%3C/svg%3E",
    bio: "Meet Abril Hernandez, a member of the Sandstone Real Estate Group team.",
  },
];

export function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find((agent) => agent.slug === slug);
}