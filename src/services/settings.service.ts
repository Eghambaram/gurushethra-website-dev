import { createPublicClient } from "@/lib/supabase/public";
import { SITE_CONFIG } from "@/constants/site";
import type { SiteSettings } from "@/types/settings";

const FALLBACK: SiteSettings = {
  name: SITE_CONFIG.name,
  shortName: SITE_CONFIG.shortName,
  tagline: SITE_CONFIG.tagline,
  phone: SITE_CONFIG.phone,
  phone2: SITE_CONFIG.phone2,
  whatsapp: SITE_CONFIG.whatsapp,
  email: SITE_CONFIG.email,
  address: SITE_CONFIG.address,
  hours: SITE_CONFIG.hours,
  mapEmbed: SITE_CONFIG.mapEmbed,
  social: { ...SITE_CONFIG.social },
  defaultOgImage: SITE_CONFIG.defaultOgImage,
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("site_settings").select("*").single();
  if (error || !data) return FALLBACK;

  return {
    name: data.name,
    shortName: data.short_name,
    tagline: data.tagline,
    phone: data.phone,
    phone2: data.phone2,
    whatsapp: data.whatsapp,
    email: data.email,
    address: data.address,
    hours: data.hours,
    mapEmbed: data.map_embed,
    social: {
      facebook: data.social_facebook,
      instagram: data.social_instagram,
      youtube: data.social_youtube,
      whatsapp: data.social_whatsapp,
    },
    defaultOgImage: data.default_og_image,
  };
}
