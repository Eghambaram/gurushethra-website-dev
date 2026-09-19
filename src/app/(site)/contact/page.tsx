import type { Metadata } from "next";
import { getBranches } from "@/services/branches.service";
import { ContactForm } from "@/features/contact/ContactForm";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_CONFIG } from "@/constants/site";
import { getSiteSettings } from "@/services/settings.service";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with GIMA — book a free trial, ask about programs, or find your nearest branch.",
  alternates: { canonical: `${SITE_CONFIG.baseUrl}/contact` },
  openGraph: {
    title: "Contact | Gurushethra Institute of Martial Arts",
    description: "Get in touch with GIMA — book a free trial, ask about programs, or find your nearest branch.",
    url: `${SITE_CONFIG.baseUrl}/contact`,
    type: "website",
    images: [{ url: `${SITE_CONFIG.baseUrl}/images/og-default.jpg`, width: 1200, height: 630, alt: "Contact GIMA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Gurushethra Institute of Martial Arts",
    description: "Get in touch with GIMA — book a free trial, ask about programs, or find your nearest branch.",
    images: [{ url: `${SITE_CONFIG.baseUrl}/images/og-default.jpg`, alt: "Contact GIMA" }],
  },
};

export default async function ContactPage() {
  const [branches, settings] = await Promise.all([getBranches(), getSiteSettings()]);
  const jsonLd = breadcrumbSchema([{ name: "Contact", url: "/contact" }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
          <Breadcrumb items={[{ label: "Contact" }]} />
          <SectionHeading as="h1" eyebrow="Get In Touch" headline="We'd Love to Hear From You"
            subtitle="Book a free trial, ask about programs, or just say hello — we respond within 24 hours." />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Info column */}
            <aside className="lg:col-span-2 flex flex-col gap-8">
              <div className="p-6 rounded-2xl bg-brand-surface border border-white/5 flex flex-col gap-5">
                <h2 className="font-heading font-bold text-white text-lg">Contact Information</h2>
                <ul className="flex flex-col gap-3 text-sm">
                  <li><a href={`tel:${settings.phone}`} className="flex items-start gap-3 text-gray-400 hover:text-brand-gold transition-colors">
                    <Phone size={14} className="text-brand-gold shrink-0 mt-0.5" aria-hidden />{settings.phone}</a></li>
                  <li><a href={`mailto:${settings.email}`} className="flex items-start gap-3 text-gray-400 hover:text-brand-gold transition-colors">
                    <Mail size={14} className="text-brand-gold shrink-0 mt-0.5" aria-hidden />{settings.email}</a></li>
                  <li className="flex items-start gap-3 text-gray-400">
                    <Clock size={14} className="text-brand-gold shrink-0 mt-0.5" aria-hidden />{settings.hours}</li>
                  <li className="flex items-start gap-3 text-gray-400">
                    <MapPin size={14} className="text-brand-gold shrink-0 mt-0.5" aria-hidden />{settings.address}</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-brand-surface border border-white/5 flex flex-col gap-4">
                <h2 className="font-heading font-bold text-white text-lg">Our Branches</h2>
                <ul className="flex flex-col gap-3">
                  {branches.map((b) => (
                    <li key={b.id} className="flex flex-col gap-0.5">
                      <span className="text-white font-medium text-sm">{b.name}</span>
                      <span className="text-gray-500 text-xs">{b.address}</span>
                      <a href={`tel:${b.phone}`} className="text-brand-gold text-xs hover:underline">{b.phone}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl overflow-hidden border border-white/8 aspect-video">
                <iframe src={settings.mapEmbed} title="GIMA HQ location" width="100%" height="100%"
                  loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full grayscale" />
              </div>
            </aside>

            {/* Form column */}
            <div className="lg:col-span-3 p-8 rounded-2xl bg-brand-surface border border-white/5">
              <h2 className="font-heading font-bold text-white text-xl mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
