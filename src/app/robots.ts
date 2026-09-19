import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/privacy-policy", "/terms"],
      },
    ],
    sitemap: `${SITE_CONFIG.baseUrl}/sitemap.xml`,
  };
}
