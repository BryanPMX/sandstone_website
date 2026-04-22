import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type OAuthStatePayload = {
  nonce: string;
  origin: string;
};

type GitHubTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

const STATE_COOKIE_NAME = "decap_oauth_state";

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`[DecapAuth] Missing required env var: ${name}`);
  }

  return value;
}

function buildCallbackHtml(options: {
  targetOrigin: string;
  status: "success" | "error";
  payload: Record<string, string>;
}): string {
  const serializedPayload = JSON.stringify(options.payload);
  const messagePrefix =
    options.status === "success"
      ? "authorization:github:success:"
      : "authorization:github:error:";

  return `<!doctype html>
<html>
  <body>
    <script>
      (function () {
        var targetOrigin = ${JSON.stringify(options.targetOrigin)};
        var message = ${JSON.stringify(messagePrefix)} + ${JSON.stringify(serializedPayload)};

        if (window.opener && typeof window.opener.postMessage === "function") {
          window.opener.postMessage(message, targetOrigin);
        }

        window.close();
      })();
    </script>
  </body>
</html>`;
}

function decodeState(state: string): OAuthStatePayload | null {
  try {
    const decoded = Buffer.from(state, "base64url").toString("utf8");
    const parsed = JSON.parse(decoded) as Partial<OAuthStatePayload>;

    if (!parsed.origin || !parsed.nonce) {
      return null;
    }

    return {
      nonce: parsed.nonce,
      origin: parsed.origin,
    };
  } catch {
    return null;
  }
}

export async function GET(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code")?.trim();
  const state = requestUrl.searchParams.get("state")?.trim();
  const fallbackOrigin = process.env.CMS_ALLOWED_ORIGIN?.trim() || requestUrl.origin;

  if (!code || !state) {
    return new NextResponse(
      buildCallbackHtml({
        targetOrigin: fallbackOrigin,
        status: "error",
        payload: { error: "Missing code or state" },
      }),
      {
        status: 400,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }

  const cookieStore = await cookies();
  const storedState = cookieStore.get(STATE_COOKIE_NAME)?.value;

  if (!storedState || storedState !== state) {
    return new NextResponse(
      buildCallbackHtml({
        targetOrigin: fallbackOrigin,
        status: "error",
        payload: { error: "State validation failed" },
      }),
      {
        status: 400,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }

  const parsedState = decodeState(state);
  const targetOrigin = parsedState?.origin || fallbackOrigin;

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: getRequiredEnv("GITHUB_CLIENT_ID"),
      client_secret: getRequiredEnv("GITHUB_CLIENT_SECRET"),
      code,
      state,
      redirect_uri: `${requestUrl.origin}/api/decap/callback`,
    }),
  });

  const tokenData = (await tokenRes.json()) as GitHubTokenResponse;

  if (!tokenRes.ok || !tokenData.access_token) {
    const errorMessage =
      tokenData.error_description || tokenData.error || "OAuth token exchange failed";

    const response = new NextResponse(
      buildCallbackHtml({
        targetOrigin,
        status: "error",
        payload: { error: errorMessage },
      }),
      {
        status: 400,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );

    response.cookies.delete(STATE_COOKIE_NAME);
    return response;
  }

  const response = new NextResponse(
    buildCallbackHtml({
      targetOrigin,
      status: "success",
      payload: { token: tokenData.access_token, provider: "github" },
    }),
    {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );

  response.cookies.delete(STATE_COOKIE_NAME);
  return response;
}
