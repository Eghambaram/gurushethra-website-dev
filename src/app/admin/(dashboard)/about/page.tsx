import Link from "next/link";
import { ArrowUp, ArrowDown, Pencil, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { FormField, adminInputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { SavedNotice } from "@/components/admin/SavedNotice";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { resolveIcon } from "@/lib/icons";
import { updateAboutHero } from "./actions";
import { deleteTimelineItem, moveTimelineItem } from "./timeline/actions";
import { deleteCoreValue, moveCoreValue } from "./values/actions";
import { deleteReason, moveReason } from "./why-choose-us/actions";

interface Props {
  searchParams: Promise<{ saved?: string; error?: string }>;
}

export default async function AdminAboutPage({ searchParams }: Props) {
  const { saved, error } = await searchParams;
  const supabase = await createClient();
  const [{ data }, { data: timelineData }, { data: valuesData }, { data: reasonsData }] = await Promise.all([
    supabase.from("about_hero").select("*").single(),
    supabase.from("timeline_items").select("*").order("order_index"),
    supabase.from("core_values").select("*").order("order_index"),
    supabase.from("why_choose_us_reasons").select("*").order("order_index"),
  ]);
  const timeline = timelineData ?? [];
  const values = valuesData ?? [];
  const reasons = reasonsData ?? [];

  return (
    <div className="flex flex-col gap-12">
      <div>
        <AdminPageHeader title="About Page — Hero" description="The story section at the top of the About page." />
        <SavedNotice show={saved === "1"} />
        <ErrorNotice message={error} />

        <form action={updateAboutHero} className="flex flex-col gap-6 max-w-2xl">
          <input type="hidden" name="id" value={data.id} />

          <FormField label="Eyebrow" htmlFor="eyebrow" hint="e.g. About Us">
            <input id="eyebrow" name="eyebrow" defaultValue={data.eyebrow} className={adminInputClass} required />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="Headline" htmlFor="headline" hint="e.g. Our Journey">
              <input id="headline" name="headline" defaultValue={data.headline} className={adminInputClass} required />
            </FormField>
            <FormField label="Headline Highlight" htmlFor="headline_highlight" hint="Gold second line, optional">
              <input id="headline_highlight" name="headline_highlight" defaultValue={data.headline_highlight ?? ""} className={adminInputClass} />
            </FormField>
          </div>

          <FormField label="Body" htmlFor="body">
            <textarea id="body" name="body" defaultValue={data.body} rows={4} className={adminInputClass} required />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="CTA Label" htmlFor="cta_label">
              <input id="cta_label" name="cta_label" defaultValue={data.cta_label} className={adminInputClass} required />
            </FormField>
            <FormField label="CTA Link" htmlFor="cta_href">
              <input id="cta_href" name="cta_href" defaultValue={data.cta_href} className={adminInputClass} required />
            </FormField>
          </div>

          <ImageUploadField name="image" label="Photo" defaultValue={data.image} recommendedSize="1200×1600px (3:4 portrait)" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="Badge Label" htmlFor="badge_label" hint="e.g. EST.">
              <input id="badge_label" name="badge_label" defaultValue={data.badge_label} className={adminInputClass} required />
            </FormField>
            <FormField label="Badge Value" htmlFor="badge_value" hint="e.g. 1998">
              <input id="badge_value" name="badge_value" defaultValue={data.badge_value} className={adminInputClass} required />
            </FormField>
          </div>

          <SubmitButton label="Save About Hero" />
        </form>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <AdminPageHeader title="Timeline" description="Milestones shown on the About page." />
          <Link
            href="/admin/about/timeline/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-gold text-brand-background font-bold text-xs tracking-widest uppercase rounded hover:bg-[#C9A227] transition-colors"
          >
            <Plus size={14} /> Add Milestone
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {timeline.map((item, i) => (
            <div key={item.id} className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-brand-surface border border-white/8">
              <div className="flex items-center gap-3 min-w-0 flex-1 basis-[220px]">
                <div className="flex flex-col gap-1">
                  <form action={moveTimelineItem}>
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="direction" value="up" />
                    <button type="submit" disabled={i === 0} className="p-1 text-gray-400 hover:text-brand-gold disabled:opacity-30 disabled:cursor-not-allowed">
                      <ArrowUp size={14} />
                    </button>
                  </form>
                  <form action={moveTimelineItem}>
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="direction" value="down" />
                    <button type="submit" disabled={i === timeline.length - 1} className="p-1 text-gray-400 hover:text-brand-gold disabled:opacity-30 disabled:cursor-not-allowed">
                      <ArrowDown size={14} />
                    </button>
                  </form>
                </div>
                <span className="text-brand-gold font-bold text-sm w-14 shrink-0">{item.year}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{item.title}</p>
                  <p className="text-gray-500 text-xs truncate">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-auto">
                <Link href={`/admin/about/timeline/${item.id}/edit`} className="p-2 text-gray-400 hover:text-brand-gold transition-colors" aria-label="Edit">
                  <Pencil size={16} />
                </Link>
                <DeleteButton action={deleteTimelineItem.bind(null, item.id)} confirmMessage={`Delete "${item.title}"? This cannot be undone.`} />
              </div>
            </div>
          ))}
          {timeline.length === 0 && <p className="text-gray-500 text-sm py-8 text-center">No milestones yet.</p>}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <AdminPageHeader title="Core Values" description="The values grid on the About page." />
          <Link
            href="/admin/about/values/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-gold text-brand-background font-bold text-xs tracking-widest uppercase rounded hover:bg-[#C9A227] transition-colors"
          >
            <Plus size={14} /> Add Value
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {values.map((value, i) => {
            const Icon = resolveIcon(value.icon);
            return (
              <div key={value.id} className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-brand-surface border border-white/8">
                <div className="flex items-center gap-3 min-w-0 flex-1 basis-[220px]">
                  <div className="flex flex-col gap-1">
                    <form action={moveCoreValue}>
                      <input type="hidden" name="id" value={value.id} />
                      <input type="hidden" name="direction" value="up" />
                      <button type="submit" disabled={i === 0} className="p-1 text-gray-400 hover:text-brand-gold disabled:opacity-30 disabled:cursor-not-allowed">
                        <ArrowUp size={14} />
                      </button>
                    </form>
                    <form action={moveCoreValue}>
                      <input type="hidden" name="id" value={value.id} />
                      <input type="hidden" name="direction" value="down" />
                      <button type="submit" disabled={i === values.length - 1} className="p-1 text-gray-400 hover:text-brand-gold disabled:opacity-30 disabled:cursor-not-allowed">
                        <ArrowDown size={14} />
                      </button>
                    </form>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-brand-gold" aria-hidden />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{value.title}</p>
                    <p className="text-gray-500 text-xs truncate">{value.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-auto">
                  <Link href={`/admin/about/values/${value.id}/edit`} className="p-2 text-gray-400 hover:text-brand-gold transition-colors" aria-label="Edit">
                    <Pencil size={16} />
                  </Link>
                  <DeleteButton action={deleteCoreValue.bind(null, value.id)} confirmMessage={`Delete "${value.title}"? This cannot be undone.`} />
                </div>
              </div>
            );
          })}
          {values.length === 0 && <p className="text-gray-500 text-sm py-8 text-center">No values yet.</p>}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <AdminPageHeader title="Why Choose Us" description="The reasons grid shown on the homepage." />
          <Link
            href="/admin/about/why-choose-us/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-gold text-brand-background font-bold text-xs tracking-widest uppercase rounded hover:bg-[#C9A227] transition-colors"
          >
            <Plus size={14} /> Add Reason
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {reasons.map((reason, i) => {
            const Icon = resolveIcon(reason.icon);
            return (
              <div key={reason.id} className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-brand-surface border border-white/8">
                <div className="flex items-center gap-3 min-w-0 flex-1 basis-[220px]">
                  <div className="flex flex-col gap-1">
                    <form action={moveReason}>
                      <input type="hidden" name="id" value={reason.id} />
                      <input type="hidden" name="direction" value="up" />
                      <button type="submit" disabled={i === 0} className="p-1 text-gray-400 hover:text-brand-gold disabled:opacity-30 disabled:cursor-not-allowed">
                        <ArrowUp size={14} />
                      </button>
                    </form>
                    <form action={moveReason}>
                      <input type="hidden" name="id" value={reason.id} />
                      <input type="hidden" name="direction" value="down" />
                      <button type="submit" disabled={i === reasons.length - 1} className="p-1 text-gray-400 hover:text-brand-gold disabled:opacity-30 disabled:cursor-not-allowed">
                        <ArrowDown size={14} />
                      </button>
                    </form>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-brand-gold" aria-hidden />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{reason.title}</p>
                    <p className="text-gray-500 text-xs truncate">{reason.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-auto">
                  <Link href={`/admin/about/why-choose-us/${reason.id}/edit`} className="p-2 text-gray-400 hover:text-brand-gold transition-colors" aria-label="Edit">
                    <Pencil size={16} />
                  </Link>
                  <DeleteButton action={deleteReason.bind(null, reason.id)} confirmMessage={`Delete "${reason.title}"? This cannot be undone.`} />
                </div>
              </div>
            );
          })}
          {reasons.length === 0 && <p className="text-gray-500 text-sm py-8 text-center">No reasons yet.</p>}
        </div>
      </div>
    </div>
  );
}
