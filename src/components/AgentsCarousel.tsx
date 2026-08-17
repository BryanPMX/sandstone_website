"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Agent } from "@/data/agents";

type AgentsCarouselProps = {
  agents: Agent[];
};

const AUTO_PLAY_DELAY = 5000;

export function AgentsCarousel({ agents }: AgentsCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const getCarouselStep = useCallback(() => {
    const carousel = carouselRef.current;
    const firstCard = carousel?.firstElementChild as HTMLElement | null;

    if (!carousel || !firstCard) return 0;

    const styles = window.getComputedStyle(carousel);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");
    const singleCardStep = firstCard.offsetWidth + gap;

    const visibleCards = Math.max(
      1,
      Math.round((carousel.clientWidth + gap) / singleCardStep)
    );

    return singleCardStep * visibleCards;
  }, []);

  const moveCarousel = useCallback(
    (direction: "left" | "right") => {
      const carousel = carouselRef.current;
      const step = getCarouselStep();

      if (!carousel || step === 0 || agents.length <= 1) return;

      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
      const endTolerance = Math.max(2, step * 0.05);

      const isAtBeginning = carousel.scrollLeft <= endTolerance;
      const isAtEnd = carousel.scrollLeft >= maxScrollLeft - endTolerance;

      if (direction === "right") {
        carousel.scrollTo({
          left: isAtEnd
            ? 0
            : Math.min(carousel.scrollLeft + step, maxScrollLeft),
          behavior: "smooth",
        });
      } else {
        carousel.scrollTo({
          left: isAtBeginning
            ? maxScrollLeft
            : Math.max(carousel.scrollLeft - step, 0),
          behavior: "smooth",
        });
      }
    },
    [agents.length, getCarouselStep]
  );

  useEffect(() => {
    if (isPaused || agents.length <= 1) return;

    const interval = window.setInterval(() => {
      moveCarousel("right");
    }, AUTO_PLAY_DELAY);

    return () => window.clearInterval(interval);
  }, [agents.length, isPaused, moveCarousel]);

  if (agents.length === 0) return null;

  return (
    <div
      className="relative mt-9"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-[9px] font-semibold tracking-[0.18em] text-[#8b7355]">
          {isPaused ? "CAROUSEL PAUSED" : "AUTO-ROTATES EVERY 5 SECONDS"}
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => moveCarousel("left")}
            aria-label="View previous agents"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#17211d]/20 bg-white text-lg text-[#17211d] transition hover:border-[#17211d] hover:bg-[#17211d] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17211d]"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => moveCarousel("right")}
            aria-label="View next agents"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#17211d]/20 bg-white text-lg text-[#17211d] transition hover:border-[#17211d] hover:bg-[#17211d] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17211d]"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        aria-label="Sandstone agents"
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {agents.map((agent, index) => (
          <article
            key={agent.slug}
            className="min-w-full snap-start sm:min-w-[calc((100%-1.25rem)/2)] lg:min-w-[calc((100%-2.5rem)/3)]"
          >
            <Link
              href={`/agents/${agent.slug}`}
              aria-label={`View ${agent.name} bio`}
              className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#17211d]"
            >
              <div className="relative aspect-[4/4.7] overflow-hidden bg-[#17211d] shadow-[0_18px_45px_rgba(23,33,29,0.12)]">
                <img
                  src={agent.image}
                  alt={agent.name}
                  loading={index < 3 ? "eager" : "lazy"}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#101814]/95 via-[#101814]/10 to-transparent" />

                <div className="absolute inset-3 border border-white/0 transition duration-500 group-hover:inset-4 group-hover:border-white/30" />

                <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-black/15 text-base text-white opacity-0 backdrop-blur-sm transition duration-300 group-hover:opacity-100">
                  →
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-[10px] font-semibold tracking-[0.2em] text-[#d8c3a5]">
                    {agent.role}
                  </p>

                  <h3 className="mt-2 font-serif text-2xl leading-tight text-white sm:text-3xl">
                    {agent.name}
                  </h3>

                  <p className="mt-3 text-[9px] font-semibold tracking-[0.16em] text-white/70">
                    VIEW BIO →
                  </p>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      <p className="text-center text-[9px] font-semibold tracking-[0.18em] text-[#8b7355] sm:hidden">
        SWIPE TO VIEW MORE
      </p>
    </div>
  );
}