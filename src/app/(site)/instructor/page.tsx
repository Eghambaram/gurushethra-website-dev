import type { Metadata } from "next";
import { getInstructor } from "@/services/instructor.service";
import { InstructorProfile } from "@/features/instructor/InstructorProfile";
import { CTABand } from "@/features/contact/CTABand";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { breadcrumbSchema, personSchema } from "@/lib/schema";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: "Chief Instructor",
  description: "Meet Aasan Saravanan T. — VII Dan Black Belt, Silambam Instructor, and the founder of Gurushethra Institute of Martial Arts, Chennai.",
  alternates: { canonical: `${SITE_CONFIG.baseUrl}/instructor` },
  openGraph: {
    title: "Chief Instructor — Aasan Saravanan T. | GIMA",
    description: "VII Dan Black Belt with 20+ years of teaching experience. Founder of Gurushethra Institute of Martial Arts, Chennai.",
    url: `${SITE_CONFIG.baseUrl}/instructor`,
    type: "profile",
    images: [{ url: `${SITE_CONFIG.baseUrl}/images/og-default.jpg`, width: 1200, height: 630, alt: "Aasan Saravanan T." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chief Instructor — Aasan Saravanan T. | GIMA",
    description: "VII Dan Black Belt with 20+ years of teaching experience. Founder of Gurushethra Institute of Martial Arts, Chennai.",
    images: [{ url: `${SITE_CONFIG.baseUrl}/images/og-default.jpg`, alt: "Aasan Saravanan T." }],
  },
};

export default async function InstructorPage() {
  const instructor = await getInstructor();
  const breadcrumb = breadcrumbSchema([{ name: "Instructor", url: "/instructor" }]);
  const person = personSchema(instructor);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <Breadcrumb items={[{ label: "Instructor" }]} />
        </div>
        <InstructorProfile instructor={instructor} />
        <CTABand
          eyebrow="Train With Him"
          headline={<>Learn Directly From<br />a VII Dan Black Belt.</>}
          subtitle="Aasan Saravanan T. still teaches in person at every GIMA centre. Book a free trial and see his training philosophy firsthand."
        />
      </main>
    </>
  );
}
