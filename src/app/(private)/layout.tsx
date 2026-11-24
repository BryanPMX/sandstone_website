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

  title: "Client Portal | Sandstone Real Estate Group",

  description: "Access your personalized Sandstone real estate client portal.",

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

export default function PrivateRootLayout({
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
