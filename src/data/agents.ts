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
    role: "Texas REALTOR & New Mexico BROKER",
    image: "/images/agents/agent-placeholder-1.jpg",
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
    image: "/images/agents/agent-placeholder-2.jpg",
    bio: "Adrian supports the Sandstone team through modern marketing, strong brand presentation, and creative strategies that help agents and properties stand out.",
    specialties: [
      "Digital marketing",
      "Brand strategy",
      "Content creation",
    ],
  },
  {
    slug: "Zachary-Carrejo",
    name: "Zachary Carrejo",
    role: "Software Engineer Intern",
    image: "/images/agents/agent-placeholder-4.jpg",
    bio: "Zachary is a Software Engineer Intern focused on building modern, reliable, and user-friendly digital experiences. He supports Sandstone through website development, technical improvements, troubleshooting, and the creation of tools that help the team work more efficiently.",
    specialties: ["Web development","Software engineering","Technical support","Process automation",
    ],
  },
  {
    slug: "begoña-gomez",
    name: "Begoña Gomez",
    role: "Texas Realtor",
    image: "/images/agents/agent-placeholder-3.jpg",
    bio: "Begoña is a dedicated Sales Associate with a passion for helping clients find the right home. She brings a knowledgeable, responsive, and personalized approach to every transaction.",
    specialties: ["Residential real estate","Buyer representation","Seller representation",
    ],
  },
  {
    slug: "michael-torres",
    name: "Michael Torres",
    role: "REALTOR®",
    image: "/images/agents/agent-placeholder-5.jpg",
    bio: "Michael helps buyers and sellers navigate the real estate process with clear communication, local market knowledge, and a strong commitment to client service.",
    specialties: [
      "Buyer representation",
      "Seller representation",
      "First-time homebuyers",
    ],
  },
  {
    slug: "sophia-martinez",
    name: "Sophia Martinez",
    role: "REALTOR®",
    image: "/images/agents/agent-placeholder-6.jpg",
    bio: "Sophia provides attentive and personalized real estate guidance to clients throughout every stage of their transaction. She is committed to making the buying and selling process feel organized and approachable.",
    specialties: [
      "Residential real estate",
      "Relocation",
      "New construction",
    ],
  },
  {
    slug: "daniel-ramirez",
    name: "Daniel Ramirez",
    role: "Buyer Specialist",
    image: "/images/agents/agent-placeholder-7.jpg",
    bio: "Daniel specializes in helping buyers understand the local market, evaluate their options, and move forward with confidence when purchasing a home.",
    specialties: [
      "Buyer representation",
      "Market research",
      "Property tours",
    ],
  },
  {
    slug: "olivia-garcia",
    name: "Olivia Garcia",
    role: "Listing Specialist",
    image: "/images/agents/agent-placeholder-8.jpg",
    bio: "Olivia works closely with homeowners to prepare, position, and market their properties effectively. Her goal is to create a smooth listing experience from preparation through closing.",
    specialties: [
      "Seller representation",
      "Listing preparation",
      "Property marketing",
    ],
  },
  {
    slug: "james-wilson",
    name: "James Wilson",
    role: "Transaction Coordinator",
    image: "/images/agents/agent-placeholder-9.jpg",
    bio: "James supports the Sandstone team by coordinating transaction details, managing important deadlines, and helping ensure that each closing progresses smoothly.",
    specialties: [
      "Transaction coordination",
      "Document management",
      "Closing support",
    ],
  },
  {
    slug: "isabella-lopez",
    name: "Isabella Lopez",
    role: "Client Care Coordinator",
    image: "/images/agents/agent-placeholder-10.jpg",
    bio: "Isabella helps create a welcoming and organized experience for Sandstone clients. She supports communication, scheduling, and follow-up throughout the client journey.",
    specialties: [
      "Client communication",
      "Scheduling",
      "Customer service",
    ],
  },
];

export function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find((agent) => agent.slug === slug);
}