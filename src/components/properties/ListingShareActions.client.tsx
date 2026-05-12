"use client";

import Link from "next/link";
import { Copy, Mail } from "lucide-react";
import { useState } from "react";

interface ListingShareActionsProps {
  facebookShareHref: string;
  emailShareHref: string;
  listingShareUrl: string;
}

export function ListingShareActions({
  facebookShareHref,
  emailShareHref,
  listingShareUrl,
}: ListingShareActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(listingShareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="ml-auto flex items-center gap-2">
      <span className="hidden items-center rounded-full border border-[var(--sandstone-navy)]/16 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--sandstone-charcoal)]/72 sm:inline-flex">
        Share
      </span>

      <Link
        href={facebookShareHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Share this listing on Facebook"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1877f2] text-lg font-bold text-white transition hover:brightness-95"
      >
        <span aria-hidden>f</span>
      </Link>

      <a
        href={emailShareHref}
        aria-label="Share this listing by email"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--sandstone-navy)] text-white transition hover:brightness-95"
      >
        <Mail size={18} />
      </a>

      <button
        type="button"
        onClick={() => {
          void handleCopyLink();
        }}
        aria-label="Copy listing link"
        className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-[var(--sandstone-charcoal)] px-3 text-white transition hover:brightness-95"
      >
        <Copy size={16} />
        <span className="ml-1 hidden text-xs font-semibold sm:inline">{copied ? "Copied!" : "Copy"}</span>
      </button>
    </div>
  );
}
