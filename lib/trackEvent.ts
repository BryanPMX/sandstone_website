import { supabase } from "./supabase";

export async function trackEvent(
  eventType: string,
  elementName?: string,
  metadata: Record<string, unknown> = {}
) {
  try {
    await supabase.from("website_events").insert({
      event_type: eventType,
      page_url:
        typeof window !== "undefined" ? window.location.href : null,
      page_path:
        typeof window !== "undefined" ? window.location.pathname : null,
      element_name: elementName ?? null,
      metadata,
    });
  } catch (error) {
    console.error("Tracking error:", error);
  }
}