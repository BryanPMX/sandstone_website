/**
 * Shared blog post contracts used across services and App Router pages.
 */
export interface BlogPostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  keywords?: string[];
  seoTitle?: string;
  metaDescription?: string;
}

export interface BlogPostListItem extends BlogPostFrontmatter {
  slug: string;
}

export interface BlogPost extends BlogPostListItem {
  contentHtml: string;
}

