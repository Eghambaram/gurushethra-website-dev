import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getGalleryItems } from "@/services/gallery.service";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { SectionSkeleton } from "@/components/common/SectionSkeleton";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_CONFIG } from "@/constants/site";

const GalleryGrid = dynamic(
  () => import("@/features/gallery/GalleryGrid").then((m) => ({ default: m.GalleryGrid })),
  { loading: () => <SectionSkeleton height="h-[600px]" /> }
);

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from GIMA training sessions, tournaments, events, and black belt gradings.",
  alternates: { canonical: `${SITE_CONFIG.baseUrl}/gallery` },
  openGraph: {
    title: "Gallery | Gurushethra Institute of Martial Arts",
    description: "Photos from GIMA training sessions, tournaments, events, and black belt gradings.",
    url: `${SITE_CONFIG.baseUrl}/gallery`,
    type: "website",
    images: [{ url: `${SITE_CONFIG.baseUrl}/images/og-default.jpg`, width: 1200, height: 630, alt: "GIMA Gallery" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | Gurushethra Institute of Martial Arts",
    description: "Photos from GIMA training sessions, tournaments, events, and black belt gradings.",
    images: [{ url: `${SITE_CONFIG.baseUrl}/images/og-default.jpg`, alt: "GIMA Gallery" }],
  },
};

export default async function GalleryPage() {
  const items = await getGalleryItems();
  const jsonLd = breadcrumbSchema([{ name: "Gallery", url: "/gallery" }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
          <Breadcrumb items={[{ label: "Gallery" }]} />
          <SectionHeading as="h1" eyebrow="Visual Story" headline="Gallery" subtitle="Life at GIMA — captured." />
          <GalleryGrid items={items} />
        </div>
      </main>
    </>
  );
}
