import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Admin image uploads go through the uploadImage server action; cap it a bit
    // above our 5MB app-level limit (src/app/admin/actions.ts) to leave headroom
    // for multipart overhead so a 5MB file never hits Next's raw 1MB default and
    // surfaces as an unhandled 413 instead of our friendly validation message.
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
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
