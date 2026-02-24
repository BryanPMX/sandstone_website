"use server";

import { LeadSchema } from "@/schemas";
import { getLeadWebhookUrl, getTurnstileSecretKey } from "@/config";
import { captchaVerificationService, leadSubmissionService } from "@/services";
import type { LeadFormType, SubmitLeadState } from "@/types";
import { zodIssuesToFieldErrors } from "@/lib/zod";

/**
 * Server Action: validate lead form, then submit to CRM (Rolu webhook).
 * Single responsibility: orchestrate validation + submission; delegates to schema and service.
 */
export async function submitLeadForForm(
  formType: LeadFormType,
  _prevState: SubmitLeadState | null,
  formData: FormData
): Promise<SubmitLeadState> {
  const raw = {
    firstName: formData.get("firstName") ?? "",
    lastName: formData.get("lastName") ?? "",
    email: formData.get("email") ?? "",
    phone: formData.get("phone") ?? "",
    message: formData.get("message") ?? "",
    acceptPrivacyPolicy: formData.get("acceptPrivacyPolicy") ?? "",
    acceptTermsConditions: formData.get("acceptTermsConditions") ?? "",
  };
  const captchaToken = String(formData.get("cf-turnstile-response") ?? "");

  const parsed = LeadSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: zodIssuesToFieldErrors(parsed.error.issues),
    };
  }

  if (!captchaToken) {
    return {
      success: false,
      error: "Please complete the captcha before submitting.",
      fieldErrors: {
        captcha: ["Please complete the captcha before submitting."],
      },
    };
  }

  const turnstileSecretKey = getTurnstileSecretKey();

  if (!turnstileSecretKey) {
    console.error("TURNSTILE_SECRET_KEY is not set");
    return {
      success: false,
      error: "Captcha is not configured. Please try again later.",
      fieldErrors: {
        captcha: ["Captcha is not configured."],
      },
    };
  }

  const captchaResult = await captchaVerificationService.verify(
    captchaToken,
    turnstileSecretKey
  );

  if (!captchaResult.ok) {
    return {
      success: false,
      error: captchaResult.error ?? "Captcha verification failed. Please try again.",
      fieldErrors: {
        captcha: [captchaResult.error ?? "Captcha verification failed."],
      },
    };
  }

  const webhookUrl = getLeadWebhookUrl(formType);

  if (!webhookUrl) {
    console.error(`ROLU webhook URL is not set for form type: ${formType}`);
    return {
      success: false,
      error:
        "Lead submission is not configured. Please try again later.",
    };
  }

  const leadPayload = {
    firstName: parsed.data.firstName,
    lastName: parsed.data.lastName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    message: parsed.data.message,
  };
  const result = await leadSubmissionService.submit(leadPayload, webhookUrl);

  if (!result.ok) {
    return {
      success: false,
      error: result.error ?? "Something went wrong. Please try again later.",
    };
  }

  return { success: true, message: "Thank you. We'll be in touch soon." };
}

export async function submitLead(
  prevState: SubmitLeadState | null,
  formData: FormData
): Promise<SubmitLeadState> {
  return submitLeadForForm("contact", prevState, formData);
}
