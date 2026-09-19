import type { MetadataRoute } from "next";
import { getPrograms } from "@/services/program.service";
import { getAllTeamMembers } from "@/services/team.service";
import { SITE_CONFIG } from "@/constants/site";

// Static dates — only bump when content actually changes to give Googlebot accurate freshness signals.
const SITE_LAUNCH = "2025-07-01";
const MONTHLY_STABLE = "2025-06-01";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const programs = await getPrograms();
  const teamMembers = await getAllTeamMembers();
  const base = SITE_CONFIG.baseUrl;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                         lastModified: SITE_LAUNCH,    changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/about`,              lastModified: MONTHLY_STABLE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/programs`,           lastModified: SITE_LAUNCH,    changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/instructor`,         lastModified: MONTHLY_STABLE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/team`,               lastModified: MONTHLY_STABLE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/gallery`,            lastModified: MONTHLY_STABLE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/events`,             lastModified: SITE_LAUNCH,    changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/achievements`,       lastModified: MONTHLY_STABLE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/branches`,           lastModified: MONTHLY_STABLE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`,            lastModified: MONTHLY_STABLE, changeFrequency: "yearly",  priority: 0.9 },
    { url: `${base}/faq`,                lastModified: MONTHLY_STABLE, changeFrequency: "monthly", priority: 0.6 },
  ];

  const programRoutes: MetadataRoute.Sitemap = programs.map((p) => ({
    url: `${base}/programs/${p.slug}`,
    lastModified: SITE_LAUNCH,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const teamRoutes: MetadataRoute.Sitemap = teamMembers
    .filter((m) => !m.featured)
    .map((m) => ({
      url: `${base}/team/${m.slug}`,
      lastModified: MONTHLY_STABLE,
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  return [...staticRoutes, ...programRoutes, ...teamRoutes];
}
