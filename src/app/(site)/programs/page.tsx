import type { Metadata } from "next";
import { getPrograms } from "@/services/program.service";
import { ProgramCard } from "@/components/common/ProgramCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { CTABand } from "@/features/contact/CTABand";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: "Programs",
  description: "Six Goju-Ryu karate programs for ages 4 to adult — Little Tigers, Junior Karate, Teen Warriors, Adult Karate, Women's Self-Defense, and Competition Squad.",
  alternates: { canonical: `${SITE_CONFIG.baseUrl}/programs` },
  openGraph: {
    title: "Karate Programs | Gurushethra Institute of Martial Arts",
    description: "Six Goju-Ryu karate programs for ages 4 to adult — find the right program for you.",
    url: `${SITE_CONFIG.baseUrl}/programs`,
    type: "website",
    images: [{ url: `${SITE_CONFIG.baseUrl}/images/og-default.jpg`, width: 1200, height: 630, alt: "GIMA Programs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karate Programs | Gurushethra Institute of Martial Arts",
    description: "Six Goju-Ryu karate programs for ages 4 to adult — find the right program for you.",
    images: [{ url: `${SITE_CONFIG.baseUrl}/images/og-default.jpg`, alt: "GIMA Programs" }],
  },
};

export default async function ProgramsPage() {
  const programs = await getPrograms();
  const breadcrumb = breadcrumbSchema([{ name: "Programs", url: "/programs" }]);
  const listing = itemListSchema(
    programs.map((p) => ({ name: p.title, url: `/programs/${p.slug}`, description: p.shortDescription }))
  );
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listing) }} />
      <main className="pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <Breadcrumb items={[{ label: "Programs" }]} />
        </div>
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-14">
          <SectionHeading
            as="h1"
            eyebrow="What We Offer"
            headline="Programs for Every Stage"
            subtitle="From your child's first kata to your national championship debut — GIMA has a program built for you."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((p, i) => <ProgramCard key={p.id} program={p} index={i} />)}
          </div>
        </section>
        <CTABand
          eyebrow="Pick Your Path"
          headline={<>Found Your Program?<br />Let's Get Started.</>}
          subtitle="Whichever program fits your age and goals, the first class is free — no equipment, no commitment, just show up."
        />
      </main>
    </>
  );
}
