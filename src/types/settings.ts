export interface SiteSettings {
  name: string;
  shortName: string;
  tagline: string;
  phone: string;
  phone2: string | null;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  mapEmbed: string;
  social: {
    facebook: string | null;
    instagram: string | null;
    youtube: string | null;
    whatsapp: string | null;
  };
  defaultOgImage: string | null;
}
