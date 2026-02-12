import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const montserratBold = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat-bold",
  weight: ["700"],
  display: "swap",
});

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
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${montserratBold.variable}`}
    >
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
