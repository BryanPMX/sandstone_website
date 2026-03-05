"use server";

import { z } from "zod";
import { getListingInquiryWebhookUrl } from "@/config";
import { leadSubmissionService } from "@/services";
import type { SubmitLeadState } from "@/types";

const ListingInquirySchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(140),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required").max(30),
  listingTitle: z.string().max(220).optional().default(""),
  listingRouteId: z.string().max(120).optional().default(""),
  listingNumber: z.string().max(80).optional().default(""),
  listingSparkId: z.string().max(120).optional().default(""),
  listingPath: z.string().max(240).optional().default(""),
  listingPrice: z.string().max(120).optional().default(""),
  listingAgentName: z.string().max(140).optional().default(""),
});

function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return { firstName: "", lastName: "" };
  }

  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "N/A" };
  }

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

export async function submitListingInquiry(
  _prevState: SubmitLeadState | null,
  formData: FormData
): Promise<SubmitLeadState> {
  const parsed = ListingInquirySchema.safeParse({
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    listingTitle: String(formData.get("listingTitle") ?? ""),
    listingRouteId: String(formData.get("listingRouteId") ?? ""),
    listingNumber: String(formData.get("listingNumber") ?? ""),
    listingSparkId: String(formData.get("listingSparkId") ?? ""),
    listingPath: String(formData.get("listingPath") ?? ""),
    listingPrice: String(formData.get("listingPrice") ?? ""),
    listingAgentName: String(formData.get("listingAgentName") ?? ""),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const webhookUrl = getListingInquiryWebhookUrl();

  if (!webhookUrl) {
    return {
      success: false,
      error: "Lead submission is not configured. Please try again later.",
    };
  }

  const { firstName, lastName } = splitFullName(parsed.data.fullName);
  const detailParts = [
    parsed.data.listingTitle ? `Listing: ${parsed.data.listingTitle}` : null,
    parsed.data.listingRouteId ? `Listing Route ID: ${parsed.data.listingRouteId}` : null,
    parsed.data.listingNumber ? `MLS Number: ${parsed.data.listingNumber}` : null,
    parsed.data.listingSparkId ? `Spark ID: ${parsed.data.listingSparkId}` : null,
    parsed.data.listingPrice ? `List Price: ${parsed.data.listingPrice}` : null,
    parsed.data.listingPath ? `Listing Path: ${parsed.data.listingPath}` : null,
    parsed.data.listingAgentName ? `Flex MLS Agent: ${parsed.data.listingAgentName}` : null,
  ].filter((item): item is string => Boolean(item));

  const message = detailParts.length > 0
    ? `Listing inquiry submitted from property detail page. ${detailParts.join(" | ")}`
    : "Listing inquiry submitted from property detail page.";

  const result = await leadSubmissionService.submit(
    {
      formType: "contact",
      firstName,
      lastName,
      email: parsed.data.email.trim(),
      phone: parsed.data.phone.trim(),
      acceptTransactionalSms: false,
      acceptMarketingSms: false,
      message,
    },
    webhookUrl
  );

  if (!result.ok) {
    return {
      success: false,
      error: result.error ?? "Something went wrong. Please try again later.",
    };
  }

  return {
    success: true,
    message: "Thanks. We received your inquiry and will contact you shortly.",
  };
}
