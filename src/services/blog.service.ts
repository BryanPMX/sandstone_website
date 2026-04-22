import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { BlogSchema } from "@/schemas";
import type { BlogPost, BlogPostListItem } from "@/types";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function normalizeDate(value: string): string {
  return new Date(value).toISOString();
}

async function readBlogFilenames(): Promise<string[]> {
  try {
    const entries = await fs.readdir(BLOG_CONTENT_DIR, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .map((entry) => entry.name);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

function normalizeListItem(slug: string, input: { title: string; date: string; excerpt: string; coverImage: string }): BlogPostListItem {
  return {
    slug,
    title: input.title,
    date: normalizeDate(input.date),
    excerpt: input.excerpt,
    coverImage: input.coverImage,
  };
}

export interface IBlogService {
  getSortedPosts(): Promise<BlogPostListItem[]>;
  getPostBySlug(slug: string): Promise<BlogPost | null>;
  getAllPostSlugs(): Promise<string[]>;
}

async function getSortedPostsImpl(): Promise<BlogPostListItem[]> {
  const filenames = await readBlogFilenames();
  const posts: BlogPostListItem[] = [];

  await Promise.all(
    filenames.map(async (filename) => {
      const slug = filename.replace(/\.md$/, "");
      const fullPath = path.join(BLOG_CONTENT_DIR, filename);
      const raw = await fs.readFile(fullPath, "utf8");
      const parsed = matter(raw);
      const frontmatter = BlogSchema.safeParse(parsed.data);

      if (!frontmatter.success) {
        console.error("[BlogService] Invalid frontmatter:", filename, frontmatter.error.flatten());
        return;
      }

      posts.push(normalizeListItem(slug, frontmatter.data));
    })
  );

  return posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

async function getPostBySlugImpl(slug: string): Promise<BlogPost | null> {
  const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-_]/g, "");

  if (!sanitizedSlug) {
    return null;
  }

  const fullPath = path.join(BLOG_CONTENT_DIR, `${sanitizedSlug}.md`);

  try {
    const raw = await fs.readFile(fullPath, "utf8");
    const parsed = matter(raw);
    const frontmatter = BlogSchema.safeParse(parsed.data);

    if (!frontmatter.success) {
      console.error("[BlogService] Invalid frontmatter:", `${sanitizedSlug}.md`, frontmatter.error.flatten());
      return null;
    }

    const processed = await remark().use(html).process(parsed.content);

    return {
      ...normalizeListItem(sanitizedSlug, frontmatter.data),
      contentHtml: processed.toString(),
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

async function getAllPostSlugsImpl(): Promise<string[]> {
  const filenames = await readBlogFilenames();
  return filenames.map((filename) => filename.replace(/\.md$/, ""));
}

export const blogService: IBlogService = {
  getSortedPosts: getSortedPostsImpl,
  getPostBySlug: getPostBySlugImpl,
  getAllPostSlugs: getAllPostSlugsImpl,
};

export async function getSortedPosts(): Promise<BlogPostListItem[]> {
  return blogService.getSortedPosts();
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return blogService.getPostBySlug(slug);
}

export async function getAllPostSlugs(): Promise<string[]> {
  return blogService.getAllPostSlugs();
}
