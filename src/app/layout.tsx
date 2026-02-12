import type { Metadata } from "next";
import type React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home - Sandstone Real Estate Team",
  description:
    "Sandstone Real Estate Team serves El Paso, Texas & Fort Bliss with commitment and integrity. Live The Difference—modern layouts, premium finishes, timeless comfort.",
  openGraph: {
    title: "Home - Sandstone Real Estate Team",
    description:
      "Helping families find their place in El Paso & Fort Bliss. Your trusted realtors.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVars = {
    "--font-montserrat": "Montserrat, system-ui, sans-serif",
    "--font-montserrat-bold": "Montserrat, system-ui, sans-serif",
  } as React.CSSProperties;

  return (
    <html
      lang="en"
      style={fontVars}
    >
      <body suppressHydrationWarning className="min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
