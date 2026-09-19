import type { Metadata } from "next";
import { getEvents } from "@/services/events.service";
import { EventsGrid } from "@/features/events/EventsGrid";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { breadcrumbSchema, eventSchema } from "@/lib/schema";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and past events at GIMA — training camps, belt grading examinations, and karate tournaments.",
  alternates: { canonical: `${SITE_CONFIG.baseUrl}/events` },
  openGraph: {
    title: "Events | Gurushethra Institute of Martial Arts",
    description: "Upcoming and past events at GIMA — training camps, belt grading examinations, and karate tournaments.",
    url: `${SITE_CONFIG.baseUrl}/events`,
    type: "website",
    images: [{ url: `${SITE_CONFIG.baseUrl}/images/og-default.jpg`, width: 1200, height: 630, alt: "GIMA Events" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Events | Gurushethra Institute of Martial Arts",
    description: "Upcoming and past events at GIMA — training camps, belt grading examinations, and karate tournaments.",
    images: [{ url: `${SITE_CONFIG.baseUrl}/images/og-default.jpg`, alt: "GIMA Events" }],
  },
};

export default async function EventsPage() {
  const events = await getEvents();
  const breadcrumb = breadcrumbSchema([{ name: "Events", url: "/events" }]);
  const upcomingEvents = events.filter((e) => e.status === "upcoming");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {upcomingEvents.map((e) => (
        <script key={e.id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema(e)) }} />
      ))}
      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
          <Breadcrumb items={[{ label: "Events" }]} />
          <SectionHeading as="h1" eyebrow="What's On" headline="Events" subtitle="Camps, belt tests, and tournaments — stay connected with GIMA." />
          <EventsGrid events={events} />
        </div>
      </main>
    </>
  );
}
