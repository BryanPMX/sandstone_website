import { readdir, readFile, stat } from "fs/promises";
import { join } from "path";

export interface ReviewMeta {
  filename: string;
  title: string;
  author?: string;
  rating?: number;
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

export async function getReviews(): Promise<ReviewMeta[]> {
  const postsDir = join(process.cwd(), "content", "reviews");
  let files: string[] = [];
  try {
    files = await readdir(postsDir);
  } catch (_e) {
    return [];
  }

  const mdFiles = files.filter((f) => f.endsWith(".md"));

  const reviews = await Promise.all(
    mdFiles.map(async (filename) => {
      const filepath = join(postsDir, filename);
      const raw = await readFile(filepath, "utf-8");
      const metadata = parseFrontMatter(raw);
      const body = stripFrontMatter(raw).trim();
      const statResult = await stat(filepath);

      return {
        filename: filename.replace(/\.md$/, ""),
        title: metadata.title || filename.replace(/\.md$/, ""),
        author: metadata.author,
        rating: metadata.rating ? Number(metadata.rating) : undefined,
        body,
        updatedAt: statResult.mtime.getTime(),
      } as ReviewMeta & { updatedAt: number };
    })
  );

  return reviews
    .sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0))
    .map(({ updatedAt: _updatedAt, ...rest }) => rest as ReviewMeta);
}
