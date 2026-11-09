"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { VeteransDayAnnouncement } from "@/components/VeteransDayTribute";
import { isVeteransDayActive, nextVeteransDayTransition } from "@/config/veterans-day";

function subscribe(onChange: () => void) {
  let timer: ReturnType<typeof setTimeout> | undefined;

  function update() {
    if (timer !== undefined) clearTimeout(timer);
    onChange();
    const now = Date.now();
    const next = nextVeteransDayTransition(now);
    if (next !== null) {
      // Browser timeouts have a signed 32-bit maximum delay.
      timer = setTimeout(update, Math.min(Math.max(next - now, 1), 2_147_483_647));
    }
  }

  update();
  document.addEventListener("visibilitychange", update);
  window.addEventListener("focus", update);
  window.addEventListener("pageshow", update);
  return () => {
    if (timer !== undefined) clearTimeout(timer);
    document.removeEventListener("visibilitychange", update);
    window.removeEventListener("focus", update);
    window.removeEventListener("pageshow", update);
  };
}

// Static/ISR pages start with the original layout. The browser evaluates the
// live schedule after hydration, so cached builds cannot freeze the campaign on.
const getServerSnapshot = () => false;

function useVeteransDayActive() {
  return useSyncExternalStore(subscribe, isVeteransDayActive, getServerSnapshot);
}

export function VeteransDayOnly({ children }: { children: ReactNode }) {
  return useVeteransDayActive() ? children : null;
}

export function VeteransDayHomeHero() {
  return <HeroSection veteransDay={useVeteransDayActive()} />;
}

export function VeteransDayHomeHeader() {
  const active = useVeteransDayActive();
  return (
    <>
      {active ? <VeteransDayAnnouncement /> : null}
      <SiteHeader overlayDesktop={!active} />
    </>
  );
}
