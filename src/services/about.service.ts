import { createPublicClient } from "@/lib/supabase/public";
import type { AboutHero } from "@/types/about";

const FALLBACK: AboutHero = {
  eyebrow: "About Us",
  headline: "Our Journey",
  headlineHighlight: "Since 1998",
  body: "Gurushethra Institute of Martial Arts was born from a single conviction — that the ancient art of Okinawan Goju-Ryu karate could transform ordinary lives. What began as a single dojo in Chennai has grown into Tamil Nadu's most respected martial arts academy, with four centres, hundreds of active students, and a proven record of developing champions at every level.",
  ctaLabel: "Discover More",
  ctaHref: "/contact",
  image:
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgsjX9gfwx2THzuT-sOlyfOCViG0mxwWfv5_jWyHejwwh6akPl93WpB20wTIX8Az_ulFC6gpLuOtwegTZjV3-At3-JV5LyxTkmEFC5RGV5VGyBUxI-0OhXuTO_T4wQJxDUhwerEYe6s59KAO613Jbt45Me639ShS37wvatCOCf8kmWxA9-uBAHx5LJHfrI/s4032/IMG_1357.jpeg",
  badgeLabel: "EST.",
  badgeValue: "1998",
};

export async function getAboutHero(): Promise<AboutHero> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("about_hero").select("*").single();
  if (error || !data) return FALLBACK;

  return {
    eyebrow: data.eyebrow,
    headline: data.headline,
    headlineHighlight: data.headline_highlight,
    body: data.body,
    ctaLabel: data.cta_label,
    ctaHref: data.cta_href,
    image: data.image,
    badgeLabel: data.badge_label,
    badgeValue: data.badge_value,
  };
}
