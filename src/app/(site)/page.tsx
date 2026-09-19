import type { Metadata } from "next";
import { getHero } from "@/services/hero.service";
import { getPrograms } from "@/services/program.service";
import { getInstructor } from "@/services/instructor.service";
import { getGalleryItems } from "@/services/gallery.service";
import { getTestimonials } from "@/services/testimonials.service";
import { getUpcomingEvents } from "@/services/events.service";
import { getAchievements } from "@/services/achievements.service";
import { getWhyChooseUsReasons } from "@/services/whyChooseUs.service";
import dynamic from "next/dynamic";
import { HeroSection } from "@/features/hero/HeroSection";
import { StatsBar } from "@/features/hero/StatsBar";
import { WhyChooseUs } from "@/features/why-choose-us/WhyChooseUs";
import { ProgramsSection } from "@/features/programs/ProgramsSection";
import { InstructorTeaser } from "@/features/instructor/InstructorTeaser";
import { BeltJourneySection } from "@/features/belt-journey/BeltJourneySection";
import { AchievementsTeaser } from "@/features/achievements/AchievementsTeaser";
import { CTABand } from "@/features/contact/CTABand";
import { SectionSkeleton } from "@/components/common/SectionSkeleton";

const GalleryPreview = dynamic(
  () => import("@/features/gallery/GalleryPreview").then((m) => ({ default: m.GalleryPreview })),
  { loading: () => <SectionSkeleton height="h-[480px]" /> }
);
const TestimonialsSection = dynamic(
  () => import("@/features/testimonials/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection })),
  { loading: () => <SectionSkeleton height="h-64" /> }
);
const EventsPreview = dynamic(
  () => import("@/features/events/EventsPreview").then((m) => ({ default: m.EventsPreview })),
  { loading: () => <SectionSkeleton height="h-96" /> }
);
import { SITE_CONFIG } from "@/constants/site";
import { organizationSchema, localBusinessSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Gurushethra Institute of Martial Arts | Okinawan Karate Chennai",
  description:
    "Traditional Okinawan Goju-Ryu Karate in Chennai. 26+ years of excellence, 4 training centres. Classes for children, teens & adults. Book your free trial today.",
  alternates: { canonical: SITE_CONFIG.baseUrl },
  openGraph: {
    title: "Gurushethra Institute of Martial Arts",
    description: "Traditional Okinawan Goju-Ryu Karate in Chennai. 26+ years of excellence, 4 training centres across the city.",
    url: SITE_CONFIG.baseUrl,
    siteName: SITE_CONFIG.name,
    type: "website",
    images: [{ url: `${SITE_CONFIG.baseUrl}/images/og-default.jpg`, width: 1200, height: 630, alt: "GIMA — Gurushethra Institute of Martial Arts" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gurushethra Institute of Martial Arts | Okinawan Karate Chennai",
    description: "Traditional Okinawan Goju-Ryu Karate in Chennai. 26+ years of excellence.",
    images: [`${SITE_CONFIG.baseUrl}/images/og-default.jpg`],
  },
};

export default async function HomePage() {
  const [hero, programs, instructor, gallery, testimonials, events, achievements, whyChooseUsReasons] =
    await Promise.all([
      getHero(),
      getPrograms(),
      getInstructor(),
      getGalleryItems(),
      getTestimonials(),
      getUpcomingEvents(3),
      getAchievements(),
      getWhyChooseUsReasons(),
    ]);

  const orgSchema = organizationSchema();
  const bizSchema = localBusinessSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bizSchema) }} />
      <main>
        <HeroSection hero={hero} />
        <StatsBar stats={hero.stats} />
        <WhyChooseUs reasons={whyChooseUsReasons} />
        <ProgramsSection programs={programs} />
        <InstructorTeaser instructor={instructor} />
        <BeltJourneySection />
        <AchievementsTeaser achievements={achievements} />
        <GalleryPreview items={gallery} />
        <TestimonialsSection testimonials={testimonials} />
        <EventsPreview events={events} />
        <CTABand />
      </main>
    </>
  );
}
