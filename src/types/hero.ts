export interface HeroStat {
  value: number;
  suffix: string;
  label: string;
}

export interface HeroCTA {
  label: string;
  href: string;
}

export interface HeroTrustBadge {
  icon: string;
  text: string;
}

export interface Hero {
  headlineLines: string[];
  subCopy: string;
  ctaPrimary: HeroCTA;
  ctaSecondary: HeroCTA;
  stats: HeroStat[];
  trustBadges: HeroTrustBadge[];
  backgroundImage: string;
}
