import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
  preload: true,
});

export const metadata: Metadata = {
  title: "Sandstone Real Estate Group | El Paso",
  description:
    "Luxury. Lifestyle. Legacy. Redefining real estate in El Paso and the Southwest through trust, lifestyle, and innovation.",
  openGraph: {
    title: "Sandstone Real Estate Group",
    description:
      "Luxury. Lifestyle. Legacy. Your trusted real estate partner in El Paso.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body suppressHydrationWarning className="min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
