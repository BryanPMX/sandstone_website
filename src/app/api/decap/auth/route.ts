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

export async function GET(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url);
  const allowedOrigin = process.env.CMS_ALLOWED_ORIGIN?.trim();
  const requestedOrigin = requestUrl.searchParams.get("origin")?.trim();

  const targetOrigin = requestedOrigin || allowedOrigin || requestUrl.origin;

  if (allowedOrigin) {
    const normalizedAllowedOrigin = new URL(allowedOrigin).origin;

    if (new URL(targetOrigin).origin !== normalizedAllowedOrigin) {
      return NextResponse.json(
        { error: "Invalid origin" },
        { status: 400 }
      );
    }
  }

  const issuedAt = Date.now();
  const unsignedStatePayload = {
    nonce: randomUUID(),
    origin: targetOrigin,
    issuedAt,
  };
  const statePayload: OAuthStatePayload = {
    ...unsignedStatePayload,
    signature: signStatePayload(unsignedStatePayload),
  };
  const encodedState = Buffer.from(JSON.stringify(statePayload)).toString("base64url");

  const authUrl = new URL("https://github.com/login/oauth/authorize");
  authUrl.searchParams.set("client_id", getRequiredEnv("GITHUB_CLIENT_ID"));
  authUrl.searchParams.set("redirect_uri", `${requestUrl.origin}/api/decap/callback`);
  authUrl.searchParams.set(
    "scope",
    process.env.CMS_OAUTH_SCOPES?.trim() || "repo,user:email"
  );
  authUrl.searchParams.set("state", encodedState);

  const response = NextResponse.redirect(authUrl);
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
