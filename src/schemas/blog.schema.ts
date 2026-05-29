import { z } from "zod";

const BlogDateSchema = z.preprocess(
  (value) => {
    if (value instanceof Date) {
      return value.toISOString();
    }

    return value;
  },
  z
    .string()
    .min(1, "Date is required")
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: "Date must be a valid ISO/date string",
    })
);

/**
 * Validation contract for blog markdown frontmatter.
 */
export const BlogSchema = z.object({
  title: z.string().min(1, "Title is required").max(160),
  date: BlogDateSchema,
  excerpt: z.string().min(1, "Excerpt is required").max(320),
  coverImage: z.string().min(1, "Cover image is required").max(500),
  keywords: z.array(z.string()).optional(),
  metaDescription: z.string().optional(),
  seoTitle: z.string().optional(),
});

export type BlogSchemaType = z.infer<typeof BlogSchema>;
