import type { LeadFormType } from "@/types";

/**
 * Centralized environment configuration.
 * Single place for env contract; avoids scattering process.env across the app.
 */
function getEnv(key: string): string | undefined {
  return process.env[key];
}

export function getRoluWebhookUrl(): string | undefined {
  return getEnv("ROLU_WEBHOOK_URL");
}

export function getLeadWebhookUrl(formType: LeadFormType): string | undefined {
  const formWebhookEnvKey: Record<LeadFormType, string> = {
    contact: "ROLU_WEBHOOK_CONTACT_URL",
    sell: "ROLU_WEBHOOK_SELL_URL",
    rent: "ROLU_WEBHOOK_RENT_URL",
    join: "ROLU_WEBHOOK_JOIN_URL",
  };

  const resolved = getEnv(formWebhookEnvKey[formType]);

  if (resolved) {
    return resolved;
  }

  // Backward compatibility with the original single-form setup.
  if (formType === "contact") {
    return getRoluWebhookUrl();
  }

  return undefined;
}

export function getTurnstileSecretKey(): string | undefined {
  return getEnv("TURNSTILE_SECRET_KEY");
}

export function getTurnstileSiteKey(): string | undefined {
  return getEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY");
}

/**
 * MSL real estate feed (delivered via Rolu webhook). Used to hydrate listings & gallery.
 */
export function getMslFeedUrl(): string | undefined {
  return getEnv("MSL_FEED_URL");
}
