import { readdir, readFile, stat } from "fs/promises";
import { join } from "path";

export interface BlogPostMeta {
  filename: string;
  title: string;
  description: string;
  imageUrl?: string;
  body: string;
}

function parseFrontMatter(content: string) {
  const match = content.match(/^---\s*([\s\S]*?)\s*---/);
  if (!match) {
    return {} as Record<string, string>;
  }

  return match[1].split("\n").reduce<Record<string, string>>((metadata, line) => {
    const [key, ...rest] = line.split(":");
    if (!key) return metadata;
    metadata[key.trim()] = rest.join(":").trim();
    return metadata;
  }, {});
}

function stripFrontMatter(content: string) {
  const match = content.match(/^---\s*[\s\S]*?---\s*/);
  return match ? content.slice(match[0].length) : content;
}

function getPostDescription(frontMatter: Record<string, string>, body: string) {
  if (frontMatter.description) {
    return frontMatter.description;
  }

  return body
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 140);
}

export async function getBlogPosts(): Promise<BlogPostMeta[]> {
  const postsDir = join(process.cwd(), "content", "posts");
  const files = await readdir(postsDir);
  const mdFiles = files.filter((file) => file.endsWith(".md"));

  const posts = await Promise.all(
    mdFiles.map(async (filename) => {
      const filepath = join(postsDir, filename);
      const rawContent = await readFile(filepath, "utf-8");
      const metadata = parseFrontMatter(rawContent);
      const body = stripFrontMatter(rawContent);
      const statResult = await stat(filepath);

      return {
        filename: filename.replace(/\.md$/, ""),
        title: metadata.title || filename.replace(/\.md$/, ""),
        description: getPostDescription(metadata, body),
        imageUrl: metadata.imageUrl,
        body: body.trim(),
        updatedAt: statResult.mtime.getTime(),
      } as BlogPostMeta & { updatedAt: number };
    })
  );

  return posts
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .map(({ updatedAt, ...post }) => post);
}
