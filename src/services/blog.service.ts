import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { BlogSchema } from "@/schemas";
import type { BlogPost, BlogPostListItem } from "@/types";

const BLOG_CONTENT_DIRS = [
  path.join(process.cwd(), "content", "blog"),
  path.join(process.cwd(), "content", "posts"),
];

type BlogFileEntry = {
  filename: string;
  fullPath: string;
};

function normalizeDate(value: string): string {
  return new Date(value).toISOString();
}

async function readBlogFiles(): Promise<BlogFileEntry[]> {
  const files: BlogFileEntry[] = [];

  await Promise.all(
    BLOG_CONTENT_DIRS.map(async (directory) => {
      try {
        const entries = await fs.readdir(directory, { withFileTypes: true });

        for (const entry of entries) {
          if (!entry.isFile() || !entry.name.endsWith(".md")) {
            continue;
          }

          files.push({
            filename: entry.name,
            fullPath: path.join(directory, entry.name),
          });
        }
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
          throw error;
        }
      }
    })
  );

  if (files.length === 0) {
    console.warn(
      "[BlogService] No markdown files found in content/blog or content/posts at runtime."
    );
  }

  return files;
}

function normalizeListItem(
  slug: string,
  input: {
    title: string;
    date: string;
    excerpt: string;
    coverImage: string;
    keywords?: string[] // Added optional keywords
  }
): BlogPostListItem {
  return {
    slug,
    title: input.title,
    date: normalizeDate(input.date),
    excerpt: input.excerpt,
    coverImage: input.coverImage,
    keywords: input.keywords || [], // Pass the data through, defaulting to empty array
  };
}

export interface IBlogService {
  getSortedPosts(): Promise<BlogPostListItem[]>;
  getPostBySlug(slug: string): Promise<BlogPost | null>;
  getAllPostSlugs(): Promise<string[]>;
}

async function getSortedPostsImpl(): Promise<BlogPostListItem[]> {
  const files = await readBlogFiles();
  const posts: BlogPostListItem[] = [];

  await Promise.all(
    files.map(async ({ filename, fullPath }) => {
      const slug = filename.replace(/\.md$/, "");
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

  const candidatePaths = BLOG_CONTENT_DIRS.map((directory) =>
    path.join(directory, `${sanitizedSlug}.md`)
  );

  for (const fullPath of candidatePaths) {
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
        continue;
      }

      throw error;
    }
  }

  return null;
}

async function getAllPostSlugsImpl(): Promise<string[]> {
  const files = await readBlogFiles();

  return Array.from(new Set(files.map((file) => file.filename.replace(/\.md$/, ""))));
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
