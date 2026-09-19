import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPrograms, getProgramBySlug } from "@/services/program.service";
import { ProgramDetailHero } from "@/features/programs/ProgramDetailHero";
import { CTABand } from "@/features/contact/CTABand";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_CONFIG } from "@/constants/site";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const programs = await getPrograms();
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) return {};
  return {
    title: program.title,
    description: program.shortDescription,
    alternates: { canonical: `${SITE_CONFIG.baseUrl}/programs/${slug}` },
    openGraph: {
      title: `${program.title} | GIMA`,
      description: program.shortDescription,
      url: `${SITE_CONFIG.baseUrl}/programs/${slug}`,
      type: "website",
      images: [{ url: `${SITE_CONFIG.baseUrl}/images/og-default.jpg`, width: 1200, height: 630, alt: program.title }],
    },
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) notFound();

  const jsonLd = breadcrumbSchema([
    { name: "Programs", url: "/programs" },
    { name: program.title, url: `/programs/${slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <ProgramDetailHero program={program} />
        <CTABand />
      </main>
    </>
  );
}
