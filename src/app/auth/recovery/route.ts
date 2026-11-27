import { NextRequest, NextResponse } from "next/server";

import {
  createRecoveryClient,
  getVerifiedRecoveryIdentity,
  clearRecoveryStorage,
  RECOVERY_ORIGIN,
} from "@/lib/supabase/recovery";

import {
  issueRecoveryAuthorization,
  clearRecoveryAuthorization,
} from "@/lib/supabase/recovery-authorization";

export const dynamic = "force-dynamic";

function redirectTo(path: string) {
  const response = NextResponse.redirect(new URL(path, RECOVERY_ORIGIN), 303);

  response.headers.set("Cache-Control", "private, no-store, max-age=0");

  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("X-Content-Type-Options", "nosniff");

  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");

  return response;
}

function recoveryFailed() {
  return redirectTo("/forgot-password?error=recovery");
}

export async function GET(request: NextRequest) {
  if (request.nextUrl.origin !== RECOVERY_ORIGIN) {
    return new NextResponse("Invalid authentication origin.", {
      status: 400,
      headers: {
        "Cache-Control": "private, no-store",
        "Referrer-Policy": "no-referrer",
        "Content-Type": "text/plain; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    });
  }

  const params = request.nextUrl.searchParams;

  const codes = params.getAll("code");
  const flowIds = params.getAll("sb_flow_id");

  if (
    codes.length !== 1 ||
    !codes[0] ||
    codes[0].length > 2048 ||
    flowIds.length > 1 ||
    params.has("error") ||
    params.has("error_code") ||
    params.has("error_description")
  ) {
    return recoveryFailed();
  }

  const flowId = flowIds[0];

  if (flowIds.length === 1 && !flowId) {
    return recoveryFailed();
  }

  try {
    await clearRecoveryAuthorization();

    const supabase = await createRecoveryClient();

    const { data, error } = await supabase.auth.exchangeCodeForSession(
      codes[0],
      flowId ? { flowId } : undefined,
    );

    if (error || !data.session || !data.user) {
      return recoveryFailed();
    }

    const isRecovery =
      "redirectType" in data && data.redirectType === "recovery";

    if (!isRecovery) {
      await supabase.auth.signOut({
        scope: "local",
      });

      await clearRecoveryStorage();

      return recoveryFailed();
    }

    const identity = await getVerifiedRecoveryIdentity(supabase);

    if (!identity || identity.userId !== data.user.id) {
      await supabase.auth.signOut({
        scope: "local",
      });

      await clearRecoveryStorage();

      return recoveryFailed();
    }

    await issueRecoveryAuthorization(identity.userId, identity.sessionId);

    return redirectTo("/reset-password");
  } catch {
    await clearRecoveryAuthorization();
    await clearRecoveryStorage();

    return recoveryFailed();
  }
}
