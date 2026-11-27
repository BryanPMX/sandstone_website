import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const TRUSTED_ORIGIN =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://www.sandstone.homes";

function secureRedirect(destination: string) {
  const response = NextResponse.redirect(
    new URL(destination, TRUSTED_ORIGIN),
    303,
  );

  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");

  return response;
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  if (requestUrl.origin !== TRUSTED_ORIGIN) {
    return new NextResponse("Invalid authentication origin.", {
      status: 400,
      headers: {
        "Cache-Control": "private, no-store",
        "Content-Type": "text/plain; charset=utf-8",
        "Referrer-Policy": "no-referrer",
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    });
  }

  const codes = requestUrl.searchParams.getAll("code");

  if (codes.length !== 1 || !codes[0]) {
    return secureRedirect("/login?error=missing_code");
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.exchangeCodeForSession(
      codes[0],
    );

    if (error || !data.session || !data.user) {
      return secureRedirect("/login?error=auth_callback");
    }

    const verified =
      Boolean(data.user.email_confirmed_at) && !data.user.is_anonymous;

    const { error: signOutError } = await supabase.auth.signOut({
      scope: "local",
    });

    if (signOutError) {
      return secureRedirect("/login?error=session_cleanup");
    }

    if (!verified) {
      return secureRedirect("/login?error=auth_callback");
    }

    const cookieStore = await cookies();

    cookieStore.set("sandstone_signup_confirmed", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "lax",
      path: "/login",
      maxAge: 120,
    });

    return secureRedirect("/login?status=confirmed");
  } catch {
    return secureRedirect("/login?error=auth_callback");
  }
}
