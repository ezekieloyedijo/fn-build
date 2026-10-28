import type { Metadata } from "next";
import { Archivo, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Archivo({ subsets: ["latin"], variable: "--font-display", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FNBUILD & Construction | Building The Future With Excellence in Nigeria",
    template: "%s | FNBUILD & Construction",
  },
  description:
    "FNBUILD & Construction is a trusted Nigerian construction company delivering premium residential, commercial, and civil construction, architectural design, and renovation services across Lagos, Abuja, Port Harcourt, and beyond.",
  keywords: [
    "construction company in Nigeria",
    "building construction Lagos",
    "construction company Abuja",
    "estate developers Nigeria",
    "architectural design Nigeria",
    "civil engineering Nigeria",
    "road construction Nigeria",
    "duplex construction Lagos",
    "renovation contractor Nigeria",
    "general contractor Port Harcourt",
  ],
  openGraph: {
    title: "FNBUILD & Construction | Building The Future With Excellence in Nigeria",
    description:
      "Premium construction, architectural design, and civil engineering services across Nigeria. Explore our portfolio and request a free quote in Naira today.",
    url: siteUrl,
    siteName: "FNBUILD & Construction",
    type: "website",
    locale: "en_NG",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FNBUILD & Construction",
    description: "Building the future with excellence, across Nigeria.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
