import { readdir, readFile, writeFile, rm } from "fs/promises";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";

const POSTS_DIR = join(process.cwd(), "content", "posts");

function parseFrontMatter(content: string) {
  const match = content.match(/^---\s*([\s\S]*?)\s*---/);
  if (!match) {
    return {} as Record<string, string>;
  }

  return match[1].split("\n").reduce<Record<string, string>>((fields, line) => {
    const [key, ...rest] = line.split(":");
    if (!key) return fields;
    fields[key.trim()] = rest.join(":").trim();
    return fields;
  }, {});
}

function stripFrontMatter(content: string) {
  const match = content.match(/^---\s*[\s\S]*?---\s*/);
  return match ? content.slice(match[0].length) : content;
}

export async function GET() {
  try {
    const files = await readdir(POSTS_DIR);
    const mdFiles = files.filter((f) => f.endsWith(".md"));

    const posts = await Promise.all(
      mdFiles.map(async (filename) => {
        const raw = await readFile(join(POSTS_DIR, filename), "utf-8");
        const metadata = parseFrontMatter(raw);
        const body = stripFrontMatter(raw).trim();

        return {
          filename: filename.replace(".md", ""),
          title: metadata.title || filename.replace(".md", ""),
          description: metadata.description || "",
          imageUrl: metadata.imageUrl || "",
          content: body,
        };
      })
    );

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, imageUrl, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const filename = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const filepath = join(POSTS_DIR, `${filename}.md`);

    const frontMatterLines = [
      "---",
      `title: ${title}`,
      `description: ${description || ""}`,
      `imageUrl: ${imageUrl || ""}`,
      "---",
      "",
    ];

    const fullContent = `${frontMatterLines.join("\n")}${content}`;

    await writeFile(filepath, fullContent, "utf-8");

    return NextResponse.json(
      { success: true, filename },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { title, description, imageUrl, content, oldFilename } = await request.json();

    if (!title || !content || !oldFilename) {
      return NextResponse.json(
        { error: "Title, content, and oldFilename are required" },
        { status: 400 }
      );
    }

    const oldFilepath = join(POSTS_DIR, `${oldFilename}.md`);
    const newFilename = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const newFilepath = join(POSTS_DIR, `${newFilename}.md`);

    const frontMatterLines = [
      "---",
      `title: ${title}`,
      `description: ${description || ""}`,
      `imageUrl: ${imageUrl || ""}`,
      "---",
      "",
    ];

    const fullContent = `${frontMatterLines.join("\n")}${content}`;

    if (oldFilename !== newFilename && oldFilepath !== newFilepath) {
      await rm(oldFilepath, { force: true });
    }

    await writeFile(newFilepath, fullContent, "utf-8");

    return NextResponse.json({ success: true, filename: newFilename });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { filename } = await request.json();

    if (!filename) {
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 }
      );
    }

    const filepath = join(POSTS_DIR, `${filename}.md`);
    await rm(filepath, { force: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
