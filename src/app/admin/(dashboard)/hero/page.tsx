import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { FormField, adminInputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { SavedNotice } from "@/components/admin/SavedNotice";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ICON_NAMES } from "@/lib/icons";
import { updateHero } from "./actions";

interface HeroStat {
  value: number;
  suffix: string;
  label: string;
}

interface HeroBadge {
  icon: string;
  text: string;
}

interface Props {
  searchParams: Promise<{ saved?: string; error?: string }>;
}

export default async function AdminHeroPage({ searchParams }: Props) {
  const { saved, error } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("hero").select("*").single();
  const stats: HeroStat[] = data.stats;
  const badges: HeroBadge[] = data.trust_badges;

  return (
    <>
      <AdminPageHeader title="Hero" description="Home page hero headline, CTAs, stats, and background image." />
      <SavedNotice show={saved === "1"} />
      <ErrorNotice message={error} />

      <form action={updateHero} className="flex flex-col gap-6 max-w-2xl">
        <input type="hidden" name="id" value={data.id} />

        <FormField label="Headline Lines" htmlFor="headline_lines" hint="One line per row">
          <textarea
            id="headline_lines"
            name="headline_lines"
            defaultValue={data.headline_lines.join("\n")}
            rows={4}
            className={adminInputClass}
            required
          />
        </FormField>

        <FormField label="Sub-copy" htmlFor="sub_copy">
          <textarea id="sub_copy" name="sub_copy" defaultValue={data.sub_copy} rows={2} className={adminInputClass} required />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField label="Primary CTA Label" htmlFor="cta_primary_label">
            <input id="cta_primary_label" name="cta_primary_label" defaultValue={data.cta_primary_label} className={adminInputClass} required />
          </FormField>
          <FormField label="Primary CTA Link" htmlFor="cta_primary_href">
            <input id="cta_primary_href" name="cta_primary_href" defaultValue={data.cta_primary_href} className={adminInputClass} required />
          </FormField>
          <FormField label="Secondary CTA Label" htmlFor="cta_secondary_label">
            <input id="cta_secondary_label" name="cta_secondary_label" defaultValue={data.cta_secondary_label} className={adminInputClass} required />
          </FormField>
          <FormField label="Secondary CTA Link" htmlFor="cta_secondary_href">
            <input id="cta_secondary_href" name="cta_secondary_href" defaultValue={data.cta_secondary_href} className={adminInputClass} required />
          </FormField>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-white font-bold text-sm uppercase tracking-wide">Stats (4 tiles)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 rounded-lg bg-brand-surface-2 border border-white/8">
                <FormField label="Value" htmlFor={`stat_${i}_value`}>
                  <input
                    id={`stat_${i}_value`}
                    name={`stat_${i}_value`}
                    type="number"
                    defaultValue={stats[i]?.value}
                    className={adminInputClass}
                    required
                  />
                </FormField>
                <FormField label="Suffix" htmlFor={`stat_${i}_suffix`}>
                  <input id={`stat_${i}_suffix`} name={`stat_${i}_suffix`} defaultValue={stats[i]?.suffix} className={adminInputClass} />
                </FormField>
                <FormField label="Label" htmlFor={`stat_${i}_label`}>
                  <input id={`stat_${i}_label`} name={`stat_${i}_label`} defaultValue={stats[i]?.label} className={adminInputClass} required />
                </FormField>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-white font-bold text-sm uppercase tracking-wide">Trust Badges (3)</h2>
          <div className="flex flex-col gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-3 p-3 rounded-lg bg-brand-surface-2 border border-white/8">
                <FormField label="Icon" htmlFor={`badge_${i}_icon`}>
                  <select id={`badge_${i}_icon`} name={`badge_${i}_icon`} defaultValue={badges[i]?.icon} className={adminInputClass}>
                    {ICON_NAMES.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Text" htmlFor={`badge_${i}_text`}>
                  <input id={`badge_${i}_text`} name={`badge_${i}_text`} defaultValue={badges[i]?.text} className={adminInputClass} required />
                </FormField>
              </div>
            ))}
          </div>
        </div>

        <ImageUploadField
          name="background_image"
          label="Background Image"
          defaultValue={data.background_image}
          recommendedSize="1920×1280px (3:2 landscape)"
        />

        <SubmitButton label="Save Hero" />
      </form>
    </>
  );
}
