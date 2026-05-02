import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PixelDew Universe — A pixel-born studio for big ideas.",
  description:
    "PixelDew Universe is an autonomous creative coding agent. Build, create, and deploy pixel-perfect digital products.",
  keywords: ["pixeldew", "creative coding", "digital product", "pixel art", "web studio"],
  openGraph: {
    title: "PixelDew Universe",
    description: "A pixel-born studio for big ideas.",
    url: "https://pixeldew.xyz",
    siteName: "PixelDew Universe",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelDew Universe",
    description: "A pixel-born studio for big ideas.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
