import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  let changed = false;
  if (request.headers.get("host")?.split(":")[0] === "sandstone.homes") {
    url.hostname = "www.sandstone.homes";
    url.port = "";
    url.protocol = "https:";
    changed = true;
  }
  if (url.pathname === "/listings" && url.searchParams.getAll("page").length === 1 && url.searchParams.get("page") === "1") {
    url.searchParams.delete("page");
    changed = true;
  }
  return changed ? NextResponse.redirect(url, 308) : NextResponse.next();
}
export const config = { matcher: ["/((?!api|_next|favicon.ico).*)"] };
