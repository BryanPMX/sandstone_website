"use client";

import { useEffect, useState } from "react";

export default function AdminClient() {
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("cms:token") : null;
    if (stored) setToken(stored);

    function handleMessage(e: MessageEvent) {
      const data = String(e.data || "");
      if (data.startsWith("authorization:github:success:")) {
        try {
          const payload = JSON.parse(data.replace("authorization:github:success:", ""));
          if (payload?.token) {
            localStorage.setItem("cms:token", payload.token);
            setToken(payload.token);
            setStatus("Logged in");
          }
        } catch (_err) {
          setStatus("Login parse error");
        }
      }

      if (data.startsWith("authorization:github:error:")) {
        const payload = JSON.parse(data.replace("authorization:github:error:", ""));
        setStatus(`Login error: ${payload?.error ?? "unknown"}`);
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const openLogin = () => {
    setStatus("Opening GitHub login...");
    const w = window.innerWidth * 0.6;
    const h = window.innerHeight * 0.7;
    const left = Math.round(window.screenX + (window.innerWidth - w) / 2);
    const top = Math.round(window.screenY + (window.innerHeight - h) / 2);
    const features = `width=${w},height=${h},left=${left},top=${top}`;
    const popup = window.open(`/api/decap/auth?origin=${encodeURIComponent(location.origin)}`, "_blank", features);

    if (!popup) {
      setStatus("Popup blocked — allow popups for this site.");
      return;
    }

    const timer = setInterval(() => {
      if (popup.closed) {
        clearInterval(timer);
        setStatus((prev) => (prev === "Logged in" ? prev : "Login window closed"));
      }
    }, 500);
  };

  const logout = () => {
    localStorage.removeItem("cms:token");
    setToken(null);
    setStatus("Logged out");
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold">Site Admin</h1>
      <p className="mt-2 text-sm text-gray-600">Manage content and site data.</p>

      <div className="mt-6 flex items-center gap-4">
        {token ? (
          <>
            <button onClick={logout} className="rounded bg-red-600 px-4 py-2 text-white">Logout</button>
            <span className="text-sm text-green-700">Authenticated</span>
          </>
        ) : (
          <button onClick={openLogin} className="rounded bg-[var(--sandstone-navy)] px-4 py-2 text-white">Login with GitHub</button>
        )}
        {status ? <p className="text-sm text-gray-700">{status}</p> : null}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a href="/admin/reviews" className="block rounded border p-4 hover:shadow">Reviews</a>
        <a href="/admin/placeholder" className="block rounded border p-4 hover:shadow">Other admin tools</a>
      </div>
    </div>
  );
}
