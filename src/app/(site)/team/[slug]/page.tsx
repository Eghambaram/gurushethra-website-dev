import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getAllTeamMembers, getTeamMemberBySlug } from "@/services/team.service";
import { TeamProfile } from "@/features/team/TeamProfile";
import { CTABand } from "@/features/contact/CTABand";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_CONFIG } from "@/constants/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const members = await getAllTeamMembers();
  return members.filter((m) => !m.featured).map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);
  if (!member) return {};
  const description = `${member.title} — ${member.rank} at Gurushethra Institute of Martial Arts.`;
  return {
    title: member.name,
    description,
    alternates: { canonical: `${SITE_CONFIG.baseUrl}/team/${slug}` },
    openGraph: {
      title: `${member.name} — ${member.title} | GIMA`,
      description,
      url: `${SITE_CONFIG.baseUrl}/team/${slug}`,
      type: "profile",
      images: [{ url: `${SITE_CONFIG.baseUrl}${member.image}`, width: 800, height: 1000, alt: member.name }],
    },
  };
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);
  if (!member) notFound();
  if (member.featured) redirect("/instructor");

  const breadcrumb = breadcrumbSchema([
    { name: "Team", url: "/team" },
    { name: member.name, url: `/team/${slug}` },
  ]);
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.title,
    description: member.bio ?? `${member.title} at ${SITE_CONFIG.name}.`,
    affiliation: { "@type": "SportsOrganization", name: SITE_CONFIG.name, url: SITE_CONFIG.baseUrl },
    worksFor: { "@type": "SportsOrganization", name: SITE_CONFIG.name, url: SITE_CONFIG.baseUrl },
    url: `${SITE_CONFIG.baseUrl}/team/${slug}`,
    image: { "@type": "ImageObject", url: `${SITE_CONFIG.baseUrl}${member.image}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <Breadcrumb items={[{ label: "Team", href: "/team" }, { label: member.name }]} />
        </div>
        <TeamProfile member={member} />
        <CTABand />
      </main>
    </>
  );
}
