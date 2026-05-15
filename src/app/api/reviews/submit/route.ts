import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

function slugify(input: string) {
  return (
    input
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 60)
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, author, rating, body: content } = body as {
      title?: string;
      author?: string;
      rating?: number;
      body?: string;
    };

    if (!title || typeof title !== "string" || title.trim().length < 3) {
      return NextResponse.json({ error: "Title is required and must be at least 3 characters." }, { status: 400 });
    }

    if (!content || typeof content !== "string" || content.trim().length < 10) {
      return NextResponse.json({ error: "Review body is required (min 10 chars)." }, { status: 400 });
    }

    const safeRating = Number(rating) || 0;
    const finalRating = Math.min(5, Math.max(0, Math.floor(safeRating)));

    const dir = join(process.cwd(), "content", "reviews");
    await mkdir(dir, { recursive: true });

    const filename = `${slugify(title)}-${Date.now()}.md`;
    const filepath = join(dir, filename);

    const front = [
      "---",
      `title: ${title.replace(/"/g, "\"")}`,
      author ? `author: ${author.replace(/"/g, "\"")}` : undefined,
      finalRating ? `rating: ${finalRating}` : undefined,
      `date: ${new Date().toISOString().slice(0, 10)}`,
      "---",
      "",
    ]
      .filter(Boolean)
      .join("\n");

    const fileContent = `${front}\n${content}\n`;
    await writeFile(filepath, fileContent, "utf-8");

    return NextResponse.json({ ok: true, filename });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Unexpected error" }, { status: 500 });
  }
}
