"use server";

import { z } from "zod";
import { getListingInquiryWebhookUrl } from "@/config";
import { leadSubmissionService } from "@/services";
import type { SubmitLeadState } from "@/types";

const ListingInquirySchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(140),

  email: z.string().trim().email("Invalid email address"),

  phone: z.string().trim().min(1, "Phone is required").max(30),

  inquiryType: z.enum(["information", "tour", "question"]),

  message: z.string().trim().max(2000).optional().default(""),

  listingTitle: z.string().max(220).optional().default(""),
  listingRouteId: z.string().max(120).optional().default(""),
  listingNumber: z.string().max(80).optional().default(""),
  listingSparkId: z.string().max(120).optional().default(""),
  listingPath: z.string().max(240).optional().default(""),
  listingPrice: z.string().max(120).optional().default(""),
  listingAgentName: z.string().max(140).optional().default(""),
});

const inquiryLabels = {
  information: "Request More Information",
  tour: "Schedule a Property Tour",
  question: "Ask a Question",
} as const;

function splitFullName(fullName: string): {
  firstName: string;
  lastName: string;
} {
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
  formData: FormData,
): Promise<SubmitLeadState> {
  const parsed = ListingInquirySchema.safeParse({
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),

    inquiryType: String(formData.get("inquiryType") ?? ""),
    message: String(formData.get("message") ?? ""),

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

  const data = parsed.data;

  const { firstName, lastName } = splitFullName(data.fullName);

  const inquiryLabel = inquiryLabels[data.inquiryType];

  const detailParts = [
    `Inquiry Type: ${inquiryLabel}`,

    data.message ? `Visitor Message: ${data.message}` : null,

    data.listingTitle ? `Listing: ${data.listingTitle}` : null,

    data.listingRouteId ? `Listing Route ID: ${data.listingRouteId}` : null,

    data.listingNumber ? `MLS Number: ${data.listingNumber}` : null,

    data.listingSparkId ? `Spark ID: ${data.listingSparkId}` : null,

    data.listingPrice ? `List Price: ${data.listingPrice}` : null,

    data.listingPath ? `Listing Path: ${data.listingPath}` : null,

    data.listingAgentName ? `Flex MLS Agent: ${data.listingAgentName}` : null,
  ].filter((item): item is string => Boolean(item));

  const message = [
    "Listing inquiry submitted from property detail page.",
    ...detailParts,
  ].join("\n");

  const result = await leadSubmissionService.submit(
    {
      formType: "contact",
      firstName,
      lastName,
      email: data.email,
      phone: data.phone,

      acceptTransactionalSms: false,
      acceptMarketingSms: false,

      message,
      listingTitle: data.listingTitle,
    },
    webhookUrl,
  );

  if (!result.ok) {
    return {
      success: false,
      error: result.error ?? "Something went wrong. Please try again later.",
    };
  }

  return {
    success: true,
    message: "Thanks! We received your inquiry and will contact you shortly.",
  };
}
