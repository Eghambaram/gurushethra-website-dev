import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { getSiteSettings } from "@/services/settings.service";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Gurushethra Institute of Martial Arts.",
  robots: { index: false, follow: true },
};

export default async function PrivacyPolicyPage() {
  const settings = await getSiteSettings();
  return (
    <main className="pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <Breadcrumb items={[{ label: "Privacy Policy" }]} />
        <div className="prose prose-invert prose-sm max-w-none">
          <h1 className="font-heading font-black text-white text-4xl mb-2">Privacy Policy</h1>
          <p className="text-gray-500 text-sm mb-8">Last updated: January 2024</p>

          <Section title="1. Information We Collect">
            We collect information you provide directly to us when you fill in our enquiry form, including your name, mobile number, email address, and message. We may also collect standard web analytics data (pages visited, device type, browser) via anonymised tools.
          </Section>
          <Section title="2. How We Use Your Information">
            We use the information collected to respond to your enquiries, schedule trial classes, send important updates about programs or events, and improve our website. We do not use your data for advertising or sell it to third parties.
          </Section>
          <Section title="3. Data Storage">
            Form submissions are processed and stored securely. We retain enquiry data for up to 24 months. You may request deletion at any time by emailing {settings.email}.
          </Section>
          <Section title="4. Cookies">
            Our website uses essential cookies required for basic functionality. We do not use tracking or advertising cookies. You can disable cookies in your browser settings; this will not affect your ability to use the site.
          </Section>
          <Section title="5. Third-Party Services">
            Our website may embed maps from Google Maps and images hosted externally. These services have their own privacy policies and may set cookies independently.
          </Section>
          <Section title="6. Your Rights">
            You have the right to access, correct, or delete your personal data held by us. To exercise these rights, contact us at {settings.email} or {settings.phone}.
          </Section>
          <Section title="7. Contact">
            For any privacy-related queries, contact us at {settings.email}.
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="font-heading font-bold text-white text-xl mb-3">{title}</h2>
      <p className="text-gray-400 text-sm leading-relaxed">{children}</p>
    </div>
  );
}
