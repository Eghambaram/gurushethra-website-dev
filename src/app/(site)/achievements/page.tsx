import type { Metadata } from "next";
import { getAchievements } from "@/services/achievements.service";
import { AchievementCard } from "@/components/common/AchievementCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { StatTile } from "@/components/common/StatTile";
import { CTABand } from "@/features/contact/CTABand";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: "Achievements",
  description: "GIMA's championship record — national medals, state titles, and international representation.",
  alternates: { canonical: `${SITE_CONFIG.baseUrl}/achievements` },
  openGraph: {
    title: "Achievements | Gurushethra Institute of Martial Arts",
    description: "GIMA's championship record — national medals, state titles, and international representation.",
    url: `${SITE_CONFIG.baseUrl}/achievements`,
    type: "website",
    images: [{ url: `${SITE_CONFIG.baseUrl}/images/og-default.jpg`, width: 1200, height: 630, alt: "GIMA Achievements" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Achievements | Gurushethra Institute of Martial Arts",
    description: "GIMA's championship record — national medals, state titles, and international representation.",
    images: [{ url: `${SITE_CONFIG.baseUrl}/images/og-default.jpg`, alt: "GIMA Achievements" }],
  },
};

export default async function AchievementsPage() {
  const achievements = await getAchievements();
  const jsonLd = breadcrumbSchema([{ name: "Achievements", url: "/achievements" }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Achievements" }]} />
          <section className="py-16 flex flex-col gap-14">
            <SectionHeading as="h1" eyebrow="Our Record" headline="A Legacy of Champions"
              subtitle="Decades of dedication, measured in medals, titles, and lives transformed." />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.stats.map((s, i) => (
                <StatTile key={s.label} value={s.value} suffix={s.suffix} label={s.label} index={i} size="lg" labelUppercase />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
              <div>{achievements.recent.slice(0, 2).map((a, i) => <AchievementCard key={a.id} achievement={a} index={i} />)}</div>
              <div>{achievements.recent.slice(2).map((a, i) => <AchievementCard key={a.id} achievement={a} index={i + 2} />)}</div>
            </div>
          </section>
        </div>
        <CTABand
          eyebrow="Write Your Own Story"
          headline={<>Ready to Earn<br />Your Own Medal?</>}
          subtitle="Every champion on this page started with a free trial class. Come find out what you're capable of."
        />
      </main>
    </>
  );
}
