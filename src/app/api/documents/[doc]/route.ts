import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

const DOC_NAMES = ["privacy-policy", "terms-and-conditions"] as const;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ doc: string }> }
) {
  const { doc } = await params;
  if (!DOC_NAMES.includes(doc as (typeof DOC_NAMES)[number])) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const path = join(process.cwd(), "public", `${doc}.docx`);
  try {
    const buffer = await readFile(path);
    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": "inline",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }
}
