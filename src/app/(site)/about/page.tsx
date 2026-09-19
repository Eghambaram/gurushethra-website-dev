import type { Metadata } from "next";
import { getTimeline, getValues } from "@/services/timeline.service";
import { getAboutHero } from "@/services/about.service";
import { AboutHero } from "@/features/about/AboutHero";
import { AboutStats } from "@/features/about/AboutStats";
import { TimelineSection } from "@/features/about/TimelineSection";
import { ValuesSection } from "@/features/about/ValuesSection";
import { CTABand } from "@/features/contact/CTABand";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story of Gurushethra Institute of Martial Arts — 26+ years building champions and character through authentic Okinawan Goju-Ryu Karate in Chennai.",
  alternates: { canonical: `${SITE_CONFIG.baseUrl}/about` },
  openGraph: {
    title: "About Gurushethra Institute of Martial Arts",
    description:
      "26+ years building champions through authentic Goju-Ryu karate. Our journey from a single dojo to four centres across Chennai.",
    url: `${SITE_CONFIG.baseUrl}/about`,
    type: "website",
    images: [{ url: `${SITE_CONFIG.baseUrl}/images/og-default.jpg`, width: 1200, height: 630, alt: "About GIMA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Gurushethra Institute of Martial Arts",
    description: "26+ years building champions through authentic Goju-Ryu karate. Our journey from a single dojo to four centres across Chennai.",
    images: [{ url: `${SITE_CONFIG.baseUrl}/images/og-default.jpg`, alt: "About GIMA" }],
  },
};

export default async function AboutPage() {
  const [timeline, values, aboutHero] = await Promise.all([getTimeline(), getValues(), getAboutHero()]);

  const jsonLd = breadcrumbSchema([{ name: "About", url: "/about" }]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <Breadcrumb items={[{ label: "About" }]} />
        </div>

        <AboutHero aboutHero={aboutHero} />
        <AboutStats />
        <TimelineSection items={timeline} />
        <ValuesSection values={values} />
        <CTABand />
      </main>
    </>
  );
}
