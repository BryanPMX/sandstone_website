import { NextResponse } from "next/server";

function slugify(input: string) {
  return (
    input
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 60)
  );
}

async function commitToGitHub(
  filename: string,
  content: string
): Promise<{ ok: boolean; error?: string }> {
  const repo = process.env.GITHUB_REPO || "sandstone_website";
  const owner = process.env.GITHUB_OWNER || "sandstone-group";
  const branch = process.env.GITHUB_BRANCH || "main";
  const botToken = process.env.GITHUB_BOT_TOKEN;

  if (!botToken) {
    return { ok: false, error: "No GITHUB_BOT_TOKEN configured" };
  }

  const path = `content/reviews/${filename}`;
  const message = `Add review: ${filename.replace(".md", "")}`;

  try {
    // Get existing file SHA if it exists
    const getUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
    const getRes = await fetch(getUrl, {
      headers: { Authorization: `Bearer ${botToken}` },
    });

    let sha: string | undefined;
    if (getRes.ok) {
      const data = (await getRes.json()) as { sha?: string };
      sha = data.sha;
    }

    // Create or update file
    const createUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const createRes = await fetch(createUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${botToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        content: Buffer.from(content).toString("base64"),
        branch,
        ...(sha && { sha }),
      }),
    });

    if (!createRes.ok) {
      const err = await createRes.json().catch(() => ({})) as any;
      return { ok: false, error: err?.message ?? createRes.statusText };
    }

    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err?.message ?? "GitHub API error" };
  }
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

    const filename = `${slugify(title)}-${Date.now()}.md`;

    const front = [
      "---",
      `title: "${title}"`,
      author ? `author: "${author}"` : undefined,
      finalRating ? `rating: ${finalRating}` : undefined,
      `date: ${new Date().toISOString().slice(0, 10)}`,
      "---",
      "",
    ]
      .filter(Boolean)
      .join("\n");

    const fileContent = `${front}\n${content}\n`;

    const ghRes = await commitToGitHub(filename, fileContent);
    if (!ghRes.ok) {
      return NextResponse.json(
        { error: ghRes.error ?? "Failed to commit review to GitHub" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, filename });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Unexpected error" }, { status: 500 });
  }
}
