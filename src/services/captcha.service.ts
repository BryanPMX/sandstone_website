import "server-only";

export interface CaptchaVerificationResult {
  ok: boolean;
  error?: string;
}

export interface ICaptchaVerificationService {
  verify(token: string, secretKey: string): Promise<CaptchaVerificationResult>;
}

type TurnstileVerifyResponse = {
  success?: boolean;
  "error-codes"?: string[];
};

async function verifyTurnstileToken(
  token: string,
  secretKey: string,
): Promise<CaptchaVerificationResult> {
  if (typeof token !== "string" || !token.trim() || token.length > 2048) {
    return {
      ok: false,
      error: "Please complete the captcha and try again.",
    };
  }

  if (!secretKey.trim()) {
    return {
      ok: false,
      error: "Security verification is temporarily unavailable.",
    };
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: secretKey,
          response: token,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      },
    );

    if (!response.ok) {
      console.error(
        "[CaptchaService] Verification HTTP error:",
        response.status,
      );

      return {
        ok: false,
        error: "Captcha verification failed. Please try again.",
      };
    }

    const data = (await response.json()) as TurnstileVerifyResponse;

    if (data.success !== true) {
      return {
        ok: false,
        error: "Please complete the captcha and try again.",
      };
    }

    return { ok: true };
  } catch {
    console.error("[CaptchaService] Verification request failed.");

    return {
      ok: false,
      error: "Security verification failed. Please try again.",
    };
  }
}

export const captchaVerificationService: ICaptchaVerificationService = {
  verify: verifyTurnstileToken,
};
