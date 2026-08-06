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
    bio: "Alejandro Gamboa is the Team Leader of the Sandstone Real Estate Team under Keller Williams. Licensed in both Texas and New Mexico, Alejandro brings a strong background in service and leadership. He is a U.S. Navy veteran, a retired El Paso County police officer, and a home builder. Serving and protecting people has always been at the center of his work.",
    license: "Licensed in Texas and New Mexico",
    specialties: [
      "Residential real estate",
      "Buyer representation",
      "Seller representation",
    ],
  },
  {
    slug: "adrian-rodriguez",
    name: "Adrian Rodriguez",
    role: "Marketing Manager",
    image: "/agents/adrian-headshot.png",
    bio: "Adrian supports the Sandstone team through modern marketing, strong brand presentation, and creative strategies that help agents and properties stand out.",
    specialties: [
      "Digital marketing",
      "Brand strategy",
      "Content creation",
    ],
  },
  {
    slug: "jorge-gamboa-jr",
    name: "Jorge Gamboa Jr.",
    role: "Texas REALTOR®",
    image: "/agents/jr-headshot.png",
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
    slug: "cassie-majestic",
    name: "Cassie Majestic",
    role: "Texas REALTOR®",
    image: "/agents/cassie-headshot.png",
    bio: "Cassie is a dedicated real estate professional who helps buyers and sellers move forward with confidence. She provides attentive service, clear communication, and personalized guidance throughout the real estate process.",
    specialties: [
      "Residential real estate",
      "Buyer representation",
      "Seller representation",
    ],
  },
  {
    slug: "zachary-carrejo",
    name: "Zachary Carrejo",
    role: "Software Engineer Intern",
    image: "/agents/zachary-headshot.png",
    bio: "Zachary is a Software Engineer Intern focused on building modern, reliable, and user-friendly digital experiences. He supports Sandstone through website development, technical improvements, troubleshooting, and the creation of tools that help the team work more efficiently.",
    specialties: [
      "Web development",
      "Software engineering",
      "Technical support",
      "Process automation",
    ],
  },
];

export function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find((agent) => agent.slug === slug);
}