import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Corporate proxy intercepts HTTPS server-side (UNABLE_TO_GET_ISSUER_CERT_LOCALLY).
    // Disabled only in development; Vercel production gets full optimization (WebP/AVIF, resizing).
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.ggpht.com",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
  // Cache headers only in production — Vercel handles /_next/static/ automatically,
  // and setting them in dev breaks Turbopack's HMR asset cache.
  ...(process.env.NODE_ENV === "production" && {
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            { key: "Cache-Control", value: "public, s-maxage=3600, stale-while-revalidate=86400" },
          ],
        },
      ];
    },
  }),
};

export default nextConfig;
