/**
 * Shared blog post contracts used across services and App Router pages.
 */
export interface BlogPostFrontmatter {
  title: string;
  cardTitle?: string;
  date: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt?: string;
  keywords?: string[];
  seoTitle?: string;
  metaDescription?: string;
  area: string;
}

export interface BlogPostListItem extends BlogPostFrontmatter {
  slug: string;
  readingMinutes: number;
}

export interface BlogPost extends BlogPostListItem {
  contentHtml: string;
}

