"use client";

import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="text-sm font-medium text-[var(--sandstone-sand-gold)] hover:underline"
    >
      ← Go back
    </button>
  );
}
