import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "PixelDew — Web Creator",
  description: "PixelDew builds premium digital experiences — UI/UX, frontend, branding, motion.",
  keywords: ["PixelDew", "web creator", "UI/UX design", "frontend developer", "portfolio"],
  openGraph: {
    title: "PixelDew — Web Creator",
    description: "Building premium digital experiences.",
    url: "https://pixeldew.xyz",
    siteName: "PixelDew",
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "var(--font-geist), ui-sans-serif, sans-serif" }}>
        <div id="cursor-dot" />
        <div id="cursor-ring" />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
