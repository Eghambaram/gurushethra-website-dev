import type { Metadata } from "next";
import { getBranches } from "@/services/branches.service";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { CTAButton } from "@/components/common/CTAButton";
import { CTABand } from "@/features/contact/CTABand";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: "Branches",
  description: "Four GIMA training centres across Chennai — Chromepet, Chitlapakkam (×2), and Nemilichery.",
  alternates: { canonical: `${SITE_CONFIG.baseUrl}/branches` },
  openGraph: {
    title: "Our Branches | Gurushethra Institute of Martial Arts",
    description: "Four GIMA training centres across Chennai — Chromepet, Chitlapakkam (×2), and Nemilichery.",
    url: `${SITE_CONFIG.baseUrl}/branches`,
    type: "website",
    images: [{ url: `${SITE_CONFIG.baseUrl}/images/og-default.jpg`, width: 1200, height: 630, alt: "GIMA Branches" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Branches | Gurushethra Institute of Martial Arts",
    description: "Four GIMA training centres across Chennai — Chromepet, Chitlapakkam (×2), and Nemilichery.",
    images: [{ url: `${SITE_CONFIG.baseUrl}/images/og-default.jpg`, alt: "GIMA Branches" }],
  },
};

export default async function BranchesPage() {
  const branches = await getBranches();
  const jsonLd = breadcrumbSchema([{ name: "Branches", url: "/branches" }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {branches.map((branch) => (
        <script
          key={branch.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(branch)) }}
        />
      ))}
      <main className="pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Branches" }]} />
          <section className="py-16 flex flex-col gap-14">
            <SectionHeading as="h1" eyebrow="Find Us" headline="Our Branches"
              subtitle="Four training centres across Chennai — always close to where you live or work." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {branches.map((branch) => (
                <article key={branch.id} id={branch.slug}
                  className={`relative rounded-2xl overflow-hidden border flex flex-col ${branch.type === "headquarters" ? "border-brand-gold/40 bg-brand-surface" : "border-white/5 bg-brand-surface"}`}>
                  {branch.type === "headquarters" && (
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-gold via-brand-gold/80 to-transparent" aria-hidden />
                  )}
                  <div className="p-6 flex flex-col gap-5 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-heading font-bold text-white text-xl leading-snug">{branch.name}</h2>
                      {branch.type === "headquarters" && (
                        <span className="px-2.5 py-1 bg-brand-gold text-brand-background text-xs font-bold rounded tracking-wide uppercase shrink-0">HQ</span>
                      )}
                    </div>
                    <ul className="flex flex-col gap-2.5 text-sm">
                      <li className="flex items-start gap-2.5 text-gray-400">
                        <MapPin size={13} className="text-brand-gold shrink-0 mt-0.5" aria-hidden />{branch.address}
                      </li>
                      <li><a href={`tel:${branch.phone}`} className="flex items-center gap-2.5 text-gray-400 hover:text-brand-gold transition-colors">
                        <Phone size={13} className="text-brand-gold shrink-0" aria-hidden />{branch.phone}</a></li>
                      <li><a href={`mailto:${branch.email}`} className="flex items-center gap-2.5 text-gray-400 hover:text-brand-gold transition-colors">
                        <Mail size={13} className="text-brand-gold shrink-0" aria-hidden />{branch.email}</a></li>
                      <li className="flex items-center gap-2.5 text-gray-400">
                        <Clock size={13} className="text-brand-gold shrink-0" aria-hidden />{branch.hours}</li>
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {branch.features.map((f) => (
                        <span key={f} className="px-3 py-1 bg-white/5 border border-white/8 text-gray-400 text-xs rounded-full">{f}</span>
                      ))}
                    </div>
                    <div className="rounded-xl overflow-hidden border border-white/8 aspect-video w-full">
                      <iframe src={branch.mapEmbed} title={`${branch.name} location`} width="100%" height="100%"
                        loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full grayscale" />
                    </div>
                    <CTAButton label="Book Trial at This Branch" href="/contact" variant="secondary" size="sm" />
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
        <CTABand
          eyebrow="Pick Your Centre"
          headline={<>Your Nearest Dojo<br />Is Closer Than You Think.</>}
          subtitle="Four centres across Chennai, one standard of training. Book a free trial at whichever is easiest for you to reach."
        />
      </main>
    </>
  );
}
