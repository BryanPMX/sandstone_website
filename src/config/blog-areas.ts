export const BLOG_AREAS = [
  { slug: 'upper-valley-el-paso', label: 'Upper Valley El Paso' },
  { slug: 'horizon-city-tx',      label: 'Horizon City TX' },
  { slug: 'fort-bliss',           label: 'Fort Bliss' },
  { slug: 'west-el-paso',         label: 'West El Paso' },
  { slug: 'northeast-el-paso',    label: 'Northeast El Paso' },
  { slug: 'santa-teresa-nm',      label: 'Santa Teresa NM' },
  { slug: 'canutillo-tx',         label: 'Canutillo TX' },
] as const;

export type BlogAreaSlug = typeof BLOG_AREAS[number]['slug'];

export function getAreaLabel(slug: string): string | undefined {
  return BLOG_AREAS.find((a) => a.slug === slug)?.label;
}

export function isValidAreaSlug(slug: string): slug is BlogAreaSlug {
  return BLOG_AREAS.some((a) => a.slug === slug);
}
