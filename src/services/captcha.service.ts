/**
 * Result of verifying a CAPTCHA token with an external provider.
 */
export interface CaptchaVerificationResult {
  ok: boolean;
  error?: string;
}

/**
 * Abstraction for CAPTCHA verification (Turnstile, reCAPTCHA, hCaptcha).
 */
export interface ICaptchaVerificationService {
  verify(token: string, secretKey: string): Promise<CaptchaVerificationResult>;
}

type TurnstileVerifyResponse = {
  success?: boolean;
  "error-codes"?: string[];
};

async function verifyTurnstileToken(
  token: string,
  secretKey: string
): Promise<CaptchaVerificationResult> {
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
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("[CaptchaService] verification HTTP error:", response.status, text);
      return {
        ok: false,
        error: "Captcha verification failed. Please try again.",
      };
    }

    const data = (await response.json()) as TurnstileVerifyResponse;

    if (!data.success) {
      console.warn("[CaptchaService] Turnstile rejected token:", data["error-codes"]);
      return {
        ok: false,
        error: "Please complete the captcha and try again.",
      };
    }

    return { ok: true };
  } catch (error) {
    console.error("[CaptchaService] verification request failed:", error);
    return {
      ok: false,
      error: "Captcha verification failed. Please try again.",
    };
  }
}

export const captchaVerificationService: ICaptchaVerificationService = {
  verify: verifyTurnstileToken,
};
