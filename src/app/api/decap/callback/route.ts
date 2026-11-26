
import {
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
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
};

const STATE_COOKIE_NAME = "decap_oauth_state";
const STATE_COOKIE_PATH = "/api/decap";
const STATE_MAX_AGE_MS = 10 * 60 * 1000;

const PRODUCTION_ORIGIN = "https://www.sandstone.homes";
const DEVELOPMENT_ORIGIN = "http://localhost:3000";

function normalizeOrigin(value: string): string | null {
  try {
    const url = new URL(value);

    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    ) {
      return null;
    }

    return url.origin;
  } catch {
    return null;
  }
}

function getAllowedOrigins(): Set<string> {
  const origins = new Set<string>([PRODUCTION_ORIGIN]);

  if (process.env.NODE_ENV === "development") {
    origins.add(DEVELOPMENT_ORIGIN);
  }

  const configuredOrigin =
    process.env.CMS_ALLOWED_ORIGIN?.trim();

  if (configuredOrigin) {
    const normalized = normalizeOrigin(configuredOrigin);

    if (!normalized || !origins.has(normalized)) {
      throw new Error("Invalid CMS allowed origin configuration");
    }

    return new Set([normalized]);
  }

  return origins;
}

function securityHeaders() {
  return {
    "Cache-Control": "no-store",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
  };
}

function errorResponse(message: string, status: number) {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: securityHeaders(),
    },
  );
}

function safeScriptJson(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

function decodeState(state: string): OAuthStatePayload | null {
  try {
    if (
      state.length > 4096 ||
      !/^[A-Za-z0-9_-]+$/.test(state)
    ) {
      return null;
    }

    const decoded = Buffer.from(
      state,
      "base64url",
    ).toString("utf8");

    const parsed = JSON.parse(
      decoded,
    ) as Partial<OAuthStatePayload>;

    if (
      !parsed ||
      typeof parsed.nonce !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        parsed.nonce,
      ) ||
      typeof parsed.origin !== "string" ||
      normalizeOrigin(parsed.origin) !== parsed.origin ||
      typeof parsed.issuedAt !== "number" ||
      !Number.isSafeInteger(parsed.issuedAt) ||
      typeof parsed.signature !== "string" ||
      !/^[a-f0-9]{64}$/.test(parsed.signature)
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

function isValidState(
  state: OAuthStatePayload,
  signingSecret: string,
): boolean {
  const age = Date.now() - state.issuedAt;

  if (age < 0 || age > STATE_MAX_AGE_MS) {
    return false;
  }

  const expectedSignature = createHmac(
    "sha256",
    signingSecret,
  )
    .update(
      `${state.nonce}.${state.origin}.${state.issuedAt}`,
    )
    .digest("hex");

  const expected = Buffer.from(
    expectedSignature,
    "hex",
  );

  const actual = Buffer.from(
    state.signature,
    "hex",
  );

  return (
    expected.length === actual.length &&
    timingSafeEqual(expected, actual)
  );
}

function statesMatch(
  storedState: string,
  receivedState: string,
): boolean {
  const stored = Buffer.from(storedState, "utf8");
  const received = Buffer.from(receivedState, "utf8");

  return (
    stored.length === received.length &&
    timingSafeEqual(stored, received)
  );
}

function buildCallbackHtml(options: {
  targetOrigin: string;
  status: "success" | "error";
  payload: Record<string, string>;
  scriptNonce: string;
}): string {
  const message =
    `authorization:github:${options.status}:` +
    JSON.stringify(options.payload);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow, noarchive" />
    <title>Sandstone CMS Auth</title>
    <style nonce="${options.scriptNonce}">
      body {
        font-family: system-ui, sans-serif;
        margin: 24px;
        line-height: 1.5;
      }
      .ok { color: #166534; }
      .err { color: #991b1b; }
    </style>
  </head>
  <body>
    <h1 id="title">Completing login...</h1>
    <p id="detail">Connecting to the CMS window.</p>

    <script nonce="${options.scriptNonce}">
      (function () {
        var targetOrigin = ${safeScriptJson(options.targetOrigin)};
        var message = ${safeScriptJson(message)};
        var isSuccess = ${safeScriptJson(options.status === "success")};

        var openerWindow = window.opener;
        var title = document.getElementById("title");
        var detail = document.getElementById("detail");
        var completed = false;
        var timeoutId;

        function renderStatus(text, className, detailText) {
          title.textContent = text;
          title.className = className;
          detail.textContent = detailText;
        }

        function cleanup() {
          window.removeEventListener("message", receiveMessage);
          window.clearTimeout(timeoutId);
        }

        function sendAuthorizationResult() {
          if (completed) {
            return;
          }

          completed = true;
          cleanup();

          try {
            openerWindow.postMessage(message, targetOrigin);

            renderStatus(
              isSuccess ? "Login response sent" : "Login failed",
              isSuccess ? "ok" : "err",
              "Return to the CMS window to continue."
            );
          } catch {
            renderStatus(
              "Login failed",
              "err",
              "Unable to communicate with the CMS window."
            );
          }
        }

        function receiveMessage(event) {
          if (
            event.origin !== targetOrigin ||
            event.source !== openerWindow ||
            event.data !== "authorizing:github"
          ) {
            return;
          }

          sendAuthorizationResult();
        }

        if (!openerWindow || openerWindow.closed) {
          renderStatus(
            "Login failed",
            "err",
            "No CMS window found. Return to the admin page and retry."
          );
          return;
        }

        window.addEventListener("message", receiveMessage);

        timeoutId = window.setTimeout(function () {
          completed = true;
          cleanup();

          renderStatus(
            "Login timed out",
            "err",
            "Return to the CMS window and retry login."
          );
        }, 10000);

        try {
          openerWindow.postMessage(
            "authorizing:github",
            targetOrigin
          );
        } catch {
          completed = true;
          cleanup();

          renderStatus(
            "Login failed",
            "err",
            "Unable to connect to the CMS window."
          );
        }
      })();
    </script>
  </body>
</html>`;
}

function callbackResponse(options: {
  targetOrigin: string;
  status: "success" | "error";
  payload: Record<string, string>;
  httpStatus: number;
  clearStateCookie?: boolean;
}): NextResponse {
  const scriptNonce = randomBytes(24).toString("base64");

  const response = new NextResponse(
    buildCallbackHtml({
      targetOrigin: options.targetOrigin,
      status: options.status,
      payload: options.payload,
      scriptNonce,
    }),
    {
      status: options.httpStatus,
      headers: {
        ...securityHeaders(),
        "Content-Type": "text/html; charset=utf-8",
        "Content-Security-Policy": [
          "default-src 'none'",
          `script-src 'nonce-${scriptNonce}'`,
          `style-src 'nonce-${scriptNonce}'`,
          "base-uri 'none'",
          "form-action 'none'",
          "frame-ancestors 'none'",
        ].join("; "),
      },
    },
  );

  if (options.clearStateCookie) {
    response.cookies.set({
      name: STATE_COOKIE_NAME,
      value: "",
      httpOnly: true,
      secure: options.targetOrigin.startsWith("https:"),
      sameSite: "lax",
      maxAge: 0,
      path: STATE_COOKIE_PATH,
    });
  }

  return response;
}

export async function GET(
  request: Request,
): Promise<Response> {
  const requestUrl = new URL(request.url);

  let allowedOrigins: Set<string>;

  try {
    allowedOrigins = getAllowedOrigins();
  } catch {
    return errorResponse(
      "OAuth configuration is invalid.",
      503,
    );
  }

  if (!allowedOrigins.has(requestUrl.origin)) {
    return errorResponse("Invalid origin", 400);
  }

  const targetOrigin = requestUrl.origin;

  const codeParameters =
    requestUrl.searchParams.getAll("code");

  const stateParameters =
    requestUrl.searchParams.getAll("state");

  const errorParameters =
    requestUrl.searchParams.getAll("error");

  function fail(
    message: string,
    httpStatus = 400,
    clearStateCookie = false,
  ) {
    return callbackResponse({
      targetOrigin,
      status: "error",
      payload: { message },
      httpStatus,
      clearStateCookie,
    });
  }

  if (
    codeParameters.length > 1 ||
    stateParameters.length !== 1 ||
    errorParameters.length > 1
  ) {
    return fail("Invalid OAuth callback parameters.");
  }

  const state = stateParameters[0];
  const code = codeParameters[0]?.trim();

  if (!state) {
    return fail("Missing OAuth state.");
  }

  const parsedState = decodeState(state);

  if (
    !parsedState ||
    parsedState.origin !== targetOrigin ||
    !allowedOrigins.has(parsedState.origin)
  ) {
    return fail("State validation failed.");
  }

  const cookieStore = await cookies();

  const storedState =
    cookieStore.get(STATE_COOKIE_NAME)?.value;

  if (!storedState) {
    return fail("Missing OAuth state cookie.");
  }

  if (!statesMatch(storedState, state)) {
    return fail("State mismatch.");
  }

  const clientId =
    process.env.GITHUB_CLIENT_ID?.trim();

  const clientSecret =
    process.env.GITHUB_CLIENT_SECRET?.trim();

  const signingSecret =
    process.env.CMS_OAUTH_STATE_SECRET?.trim() ||
    clientSecret;

  if (!clientId || !clientSecret || !signingSecret) {
    return fail(
      "GitHub authentication is not configured.",
      503,
      true,
    );
  }

  if (!isValidState(parsedState, signingSecret)) {
    return fail("State validation failed.", 400, true);
  }

  if (errorParameters.length === 1) {
    return fail(
      "GitHub authorization was denied or cancelled.",
      400,
      true,
    );
  }

  if (!code || code.length > 2048) {
    return fail(
      "Missing or invalid authorization code.",
      400,
      true,
    );
  }

  try {
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          code,
          state,
          redirect_uri:
            `${targetOrigin}/api/decap/callback`,
        }),
        cache: "no-store",
        redirect: "error",
        signal: AbortSignal.timeout(10000),
      },
    );

    const tokenData =
      (await tokenResponse.json()) as GitHubTokenResponse;

    if (
      !tokenResponse.ok ||
      !tokenData ||
      tokenData.error ||
      typeof tokenData.access_token !== "string" ||
      !tokenData.access_token.trim()
    ) {
      return fail(
        "GitHub token exchange failed.",
        400,
        true,
      );
    }

    return callbackResponse({
      targetOrigin,
      status: "success",
      payload: {
        token: tokenData.access_token,
        provider: "github",
      },
      httpStatus: 200,
      clearStateCookie: true,
    });
  } catch {
    return fail(
      "Unable to complete GitHub authentication.",
      502,
      true,
    );
  }
}
