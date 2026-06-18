import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/config";

const siteUrl = "https://corazonthedev.vercel.app";
const siteName = siteConfig.personal.name;
const siteDescription =
  `${siteConfig.personal.name} — ${siteConfig.personal.title}. ${siteConfig.personal.bio}`;

export const viewport: Viewport = {
  themeColor: "#0a0e14",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "developer",
    "full-stack",
    "portfolio",
    siteConfig.personal.name,
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: siteConfig.personal.name }],
  creator: siteConfig.personal.name,
  publisher: siteConfig.personal.name,
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    creator: siteConfig.social.twitter || undefined,
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
