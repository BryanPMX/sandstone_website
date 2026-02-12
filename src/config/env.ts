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

/**
 * MSL real estate feed (delivered via Rolu webhook). Used to hydrate listings & gallery.
 */
export function getMslFeedUrl(): string | undefined {
  return getEnv("MSL_FEED_URL");
}
