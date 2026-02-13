"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, Facebook, Instagram, Linkedin } from "lucide-react";
import type { ComponentType } from "react";
import { AGENTS } from "@/constants/site";
import type { AgentProfile, AgentSocialPlatform } from "@/types";

interface AgentsSectionProps {
  agents?: AgentProfile[];
}

const socialIconByPlatform: Record<
  AgentSocialPlatform,
  ComponentType<{ className?: string }>
> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
};

export function AgentsSection({ agents = AGENTS }: AgentsSectionProps) {
  return (
    <section
      id="agents"
      className="py-[56px] md:py-[70px] scroll-mt-20"
      aria-label="Agents"
    >
      <div className="container mx-auto max-w-5xl px-4">
        <div className="section-frame p-5 sm:p-[28px] md:p-[35px]">
          <motion.h2
            className="font-heading text-2xl font-bold text-sandstone-gold mb-8 text-center md:text-3xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Agents
          </motion.h2>
          <p className="mb-[28px] text-center text-sm text-sandstone-text/70">
            Meet the team behind every showing, negotiation, and closing, available by phone or video.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-[28px]">
            {agents.map((agent, i) => (
              <motion.div
                key={agent.name}
                className="rounded-2xl border border-white/70 bg-white/70 p-5 shadow-[0_16px_35px_-28px_rgba(37,52,113,0.42)] backdrop-blur-md sm:p-[28px]"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <div className="flex items-start gap-4 sm:gap-[21px]">
                  <div className="light-sweep image-structure relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-sandstone-base/30 sm:h-28 sm:w-28">
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      fill
                      className="object-cover"
                      sizes="112px"
                      unoptimized
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-heading text-xl font-bold text-sandstone-gold">{agent.name}</p>
                    {agent.title && (
                      <p className="text-xs font-semibold uppercase tracking-wide text-sandstone-text/70">
                        {agent.title}
                      </p>
                    )}
                    {agent.tagline && (
                      <p className="mt-2 text-sm text-sandstone-text/80 leading-snug">{agent.tagline}</p>
                    )}
                  </div>
                </div>

                {agent.about && (
                  <div className="mt-4 rounded-xl border border-sandstone-base/40 bg-white/55 p-3">
                    <p className="badge-sandstone-accent px-3 py-1 text-[10px] tracking-[0.14em]">
                      About Me
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-sandstone-text/85">{agent.about}</p>
                  </div>
                )}

                {(agent.phone || agent.email) && (
                  <div className="mt-4 grid gap-2 text-sm text-sandstone-text/85">
                    {agent.phone && (
                      <a
                        className="inline-flex items-center gap-2 hover:text-sandstone-gold"
                        href={`tel:${agent.phone.replace(/[^0-9]/g, "")}`}
                      >
                        <Phone className="h-4 w-4 text-sandstone-gold" aria-hidden />
                        {agent.phone}
                      </a>
                    )}
                    {agent.email && (
                      <a
                        className="inline-flex items-center gap-2 break-all hover:text-sandstone-gold"
                        href={`mailto:${agent.email}`}
                      >
                        <Mail className="h-4 w-4 text-sandstone-gold" aria-hidden />
                        {agent.email}
                      </a>
                    )}
                  </div>
                )}

                {agent.specialties && agent.specialties.length > 0 && (
                  <div className="mt-5 space-y-2">
                    <p className="badge-sandstone-dark w-fit px-3 py-1 text-[10px] tracking-[0.14em]">
                      Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {agent.specialties.map((item) => (
                        <span
                          key={`${agent.name}-${item}`}
                          className="badge-sandstone-chip"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {agent.socials && agent.socials.length > 0 && (
                  <div className="mt-6 border-t border-sandstone-base/35 pt-4 flex flex-wrap items-center gap-2">
                    <p className="badge-sandstone-dark w-fit px-3 py-1 text-[10px] tracking-[0.14em]">
                      Social
                    </p>
                    {agent.socials.map((social) => {
                      const Icon = socialIconByPlatform[social.platform];
                      return (
                        <a
                          key={`${agent.name}-${social.platform}`}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="badge-sandstone-chip gap-1.5 hover:-translate-y-px"
                        >
                          <Icon className="h-3.5 w-3.5" aria-hidden />
                          {social.handle ?? social.platform}
                        </a>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
