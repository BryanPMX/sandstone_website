export type AgentSocialPlatform = "facebook" | "instagram" | "linkedin";

export interface AgentSocial {
  platform: AgentSocialPlatform;
  href: string;
  handle?: string;
}

export interface AgentProfile {
  name: string;
  title?: string;
  phone?: string;
  email?: string;
  image: string;
  tagline?: string;
  about?: string;
  dealsClosed?: string;
  specialties?: string[];
  socials?: AgentSocial[];
}
