import "server-only";

const DEFAULT_RETRY_SECONDS = 60;
const cooldowns = new Map<string, number>();
const pending = new Map<string, Promise<Response>>();

export class SparkRateLimitError extends Error {
  constructor(public readonly retryAfterSeconds: number) {
    super(`[Spark] Rate limited (429). Retry after ${retryAfterSeconds} seconds.`);
    this.name = "SparkRateLimitError";
  }
}

export function getSparkRetryAfterSeconds(): number {
  const now = Date.now();
  return Math.max(0, ...Array.from(cooldowns.values(), (until) => Math.ceil((until - now) / 1000)));
}

function parseRetryAfter(value: string | null): number {
  if (!value?.trim()) return DEFAULT_RETRY_SECONDS;
  const seconds = Number(value);
  if (Number.isFinite(seconds) && seconds >= 0) return Math.max(1, Math.ceil(seconds));
  const date = Date.parse(value);
  return Number.isFinite(date)
    ? Math.max(1, Math.ceil((date - Date.now()) / 1000))
    : DEFAULT_RETRY_SECONDS;
}

/** Coalesce identical requests and stop this instance's requests for an account
 * during Spark's cooldown. Persistent collection caching is handled separately. */
export async function fetchWithSparkBackoff(
  url: string,
  request: RequestInit,
  accountKey: string
): Promise<Response> {
  const remaining = Math.ceil(((cooldowns.get(accountKey) ?? 0) - Date.now()) / 1000);
  if (remaining > 0) throw new SparkRateLimitError(remaining);
  cooldowns.delete(accountKey);

  const key = JSON.stringify([accountKey, url, request.cache]);
  let promise = pending.get(key);
  if (!promise) {
    promise = (async () => {
      const response = await fetch(url, request);
      if (response.status === 429) {
        const seconds = parseRetryAfter(response.headers.get("Retry-After"));
        cooldowns.set(accountKey, Math.max(cooldowns.get(accountKey) ?? 0, Date.now() + seconds * 1000));
        throw new SparkRateLimitError(seconds);
      }
      return response;
    })();
    pending.set(key, promise);
  }
  try {
    // Each reader gets its own body stream.
    return (await promise).clone();
  } finally {
    if (pending.get(key) === promise) pending.delete(key);
  }
}
