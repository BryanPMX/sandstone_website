import { createHmac, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

type OAuthStatePayload = {
  nonce: string;
  origin: string;
  issuedAt: number;
  signature: string;
};

const STATE_COOKIE_NAME = "decap_oauth_state";
const STATE_COOKIE_MAX_AGE_SECONDS = 60 * 10;

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

function errorResponse(message: string, status: number) {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        "Referrer-Policy": "no-referrer",
      },
    },
  );
}

export async function GET(request: Request): Promise<Response> {
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

  const originParameters =
    requestUrl.searchParams.getAll("origin");

  if (originParameters.length > 1) {
    return errorResponse("Invalid origin", 400);
  }

  const requestedOrigin =
    originParameters[0] ?? requestUrl.origin;

  const targetOrigin = normalizeOrigin(requestedOrigin);

  if (
    !targetOrigin ||
    !allowedOrigins.has(targetOrigin) ||
    !allowedOrigins.has(requestUrl.origin) ||
    targetOrigin !== requestUrl.origin
  ) {
    return errorResponse("Invalid origin", 400);
  }

  const clientId = process.env.GITHUB_CLIENT_ID?.trim();
  const clientSecret = process.env.GITHUB_CLIENT_SECRET?.trim();

  const signingSecret =
    process.env.CMS_OAUTH_STATE_SECRET?.trim() ||
    clientSecret;

  if (!clientId || !clientSecret || !signingSecret) {
    return errorResponse(
      "GitHub authentication is not configured.",
      503,
    );
  }

  const unsignedStatePayload = {
    nonce: randomUUID(),
    origin: targetOrigin,
    issuedAt: Date.now(),
  };

  const signature = createHmac("sha256", signingSecret)
    .update(
      `${unsignedStatePayload.nonce}.${unsignedStatePayload.origin}.${unsignedStatePayload.issuedAt}`,
    )
    .digest("hex");

  const statePayload: OAuthStatePayload = {
    ...unsignedStatePayload,
    signature,
  };

  const encodedState = Buffer.from(
    JSON.stringify(statePayload),
  ).toString("base64url");

  const authUrl = new URL(
    "https://github.com/login/oauth/authorize",
  );

  authUrl.searchParams.set("client_id", clientId);

  authUrl.searchParams.set(
    "redirect_uri",
    `${targetOrigin}/api/decap/callback`,
  );

  authUrl.searchParams.set(
    "scope",
    process.env.CMS_OAUTH_SCOPES?.trim() || "repo,user:email",
  );

  authUrl.searchParams.set("state", encodedState);

  const response = NextResponse.redirect(authUrl);

  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Referrer-Policy", "no-referrer");

  response.cookies.set({
    name: STATE_COOKIE_NAME,
    value: encodedState,
    httpOnly: true,
    secure: requestUrl.protocol === "https:",
    sameSite: "lax",
    maxAge: STATE_COOKIE_MAX_AGE_SECONDS,
    path: "/api/decap",
  });

  return response;
}