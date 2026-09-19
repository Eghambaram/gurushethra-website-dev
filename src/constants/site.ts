export const SITE_CONFIG = {
  name: "Gurushethra Institute of Martial Arts",
  shortName: "GIMA",
  tagline: "Building Discipline • Confidence • Character",
  baseUrl: "https://gurushethra.com",
  phone: "+91 63821 10788",
  phone2: "+91 63821 10788",
  whatsapp: "916382110788",
  email: "gurushethra1991@gmail.com",
  address: "Sai Dojo, Station Road, Radha Nagar, Chromepet, Chennai – 600044",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5!2d80.1411!3d12.9516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU3JzA1LjgiTiA4MMKwMDgnMjguMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  hours: "Classes held Mon – Sun (timings vary by centre)",
  defaultOgImage: "/images/og-default.jpg",
  social: {
    facebook: "https://www.facebook.com/107644411375904/",
    instagram: "https://www.instagram.com/gimakarate",
    youtube: "https://youtube.com/@gurushethrainstituteofmart7619",
    whatsapp: "https://wa.me/916382110788",
  },
} as const;

export const HONORIFICS: string[] = ["aasan", "sensei", "shihan", "senpai", "renshi"];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Instructor", href: "/instructor" },
  { label: "Team", href: "/team" },
  { label: "Gallery", href: "/gallery" },
  { label: "Events", href: "/events" },
  { label: "Achievements", href: "/achievements" },
  { label: "Branches", href: "/branches" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;
