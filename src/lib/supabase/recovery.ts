import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { verifyRecoveryAuthorization } from "@/lib/supabase/recovery-authorization";

export const RECOVERY_ORIGIN =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://www.sandstone.homes";

const STORAGE_KEY = "sandstone-recovery-auth";

function getSigningKey() {
  const secret = process.env.AUTH_RECOVERY_SECRET;

  if (!secret || !/^[a-f0-9]{64}$/i.test(secret)) {
    throw new Error("Invalid recovery signing configuration.");
  }

  return Buffer.from(secret, "hex");
}

function isRecoveryCookie(name: string) {
  return (
    name === STORAGE_KEY ||
    name.startsWith(`${STORAGE_KEY}.`) ||
    name.startsWith(`${STORAGE_KEY}-`)
  );
}

function signCookie(name: string, value: string) {
  return createHmac("sha256", getSigningKey())
    .update(`recovery-storage:${name}:${value}`)
    .digest("base64url");
}

function encodeCookie(name: string, value: string) {
  return `${value}.${signCookie(name, value)}`;
}

function decodeCookie(name: string, encoded: string): string | null {
  const separator = encoded.lastIndexOf(".");

  if (separator < 1) {
    return null;
  }

  const value = encoded.slice(0, separator);

  const received = Buffer.from(encoded.slice(separator + 1), "utf8");

  const expected = Buffer.from(signCookie(name, value), "utf8");

  if (
    received.length !== expected.length ||
    !timingSafeEqual(received, expected)
  ) {
    return null;
  }

  return value;
}

export async function createRecoveryClient() {
  const cookieStore = await cookies();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase environment variables.");
  }

  getSigningKey();

  return createServerClient(url, key, {
    auth: {
      storageKey: STORAGE_KEY,
      flowType: "pkce",
    },
    cookieOptions: {
      name: STORAGE_KEY,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "lax",
    },
    cookies: {
      getAll() {
        return cookieStore.getAll().flatMap(({ name, value }) => {
          if (!isRecoveryCookie(name)) {
            return [];
          }

          const decoded = decodeCookie(name, value);

          return decoded === null ? [] : [{ name, value: decoded }];
        });
      },

      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          if (!isRecoveryCookie(name)) {
            throw new Error("Unexpected recovery storage key.");
          }

          cookieStore.set(name, value ? encodeCookie(name, value) : "", {
            ...options,
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "lax",
          });
        });
      },
    },
  });
}

export async function getVerifiedRecoveryIdentity(
  supabase: Awaited<ReturnType<typeof createRecoveryClient>>,
) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user || user.is_anonymous || !user.email_confirmed_at) {
    return null;
  }

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    return null;
  }

  const claims = data.claims;

  if (
    claims.sub !== user.id ||
    typeof claims.session_id !== "string" ||
    !claims.session_id
  ) {
    return null;
  }

  return {
    userId: user.id,
    sessionId: claims.session_id,
  };
}

export async function getAuthorizedRecoveryClient() {
  try {
    const supabase = await createRecoveryClient();

    const identity = await getVerifiedRecoveryIdentity(supabase);

    if (!identity) {
      return null;
    }

    const authorized = await verifyRecoveryAuthorization(
      identity.userId,
      identity.sessionId,
    );

    if (!authorized) {
      return null;
    }

    return supabase;
  } catch {
    return null;
  }
}

export async function clearRecoveryStorage() {
  const cookieStore = await cookies();

  for (const cookie of cookieStore.getAll()) {
    if (isRecoveryCookie(cookie.name)) {
      cookieStore.delete(cookie.name);
    }
  }
}
