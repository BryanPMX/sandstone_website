"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: Record<string, string | boolean>,
  ) => string;
  remove?: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function TurnstileWidget({
  siteKey,
  formType,
}: {
  siteKey: string;
  formType: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    let isCancelled = false;
    let pollId: number | null = null;

    const stopPolling = () => {
      if (pollId !== null) {
        window.clearInterval(pollId);
        pollId = null;
      }
    };

    const renderWidget = () => {
      if (
        isCancelled ||
        widgetIdRef.current ||
        !containerRef.current ||
        !window.turnstile?.render
      ) {
        return;
      }

      containerRef.current.innerHTML = "";

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: "light",
      });

      stopPolling();
    };

    renderWidget();

    window.addEventListener("turnstile-ready", renderWidget);

    if (!widgetIdRef.current) {
      pollId = window.setInterval(renderWidget, 250);
    }

    return () => {
      isCancelled = true;

      window.removeEventListener("turnstile-ready", renderWidget);

      stopPolling();

      if (widgetIdRef.current) {
        window.turnstile?.remove?.(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [formType, siteKey]);

  return (
    <>
      <Script
        id="cloudflare-turnstile-api"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => {
          window.dispatchEvent(new Event("turnstile-ready"));
        }}
      />

      <div
        ref={containerRef}
        data-turnstile-form={formType}
        className="min-h-[65px]"
      />
    </>
  );
}
