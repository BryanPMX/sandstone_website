import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

export const RECOVERY_AUTH_COOKIE = "sandstone-recovery-authorization";

const RECOVERY_LIFETIME = 600;

type RecoveryAuthorization = {
  userId: string;
  sessionId: string;
  expiresAt: number;
};

function getSecret() {
  const secret = process.env.AUTH_RECOVERY_SECRET;

  if (!secret || !/^[a-f0-9]{64}$/i.test(secret)) {
    throw new Error("Invalid recovery signing configuration.");
  }

  return Buffer.from(secret, "hex");
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export async function issueRecoveryAuthorization(
  userId: string,
  sessionId: string,
) {
  const authorization: RecoveryAuthorization = {
    userId,
    sessionId,
    expiresAt: Math.floor(Date.now() / 1000) + RECOVERY_LIFETIME,
  };

  const payload = Buffer.from(JSON.stringify(authorization)).toString(
    "base64url",
  );

  const signature = sign(payload);

  const cookieStore = await cookies();

  cookieStore.set(RECOVERY_AUTH_COOKIE, `${payload}.${signature}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "lax",
    path: "/",
    maxAge: RECOVERY_LIFETIME,
  });
}

export async function verifyRecoveryAuthorization(
  userId: string,
  sessionId: string,
): Promise<boolean> {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get(RECOVERY_AUTH_COOKIE)?.value;

    if (!token || token.length > 2048) {
      return false;
    }

    const parts = token.split(".");

    if (parts.length !== 2) {
      return false;
    }

    const [payload, signature] = parts;

    const expected = Buffer.from(sign(payload), "utf8");

    const received = Buffer.from(signature, "utf8");

    if (
      expected.length !== received.length ||
      !timingSafeEqual(expected, received)
    ) {
      return false;
    }

    const authorization = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as RecoveryAuthorization;

    const now = Math.floor(Date.now() / 1000);

    return (
      authorization.userId === userId &&
      authorization.sessionId === sessionId &&
      Number.isSafeInteger(authorization.expiresAt) &&
      authorization.expiresAt > now &&
      authorization.expiresAt <= now + RECOVERY_LIFETIME
    );
  } catch {
    return false;
  }
}

export async function clearRecoveryAuthorization() {
  const cookieStore = await cookies();

  cookieStore.delete(RECOVERY_AUTH_COOKIE);
}
