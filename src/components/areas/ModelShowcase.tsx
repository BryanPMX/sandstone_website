"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Info } from "lucide-react";
import { ModelPhotoCarousel } from "./ModelPhotoCarousel";

export type ModelSpecBox = {
  icon: string;
  value: string;
  label: string;
};

export type HomeModel = {
  id: string;
  label: string;
  name: string;
  community: string;
  specsLine: string;
  description: string;
  price: string;
  photos: { src: string; alt: string }[];
  specBoxes: ModelSpecBox[];
};

export function ModelShowcase({ models }: { models: HomeModel[] }) {
  const [activeId, setActiveId] = useState(models[0].id);
  const active = models.find((m) => m.id === activeId) ?? models[0];

  return (
    <div>
      {/* Tab switcher */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {models.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setActiveId(m.id)}
            className={`min-h-12 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wide transition ${
              activeId === m.id
                ? "bg-[var(--sandstone-navy)] text-white shadow-sm"
                : "border border-[var(--sandstone-navy)]/25 text-[var(--sandstone-navy)] hover:border-[var(--sandstone-sand-gold)] hover:text-[var(--sandstone-navy-deep)]"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Smaller carousel */}
      <div className="mx-auto max-w-4xl">
        <ModelPhotoCarousel images={active.photos} />
      </div>

      {/* Model info — two columns */}
      <div className="mt-8 flex flex-col gap-8 border-t border-[var(--sandstone-navy)]/10 pt-8 lg:flex-row lg:gap-12">
        {/* Left: name, specs line, description */}
        <div className="flex-1">
          <p className="font-heading text-4xl font-black tracking-tight text-[var(--sandstone-navy)]">
            {active.name}
          </p>

          <p className="mt-1 text-sm font-bold uppercase tracking-[0.12em] text-[var(--sandstone-navy)]">
            {active.community}
          </p>

          <p className="mt-3 text-base leading-relaxed text-[var(--sandstone-charcoal)]/85">
            {active.specsLine}
          </p>

          <p className="mt-4 text-base leading-relaxed text-[var(--sandstone-charcoal)]/85">
            {active.description}
          </p>
        </div>

        {/* Right: price + CTA buttons */}
        <div className="flex min-w-0 flex-col items-start lg:min-w-[220px] lg:items-end">
          {active.price.trim() ? (
            <>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--sandstone-charcoal)]/85">
                Starting From
              </p>
              <p className="mt-1 font-heading text-4xl font-black text-[var(--sandstone-navy)]">
                {active.price}
              </p>
            </>
          ) : (
            <Link
              href="#contact"
              className="text-sm font-semibold text-[var(--sandstone-navy)] underline underline-offset-4 hover:text-[var(--sandstone-navy-deep)]"
            >
              Contact us for current pricing.
            </Link>
          )}

          <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <Link
              href="#contact"
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg text-center sm:w-auto bg-[var(--sandstone-navy)] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:opacity-85"
            >
              <Calendar size={15} strokeWidth={2} />
              Schedule a Tour
            </Link>

            <Link
              href="#contact"
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg text-center sm:w-auto border border-[var(--sandstone-navy)]/25 px-5 py-3 text-sm font-bold uppercase tracking-wide text-[var(--sandstone-navy)] transition hover:border-[var(--sandstone-sand-gold)] hover:text-[var(--sandstone-navy-deep)]"
            >
              <Info size={15} strokeWidth={2} />
              Request Information
            </Link>
          </div>
        </div>
      </div>

      {/* Full-width spec grid */}
      <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--sandstone-navy)]/10 bg-[var(--sandstone-navy)]/10 sm:grid-cols-6">
        {active.specBoxes.map(({ icon, value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1.5 bg-white px-3 py-5 text-center"
          >
            <div className="relative h-9 w-9">
              <Image
                src={icon}
                alt=""
                fill
                sizes="36px"
                className="object-contain"
              />
            </div>

            <p className="font-heading text-base font-bold leading-snug text-[var(--sandstone-navy)]">
              {value}
            </p>

            <p className="text-sm leading-snug text-[var(--sandstone-charcoal)]/85">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
