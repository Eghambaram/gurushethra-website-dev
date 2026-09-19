import type { Metadata } from "next";
import { getAllTeamMembers, getFeaturedTeamMember, getTeamCategories } from "@/services/team.service";
import { TeamHero } from "@/features/team/TeamHero";
import { FounderSpotlight } from "@/features/team/FounderSpotlight";
import { TeamDirectory } from "@/features/team/TeamDirectory";
import { CTABand } from "@/features/contact/CTABand";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the senseis, coaches, and committee members leading Gurushethra Institute of Martial Arts across Chennai.",
  alternates: { canonical: `${SITE_CONFIG.baseUrl}/team` },
  openGraph: {
    title: "Our Team | GIMA",
    description: "Meet the senseis, coaches, and committee members leading Gurushethra Institute of Martial Arts across Chennai.",
    url: `${SITE_CONFIG.baseUrl}/team`,
    type: "website",
    images: [{ url: `${SITE_CONFIG.baseUrl}/images/og-default.jpg`, width: 1200, height: 630, alt: "GIMA Team" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Team | GIMA",
    description: "Meet the senseis, coaches, and committee members leading Gurushethra Institute of Martial Arts across Chennai.",
    images: [{ url: `${SITE_CONFIG.baseUrl}/images/og-default.jpg`, alt: "GIMA Team" }],
  },
};

export default async function TeamPage() {
  const [members, founder, categories] = await Promise.all([
    getAllTeamMembers(),
    getFeaturedTeamMember(),
    getTeamCategories(),
  ]);

  const danRankedCount = members.filter((m) => /dan/i.test(m.rank)).length;
  const heroStats = [
    { value: members.length, suffix: "", label: "Instructors & Coaches" },
    { value: danRankedCount, suffix: "", label: "Dan-Ranked Leaders" },
    { value: 4, suffix: "", label: "Training Centres" },
    { value: categories.length, suffix: "", label: "Specialist Teams" },
  ];

  const breadcrumb = breadcrumbSchema([{ name: "Team", url: "/team" }]);
  const itemList = itemListSchema(
    members
      .filter((m) => !m.featured)
      .map((m) => ({ name: m.name, url: `/team/${m.slug}`, description: m.title }))
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <Breadcrumb items={[{ label: "Team" }]} />
        </div>
        <TeamHero stats={heroStats} />
        {founder && <FounderSpotlight founder={founder} />}
        <div id="roster">
          <TeamDirectory categories={categories} />
        </div>
        <CTABand
          eyebrow="Meet Them In Person"
          headline={<>Your Coach Is<br />Ready For You.</>}
          subtitle="Every sensei and coach on this page teaches live classes at a GIMA centre near you. Book a free trial and meet them on the mat."
        />
      </main>
    </>
  );
}
