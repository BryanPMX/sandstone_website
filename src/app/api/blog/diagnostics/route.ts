import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { NextResponse } from "next/server";
import { BlogSchema } from "@/schemas";

const CANDIDATE_DIRS = [
  path.join(process.cwd(), "content", "blog"),
  path.join(process.cwd(), "content", "posts"),
];

async function inspectDirectory(directory: string) {
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    const markdownFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".md"));

    const files = await Promise.all(
      markdownFiles.map(async (entry) => {
        const fullPath = path.join(directory, entry.name);
        const raw = await fs.readFile(fullPath, "utf8");
        const parsed = matter(raw);
        const validation = BlogSchema.safeParse(parsed.data);

        return {
          filename: entry.name,
          validFrontmatter: validation.success,
          frontmatterErrors: validation.success ? null : validation.error.flatten(),
          frontmatterKeys: Object.keys(parsed.data ?? {}),
        };
      })
    );

    return {
      directory,
      exists: true,
      fileCount: files.length,
      files,
    };
  } catch (error) {
    const err = error as NodeJS.ErrnoException;

    if (err.code === "ENOENT") {
      return {
        directory,
        exists: false,
        fileCount: 0,
        files: [],
      };
    }

    return {
      directory,
      exists: false,
      fileCount: 0,
      files: [],
      error: err.message,
    };
  }
}

export const dynamic = "force-dynamic";

export async function GET() {
  const directories = await Promise.all(CANDIDATE_DIRS.map(inspectDirectory));

  return NextResponse.json({
    cwd: process.cwd(),
    directories,
  });
}
