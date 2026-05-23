import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import PageTransition from "@/components/PageTransition";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  metadataBase: new URL("https://pixeldew.xyz"),
  title: { default: "PixelDew — Web Creator", template: "%s — PixelDew" },
  description:
    "PixelDew membangun pengalaman digital premium — UI/UX Design, Frontend Development, Branding, dan Motion.",
  keywords: [
    "PixelDew",
    "web creator",
    "UI/UX designer",
    "frontend developer",
    "Indonesia",
    "portfolio",
    "Next.js",
    "web design",
  ],
  authors: [{ name: "PixelDew", url: "https://pixeldew.xyz" }],
  creator: "PixelDew",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://pixeldew.xyz",
    siteName: "PixelDew",
    title: "PixelDew — Web Creator",
    description: "Membangun pengalaman digital yang terasa hidup.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "PixelDew" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelDew — Web Creator",
    description: "Membangun pengalaman digital yang terasa hidup.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  verification: { google: "" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=League+Spartan:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="cursor-dot" />
        <div id="cursor-ring" />
        <Cursor />
        <PageTransition />
        {children}
      </body>
    </html>
  );
}
