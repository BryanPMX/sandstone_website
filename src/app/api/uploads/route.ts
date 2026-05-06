import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";

const UPLOADS_DIR = join(process.cwd(), "public", "uploads");

function sanitizeFilename(filename: string) {
  const clean = filename
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");
  const timestamp = Date.now();
  return `${timestamp}-${clean}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No image file provided." },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image uploads are allowed." },
        { status: 400 }
      );
    }

    await mkdir(UPLOADS_DIR, { recursive: true });

    const filename = sanitizeFilename(file.name);
    const buffer = Buffer.from(await file.arrayBuffer());
    const filepath = join(UPLOADS_DIR, filename);

    await writeFile(filepath, buffer);

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error("Image upload failed:", error);
    return NextResponse.json(
      { error: "Image upload failed." },
      { status: 500 }
    );
  }
}
