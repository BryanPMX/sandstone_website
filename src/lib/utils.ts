import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shouldBypassNextImageOptimization(src: string | undefined): boolean {
  if (!src) {
    return false;
  }

  try {
    const url = new URL(src);
    return /(^|\.)spark(platform|api)\.com$/i.test(url.hostname) ||
      /(^|\.)resize\.sparkplatform\.com$/i.test(url.hostname);
  } catch {
    return false;
  }
}
