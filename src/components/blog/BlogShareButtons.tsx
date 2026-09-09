"use client";

import { useState } from "react";
import { Facebook, Link2, MessageCircle, Twitter } from "lucide-react";

interface BlogShareButtonsProps {
  url: string;
  title: string;
}

export function BlogShareButtons({ url, title }: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: Facebook,
    },
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      Icon: Twitter,
    },
    {
      label: "Share on WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      Icon: MessageCircle,
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — silently ignore.
    }
  };

  const iconButtonClasses =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--sandstone-navy)]/15 text-[var(--sandstone-navy)] transition hover:border-[var(--sandstone-sand-gold)] hover:bg-[var(--sandstone-sand-gold)]/10 hover:text-[var(--sandstone-sand-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--sandstone-charcoal)]/60">
        Share
      </span>

      {shareLinks.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={iconButtonClasses}
        >
          <Icon size={16} />
        </a>
      ))}

      <button
        type="button"
        onClick={handleCopyLink}
        aria-label="Copy link"
        title={copied ? "Link copied!" : "Copy link"}
        className={iconButtonClasses}
      >
        <Link2 size={16} />
      </button>

      {copied ? (
        <span className="text-xs font-medium text-[var(--sandstone-sand-gold)]">
          Link copied!
        </span>
      ) : null}
    </div>
  );
}
