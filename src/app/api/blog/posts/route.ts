import { NextResponse } from "next/server";
import { getSortedPosts } from "@/services";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await getSortedPosts();

  return NextResponse.json({
    count: posts.length,
    posts,
  });
}
