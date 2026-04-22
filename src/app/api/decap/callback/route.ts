import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type OAuthStatePayload = {
  nonce: string;
  origin: string;
  issuedAt: number;
  signature: string;
};

type GitHubTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

const STATE_COOKIE_NAME = "decap_oauth_state";
const STATE_MAX_AGE_MS = 10 * 60 * 1000;

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`[DecapAuth] Missing required env var: ${name}`);
  }

  return value;
}

function getStateSigningSecret(): string {
  return process.env.CMS_OAUTH_STATE_SECRET?.trim() || getRequiredEnv("GITHUB_CLIENT_SECRET");
}

function signStatePayload(payload: {
  nonce: string;
  origin: string;
  issuedAt: number;
}): string {
  return createHmac("sha256", getStateSigningSecret())
    .update(`${payload.nonce}.${payload.origin}.${payload.issuedAt}`)
    .digest("hex");
}

function buildCallbackHtml(options: {
  targetOrigins: string[];
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
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Sandstone CMS Auth</title>
    <style>
      body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; margin: 24px; line-height: 1.5; }
      .ok { color: #166534; }
      .err { color: #991b1b; }
      code { background: #f5f5f5; padding: 2px 6px; border-radius: 4px; }
    </style>
  </head>
  <body>
    <h1 id="title">Completing login...</h1>
    <p id="detail">Sending authorization result back to the CMS window.</p>
    <script>
      (function () {
        var targetOrigins = ${JSON.stringify(options.targetOrigins)};
        var message = ${JSON.stringify(messagePrefix)} + ${JSON.stringify(serializedPayload)};
        var posted = false;
        var hasOpener = window.opener && typeof window.opener.postMessage === "function";

        function postToOpener() {
          if (!hasOpener) {
            return false;
          }

          var didPost = false;

          for (var i = 0; i < targetOrigins.length; i++) {
            var targetOrigin = targetOrigins[i];

            try {
              window.opener.postMessage(message, targetOrigin);
              didPost = true;
            } catch (error) {
              // Ignore and continue trying other expected origins.
            }
          }

          try {
            window.opener.postMessage(message, "*");
            didPost = true;
          } catch (error) {
            // Ignore wildcard fallback failure.
          }

          return didPost;
        }

        posted = postToOpener() || posted;
        setTimeout(function () {
          posted = postToOpener() || posted;
        }, 100);
        setTimeout(function () {
          posted = postToOpener() || posted;
        }, 350);
        setTimeout(function () {
          posted = postToOpener() || posted;
        }, 900);

        var isSuccess = ${JSON.stringify(options.status)} === "success";
        var title = document.getElementById("title");
        var detail = document.getElementById("detail");

        if (title && detail) {
          if (isSuccess && posted) {
            title.textContent = "Login complete";
            title.className = "ok";
            detail.innerHTML = "Authorization was sent to the CMS window. This tab can stay open; Decap should close it automatically once processed.";
          } else {
            title.textContent = isSuccess ? "Login token sent" : "Login failed";
            title.className = isSuccess ? "ok" : "err";
            detail.textContent = posted
              ? "A response was sent to the CMS window. Switch back to /admin."
              : "Could not find the opener window. Return to /admin and retry login.";
          }
        }
      })();
    </script>
  </body>
</html>`;
}

function uniqueOrigins(values: Array<string | undefined>): string[] {
  const origins = values
    .filter((value): value is string => Boolean(value))
    .map((value) => {
      try {
        return new URL(value).origin;
      } catch {
        return null;
      }
    })
    .filter((value): value is string => value !== null);

  return Array.from(new Set(origins));
}

function decodeState(state: string): OAuthStatePayload | null {
  try {
    const decoded = Buffer.from(state, "base64url").toString("utf8");
    const parsed = JSON.parse(decoded) as Partial<OAuthStatePayload>;

    if (
      !parsed.origin ||
      !parsed.nonce ||
      typeof parsed.issuedAt !== "number" ||
      !parsed.signature
    ) {
      return null;
    }

    return {
      nonce: parsed.nonce,
      origin: parsed.origin,
      issuedAt: parsed.issuedAt,
      signature: parsed.signature,
    };
  } catch {
    return null;
  }
}

function isValidState(parsedState: OAuthStatePayload): boolean {
  const age = Date.now() - parsedState.issuedAt;

  if (age < 0 || age > STATE_MAX_AGE_MS) {
    return false;
  }

  const expectedSignature = signStatePayload({
    nonce: parsedState.nonce,
    origin: parsedState.origin,
    issuedAt: parsedState.issuedAt,
  });

  const expected = Buffer.from(expectedSignature, "utf8");
  const actual = Buffer.from(parsedState.signature, "utf8");

  if (expected.length !== actual.length) {
    return false;
  }

  return timingSafeEqual(actual, expected);
}

export async function GET(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code")?.trim();
  const state = requestUrl.searchParams.get("state")?.trim();
  const fallbackOrigin = new URL(
    process.env.CMS_ALLOWED_ORIGIN?.trim() || requestUrl.origin
  ).origin;

  if (!code || !state) {
    const targetOrigins = uniqueOrigins([fallbackOrigin]);

    return new NextResponse(
      buildCallbackHtml({
        targetOrigins,
        status: "error",
        payload: { error: "Missing code or state" },
      }),
      {
        status: 400,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }

  const parsedState = decodeState(state);

  if (!parsedState || !isValidState(parsedState)) {
    const targetOrigins = uniqueOrigins([fallbackOrigin]);

    return new NextResponse(
      buildCallbackHtml({
        targetOrigins,
        status: "error",
        payload: { error: "State validation failed" },
      }),
      {
        status: 400,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }

  const targetOrigin = parsedState?.origin || fallbackOrigin;
  const targetOrigins = uniqueOrigins([
    targetOrigin,
    fallbackOrigin,
    requestUrl.origin,
    process.env.CMS_ALLOWED_ORIGIN?.trim(),
  ]);

  const cookieStore = await cookies();
  const storedState = cookieStore.get(STATE_COOKIE_NAME)?.value;

  if (storedState && storedState !== state) {
    const response = new NextResponse(
      buildCallbackHtml({
        targetOrigins,
        status: "error",
        payload: { error: "State mismatch" },
      }),
      {
        status: 400,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );

    response.cookies.delete(STATE_COOKIE_NAME);
    return response;
  }

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
        targetOrigins,
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
      targetOrigins,
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
