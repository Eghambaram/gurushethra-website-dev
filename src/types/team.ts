export type TeamCategoryId =
  | "leadership"
  | "technical"
  | "administration"
  | "advisory"
  | "coaches";

export interface TeamMemberCredential {
  label: string;
  value: string;
}

export interface TeamMemberStat {
  value: number;
  suffix: string;
  label: string;
}

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  title: string;
  category: TeamCategoryId;
  rank: string;
  bio?: string;
  credentials: TeamMemberCredential[];
  achievements: string[];
  image: string;
  featured?: boolean;
  stats?: TeamMemberStat[];
}

export interface TeamCategory {
  id: TeamCategoryId;
  name: string;
  members: TeamMember[];
}
