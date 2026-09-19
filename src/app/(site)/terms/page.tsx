import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/Breadcrumb";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for Gurushethra Institute of Martial Arts.",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <main className="pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <Breadcrumb items={[{ label: "Terms & Conditions" }]} />
        <div className="prose prose-invert prose-sm max-w-none">
          <h1 className="font-heading font-black text-white text-4xl mb-2">Terms &amp; Conditions</h1>
          <p className="text-gray-500 text-sm mb-8">Last updated: January 2024</p>

          <Section title="1. Enrolment">
            Enrolment at any GIMA centre constitutes acceptance of these terms. The academy reserves the right to refuse admission at its discretion.
          </Section>
          <Section title="2. Fees & Payment">
            Monthly fees are payable in advance by the 5th of each month. Late payments may attract a fee. Fees are non-refundable once paid, except in documented medical circumstances at management discretion.
          </Section>
          <Section title="3. Attendance & Belt Grading">
            Minimum attendance requirements apply for eligibility to appear in belt grading examinations. Students must have instructor clearance before each examination. GIMA reserves the right to defer a student's grading if requirements are not met.
          </Section>
          <Section title="4. Code of Conduct">
            Students and parents are expected to observe the dojo's code of conduct at all times — respect for instructors, fellow students, and the training space. Disruptive or disrespectful behaviour may result in suspension or removal from the academy.
          </Section>
          <Section title="5. Health & Safety">
            Students must disclose any medical conditions or injuries to their instructor before training. GIMA maintains a trained first-aid officer on-site at all times. Protective equipment as specified by the instructor is mandatory for sparring sessions.
          </Section>
          <Section title="6. Liability">
            Participation in martial arts training carries inherent risk of injury. GIMA takes all reasonable precautions to ensure student safety. By enrolling, students (or their guardians) acknowledge this risk and agree not to hold GIMA liable for injuries sustained during training.
          </Section>
          <Section title="7. Photography & Media">
            GIMA may photograph or film training sessions for promotional or documentation purposes. Students who do not wish to be photographed should inform their instructor in writing.
          </Section>
          <Section title="8. Changes to Terms">
            GIMA reserves the right to amend these terms at any time. Updated terms will be communicated via email and posted on this page.
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
