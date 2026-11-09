/** 2026 campaign window, in El Paso / America/Denver time (MST, UTC-07:00). */
export const VETERANS_DAY_SCHEDULE = {
  enabled: true, // Set false to disable both tributes immediately after redeploying.
  startsAt: "2026-11-10T20:00:00-07:00",
  endsAt: "2026-11-12T08:00:00-07:00",
};

const startsAt = Date.parse(VETERANS_DAY_SCHEDULE.startsAt);
const endsAt = Date.parse(VETERANS_DAY_SCHEDULE.endsAt);

export function isVeteransDayActive(now = Date.now()): boolean {
  return VETERANS_DAY_SCHEDULE.enabled && now >= startsAt && now < endsAt;
}

/** Next transition, including for visitors who leave a page open overnight. */
export function nextVeteransDayTransition(now = Date.now()): number | null {
  if (!VETERANS_DAY_SCHEDULE.enabled) return null;
  if (now < startsAt) return startsAt;
  if (now < endsAt) return endsAt;
  return null;
}
