
"use client";

import { useEffect, useRef, useState } from "react";

const SUCCESS_PREFIX = "authorization:github:success:";
const ERROR_PREFIX = "authorization:github:error:";
const HANDSHAKE_MESSAGE = "authorizing:github";
const LOGIN_TIMEOUT_MS = 10 * 60 * 1000;

export default function AdminClient() {
  const [connected, setConnected] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const popupRef = useRef<Window | null>(null);
  const timerRef = useRef<number | null>(null);
  const handshakeRef = useRef(false);

  useEffect(() => {
    // Remove the legacy token without restoring or reading it.
    try {
      window.localStorage.removeItem("cms:token");
    } catch {
      // Storage may be unavailable in restricted browsers.
    }

    function finishLogin(
      message: string,
      success = false,
    ) {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }

      const popup = popupRef.current;

      popupRef.current = null;
      handshakeRef.current = false;

      if (popup && !popup.closed) {
        popup.close();
      }

      setConnected(success);
      setIsLoggingIn(false);
      setStatus(message);
    }

    function handleMessage(event: MessageEvent) {
      const popup = popupRef.current;

      if (
        !popup ||
        event.origin !== window.location.origin ||
        event.source !== popup ||
        typeof event.data !== "string"
      ) {
        return;
      }

      const data = event.data;

      if (data === HANDSHAKE_MESSAGE) {
        if (handshakeRef.current) {
          return;
        }

        try {
          popup.postMessage(
            HANDSHAKE_MESSAGE,
            window.location.origin,
          );

          handshakeRef.current = true;
        } catch {
          finishLogin(
            "Unable to communicate with the GitHub login window.",
          );
        }

        return;
      }

      if (!handshakeRef.current) {
        return;
      }

      if (data.startsWith(SUCCESS_PREFIX)) {
        try {
          const payload = JSON.parse(
            data.slice(SUCCESS_PREFIX.length),
          );

          if (
            !payload ||
            typeof payload.token !== "string" ||
            !payload.token.trim() ||
            payload.provider !== "github"
          ) {
            finishLogin(
              "Invalid GitHub authorization response.",
            );
            return;
          }

          // Do not retain the GitHub token in browser storage
          // or React state. This is only a connection indicator.
          finishLogin(
            "GitHub authorization completed. The Blog Editor requires its own sign-in.",
            true,
          );
        } catch {
          finishLogin(
            "Unable to read the GitHub authorization response.",
          );
        }

        return;
      }

      if (data.startsWith(ERROR_PREFIX)) {
        try {
          const payload = JSON.parse(
            data.slice(ERROR_PREFIX.length),
          );

          const message =
            typeof payload?.message === "string" &&
            payload.message.trim()
              ? payload.message.slice(0, 300)
              : "GitHub authentication failed.";

          finishLogin(`Login error: ${message}`);
        } catch {
          finishLogin(
            "Unable to read the GitHub authentication error.",
          );
        }
      }
    }

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener(
        "message",
        handleMessage,
      );

      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }

      const popup = popupRef.current;

      popupRef.current = null;
      handshakeRef.current = false;

      if (popup && !popup.closed) {
        popup.close();
      }
    };
  }, []);

  const openLogin = () => {
    if (
      popupRef.current &&
      !popupRef.current.closed
    ) {
      popupRef.current.focus();
      return;
    }

    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    popupRef.current = null;
    handshakeRef.current = false;

    setConnected(false);
    setStatus("Opening GitHub login...");
    setIsLoggingIn(true);

    const width = Math.round(window.innerWidth * 0.6);
    const height = Math.round(window.innerHeight * 0.7);

    const left = Math.round(
      window.screenX +
        (window.innerWidth - width) / 2,
    );

    const top = Math.round(
      window.screenY +
        (window.innerHeight - height) / 2,
    );

    const features =
      `width=${width},height=${height},` +
      `left=${left},top=${top}`;

    const popup = window.open(
      `/api/decap/auth?origin=${encodeURIComponent(
        window.location.origin,
      )}`,
      "_blank",
      features,
    );

    if (!popup) {
      setIsLoggingIn(false);
      setStatus(
        "Popup blocked. Allow popups for this site.",
      );
      return;
    }

    popupRef.current = popup;

    const startedAt = Date.now();

    timerRef.current = window.setInterval(() => {
      const activePopup = popupRef.current;

      if (
        activePopup &&
        !activePopup.closed &&
        Date.now() - startedAt < LOGIN_TIMEOUT_MS
      ) {
        return;
      }

      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }

      const timedOut =
        Date.now() - startedAt >= LOGIN_TIMEOUT_MS;

      popupRef.current = null;
      handshakeRef.current = false;

      if (activePopup && !activePopup.closed) {
        activePopup.close();
      }

      setIsLoggingIn(false);

      setStatus(
        timedOut
          ? "GitHub login timed out. Please try again."
          : "Login window closed.",
      );
    }, 500);
  };

  const cancelLogin = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const popup = popupRef.current;

    popupRef.current = null;
    handshakeRef.current = false;

    if (popup && !popup.closed) {
      popup.close();
    }

    setIsLoggingIn(false);
    setConnected(false);
    setStatus("GitHub login cancelled.");
  };

  const disconnect = () => {
    setConnected(false);
    setStatus(
      "Connection indicator cleared. This does not sign you out of GitHub or the Blog Editor.",
    );
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold">
        Site Admin
      </h1>

      <p className="mt-2 text-sm text-gray-600">
        Manage content and site data.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        {connected ? (
          <>
            <button
              type="button"
              onClick={disconnect}
              className="rounded bg-red-600 px-4 py-2 text-white"
            >
              Clear connection
            </button>

            <span className="text-sm text-green-700">
              GitHub authorization completed
            </span>
          </>
        ) : (
          <button
            type="button"
            onClick={openLogin}
            disabled={isLoggingIn}
            className="rounded bg-[var(--sandstone-navy)] px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoggingIn
              ? "Connecting..."
              : "Login with GitHub"}
          </button>
        )}

        {isLoggingIn ? (
          <button
            type="button"
            onClick={cancelLogin}
            className="rounded border px-4 py-2 text-sm"
          >
            Cancel
          </button>
        ) : null}

        {status ? (
          <p
            role="status"
            aria-live="polite"
            className="text-sm text-gray-700"
          >
            {status}
          </p>
        ) : null}
      </div>

      <div className="mt-4 rounded border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        GitHub authorization does not grant Sandstone
        administrator permissions. The Blog Editor uses
        its own GitHub sign-in. Review submissions are
        temporarily disabled while administrator security
        is being upgraded.
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded border bg-gray-50 p-4">
          <span className="text-lg font-semibold">
            Reviews
          </span>

          <p className="mt-1 text-sm text-gray-500">
            Temporarily unavailable during security
            upgrades.
          </p>
        </div>

        <a
          href="/admin/index.html"
          className="flex flex-col justify-center rounded border p-4 hover:shadow"
        >
          <span className="text-lg font-semibold">
            Blog Editor
          </span>

          <span className="text-sm text-gray-500">
            Create and edit blog posts
          </span>
        </a>
      </div>
    </div>
  );
}
