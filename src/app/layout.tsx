import type { Metadata, Viewport } from "next";
import { poppins, inter } from "@/lib/fonts";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0B0B0B",
};

export const metadata: Metadata = {
  title: {
    default: "Gurushethra Institute of Martial Arts",
    template: "%s | Gurushethra Institute of Martial Arts",
  },
  description:
    "Traditional Okinawan Goju-Ryu Karate academy in Chennai. 26+ years of excellence. Classes for children, teens, and adults. Book your free trial today.",
  metadataBase: new URL("https://gurushethra.com"),
  keywords: [
    "karate classes Chennai",
    "Goju-Ryu karate Chennai",
    "martial arts Chennai",
    "karate for kids Chennai",
    "self-defence classes Chennai",
    "Okinawan karate",
    "Silambam Chennai",
    "Gurushethra Institute",
    "GIMA Chennai",
  ],
  authors: [{ name: "Gurushethra Institute of Martial Arts" }],
  robots: { index: true, follow: true },
  openGraph: {
    siteName: "Gurushethra Institute of Martial Arts",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Gurushethra Institute of Martial Arts" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@gurushethra",
    images: ["/images/og-default.jpg"],
  },
  alternates: { canonical: "https://gurushethra.com" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Preconnect to external image CDNs used throughout the site */}
        <link rel="preconnect" href="https://blogger.googleusercontent.com" />
        <link rel="dns-prefetch" href="https://blogger.googleusercontent.com" />
      </head>
      <body className="min-h-full flex flex-col bg-brand-background text-white">
        {children}
      </body>
    </html>
  );
}
