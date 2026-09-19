import {
  ShieldCheck,
  Trophy,
  Users,
  Sword,
  Clock,
  MapPin,
  Star,
  Target,
  Dumbbell,
  HandHeart,
  type LucideIcon,
} from "lucide-react";

// The small curated set of icons admin-editable content is allowed to pick
// from — keeps every icon name typed into the CMS guaranteed to render.
export const ICON_MAP: Record<string, LucideIcon> = {
  ShieldCheck,
  Trophy,
  Users,
  Sword,
  Clock,
  MapPin,
  Star,
  Target,
  Dumbbell,
  HandHeart,
};

export const ICON_NAMES = Object.keys(ICON_MAP);

export function resolveIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Star;
}
