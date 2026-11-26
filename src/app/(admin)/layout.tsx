import { SITE_ORIGIN } from "@/constants/seo";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),

  title: "Site Administration | Sandstone Real Estate Group",

  description: "Sandstone Real Estate Group administration.",

  icons: {
    icon: "/mobile-header-logo.webp",
    shortcut: "/mobile-header-logo.webp",
    apple: "/mobile-header-logo.webp",
  },

  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },

  referrer: "no-referrer",
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
