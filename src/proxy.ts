
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  let changed = false;

  if (request.headers.get("host")?.split(":")[0] === "sandstone.homes") {
    url.hostname = "www.sandstone.homes";
    url.port = "";
    url.protocol = "https:";
    changed = true;
  }

  if (
    url.pathname === "/listings" &&
    url.searchParams.getAll("page").length === 1 &&
    url.searchParams.get("page") === "1"
  ) {
    url.searchParams.delete("page");
    changed = true;
  }

  if (changed) {
    return NextResponse.redirect(url, 308);
  }

  // Temporarily restrict administrator application routes
  // until server-side administrator authorization is implemented.
  // Preserve the independent GitHub-powered Decap Blog Editor.
  const pathname = url.pathname.replace(/\/+$/, "").toLowerCase();

  const isAdminRoute =
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  const isBlogEditor =
    pathname === "/admin/index.html";

  if (
    process.env.NODE_ENV !== "development" &&
    isAdminRoute &&
    !isBlogEditor
  ) {
    return new NextResponse(
      "Administrator access is temporarily unavailable.",
      {
        status: 403,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
          "X-Robots-Tag": "noindex, nofollow, noarchive",
          "Referrer-Policy": "no-referrer",
          "X-Content-Type-Options": "nosniff",
        },
      }
    );
  }

  // Restrict experimental market statistics to local development.
  if (
    process.env.NODE_ENV !== "development" &&
    pathname === "/market-stats-demo"
  ) {
    return new NextResponse("Not found.", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
