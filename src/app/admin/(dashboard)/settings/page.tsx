import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { FormField, adminInputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { SavedNotice } from "@/components/admin/SavedNotice";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { updateSiteSettings } from "./actions";

interface Props {
  searchParams: Promise<{ saved?: string; error?: string }>;
}

export default async function AdminSettingsPage({ searchParams }: Props) {
  const { saved, error } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").single();

  return (
    <>
      <AdminPageHeader title="Site Settings" description="Contact info, social links, and global site details." />
      <SavedNotice show={saved === "1"} />
      <ErrorNotice message={error} />

      <form action={updateSiteSettings} className="flex flex-col gap-6 max-w-2xl">
        <input type="hidden" name="id" value={data.id} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField label="Organization Name" htmlFor="name">
            <input id="name" name="name" defaultValue={data.name} className={adminInputClass} required />
          </FormField>
          <FormField label="Short Name" htmlFor="short_name">
            <input id="short_name" name="short_name" defaultValue={data.short_name} className={adminInputClass} required />
          </FormField>
        </div>

        <FormField label="Tagline" htmlFor="tagline">
          <input id="tagline" name="tagline" defaultValue={data.tagline} className={adminInputClass} required />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField label="Phone" htmlFor="phone">
            <input id="phone" name="phone" defaultValue={data.phone} className={adminInputClass} required />
          </FormField>
          <FormField label="Secondary Phone" htmlFor="phone2" hint="Optional">
            <input id="phone2" name="phone2" defaultValue={data.phone2 ?? ""} className={adminInputClass} />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField label="WhatsApp Number" htmlFor="whatsapp" hint="Digits with country code, no +">
            <input id="whatsapp" name="whatsapp" defaultValue={data.whatsapp} className={adminInputClass} required />
          </FormField>
          <FormField label="Email" htmlFor="email">
            <input id="email" name="email" type="email" defaultValue={data.email} className={adminInputClass} required />
          </FormField>
        </div>

        <FormField label="Address" htmlFor="address">
          <textarea id="address" name="address" defaultValue={data.address} rows={2} className={adminInputClass} required />
        </FormField>

        <FormField label="Hours" htmlFor="hours">
          <input id="hours" name="hours" defaultValue={data.hours} className={adminInputClass} required />
        </FormField>

        <FormField label="Google Maps Embed URL" htmlFor="map_embed">
          <textarea id="map_embed" name="map_embed" defaultValue={data.map_embed} rows={3} className={`${adminInputClass} text-xs`} required />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField label="Facebook URL" htmlFor="social_facebook" hint="Optional">
            <input id="social_facebook" name="social_facebook" defaultValue={data.social_facebook ?? ""} className={adminInputClass} />
          </FormField>
          <FormField label="Instagram URL" htmlFor="social_instagram" hint="Optional">
            <input id="social_instagram" name="social_instagram" defaultValue={data.social_instagram ?? ""} className={adminInputClass} />
          </FormField>
          <FormField label="YouTube URL" htmlFor="social_youtube" hint="Optional">
            <input id="social_youtube" name="social_youtube" defaultValue={data.social_youtube ?? ""} className={adminInputClass} />
          </FormField>
          <FormField label="WhatsApp Link" htmlFor="social_whatsapp" hint="Optional — wa.me link">
            <input id="social_whatsapp" name="social_whatsapp" defaultValue={data.social_whatsapp ?? ""} className={adminInputClass} />
          </FormField>
        </div>

        <ImageUploadField
          name="default_og_image"
          label="Default Social Share Image"
          defaultValue={data.default_og_image ?? undefined}
          recommendedSize="1200×630px (1.91:1, standard Open Graph size)"
        />

        <SubmitButton label="Save Settings" />
      </form>
    </>
  );
}
