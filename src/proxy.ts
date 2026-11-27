import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  let changed = false;

  // Canonical domain redirect
  if (request.headers.get("host")?.split(":")[0] === "sandstone.homes") {
    url.hostname = "www.sandstone.homes";
    url.port = "";
    url.protocol = "https:";
    changed = true;
  }

  // Remove unnecessary page=1 parameter
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

  const pathname = url.pathname.replace(/\/+$/, "").toLowerCase();

  // Restrict administrator application routes.
  // Preserve the independent Decap Blog Editor.
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  const isBlogEditor = pathname === "/admin/index.html";

  if (process.env.NODE_ENV !== "development" && isAdminRoute && !isBlogEditor) {
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
      },
    );
  }

  // Restrict experimental market statistics
  // to local development.
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

  // Only refresh Supabase sessions on account-related routes.
  const requiresSessionRefresh =
    pathname === "/portal" ||
    pathname.startsWith("/portal/") ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password";

  // Public routes and authentication callbacks do not
  // require proxy-based session refresh.
  if (!requiresSessionRefresh) {
    return NextResponse.next();
  }

  try {
    const response = await updateSession(request);

    response.headers.set("Cache-Control", "private, no-store, max-age=0");

    return response;
  } catch {
    return new NextResponse(
      "Account services are temporarily unavailable. Please try again later.",
      {
        status: 503,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "private, no-store",
          "Retry-After": "60",
          "X-Robots-Tag": "noindex, nofollow, noarchive",
          "X-Content-Type-Options": "nosniff",
        },
      },
    );
  }
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
