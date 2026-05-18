import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import { FloatingWhatsAppBubble } from "@/components/FloatingWhatsAppBubble";
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
  icons: {
    icon: "/mobile-header-logo.webp",
    shortcut: "/mobile-header-logo.webp",
    apple: "/mobile-header-logo.webp",
  },
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
        <Script id="meta-pixel-script" dangerouslySetInnerHTML={{ __html: "!function(f,b,e,v,n,t,s) {if(f.fbq)return;n=f.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)}; if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0'; n.queue=[];t=b.createElement(e);t.async=!0; t.src=v;s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s)}(window, document,'script', 'https://connect.facebook.net/en_US/fbevents.js'); fbq('init', '927301083105505'); fbq('track', 'PageView');" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <noscript><img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=927301083105505&ev=PageView&noscript=1" alt="" /></noscript>
        {children}
        <FloatingWhatsAppBubble />
      </body>
    </html>
  );
}
