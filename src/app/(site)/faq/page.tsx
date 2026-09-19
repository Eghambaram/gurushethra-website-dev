import type { Metadata } from "next";
import { getFAQItems } from "@/services/faq.service";
import { FAQAccordion } from "@/features/faq/FAQAccordion";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { CTABand } from "@/features/contact/CTABand";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about GIMA — programs, age groups, fees, belt progression, and more.",
  alternates: { canonical: `${SITE_CONFIG.baseUrl}/faq` },
  openGraph: {
    title: "FAQ | Gurushethra Institute of Martial Arts",
    description: "Answers to common questions about GIMA — programs, age groups, fees, belt progression, and more.",
    url: `${SITE_CONFIG.baseUrl}/faq`,
    type: "website",
    images: [{ url: `${SITE_CONFIG.baseUrl}/images/og-default.jpg`, width: 1200, height: 630, alt: "GIMA FAQ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Gurushethra Institute of Martial Arts",
    description: "Answers to common questions about GIMA — programs, age groups, fees, belt progression, and more.",
    images: [{ url: `${SITE_CONFIG.baseUrl}/images/og-default.jpg`, alt: "GIMA FAQ" }],
  },
};

export default async function FAQPage() {
  const items = await getFAQItems();
  const breadcrumb = breadcrumbSchema([{ name: "FAQ", url: "/faq" }]);
  const faq = faqSchema(items.map((i) => ({ question: i.question, answer: i.answer })));
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <main className="pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "FAQ" }]} />
          <section className="py-16 flex flex-col gap-12 max-w-3xl mx-auto">
            <SectionHeading as="h1" eyebrow="Questions" headline="Frequently Asked Questions"
              subtitle="Everything you need to know before your first class. Still have questions? Just call us." />
            <FAQAccordion items={items} />
          </section>
        </div>
        <CTABand
          eyebrow="Still Curious?"
          headline={<>The Best Answers<br />Come From a Free Class.</>}
          subtitle="Got a question we haven't covered? Ask us in person — book a free trial and talk to an instructor directly."
        />
      </main>
    </>
  );
}
