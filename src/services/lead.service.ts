import type { LeadInput } from "@/types";

/**
 * Result of submitting a lead to an external endpoint.
 */
export interface LeadSubmissionResult {
  ok: boolean;
  error?: string;
}

/**
 * Abstraction for sending leads to a CRM/webhook.
 * Allows swapping implementation (e.g. Rolu, HubSpot) without changing the action.
 * Dependency Inversion: action depends on this contract, not on fetch directly.
 */
export interface ILeadSubmissionService {
  submit(payload: LeadInput, webhookUrl: string): Promise<LeadSubmissionResult>;
}

/**
 * Default implementation: POST payload to the given webhook URL.
 */
async function submitToWebhook(
  payload: LeadInput,
  webhookUrl: string
): Promise<LeadSubmissionResult> {
  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    });
    if (res.ok) return { ok: true };
    console.error("[LeadService] webhook rejected submission:", payload.formType, res.status);
  } catch {
    console.error("[LeadService] webhook request failed:", payload.formType);
  }
  return {
    ok: false,
    error: "We couldn't confirm your submission. Please contact us directly, or try again shortly.",
  };
}

/**
 * Default lead submission service (Rolu webhook).
 * Can be replaced with a different implementation for testing or another CRM.
 */
export const leadSubmissionService: ILeadSubmissionService = {
  submit: submitToWebhook,
};
