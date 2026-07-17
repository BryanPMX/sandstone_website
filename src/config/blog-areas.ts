export const BLOG_CATEGORIES = [
  { slug: "military-pcs", label: "Military PCS" },
  { slug: "va-loans", label: "VA Loans" },
  { slug: "buying-a-home", label: "Buying a Home" },
  { slug: "selling-a-home", label: "Selling a Home" },
  { slug: "el-paso-neighborhoods", label: "El Paso Neighborhoods" },
  { slug: "things-to-do-in-el-paso", label: "Things to Do in El Paso" },
  { slug: "market-updates", label: "Market Updates" },
] as const;

export type BlogCategorySlug =
  (typeof BLOG_CATEGORIES)[number]["slug"];

export function getCategoryLabel(
  slug: string
): string | undefined {
  return BLOG_CATEGORIES.find(
    (category) => category.slug === slug
  )?.label;
}

export function isValidCategorySlug(
  slug: string
): slug is BlogCategorySlug {
  return BLOG_CATEGORIES.some(
    (category) => category.slug === slug
  );
}