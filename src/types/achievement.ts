export interface AchievementStat {
  value: number;
  suffix: string;
  label: string;
}

export interface MedalCount {
  gold: number;
  silver: number;
  bronze: number;
}

export interface RecentAchievement {
  id: string;
  year: string;
  title: string;
  result: string;
  medals: MedalCount;
  description: string;
  image: string;
}

export interface Achievements {
  stats: AchievementStat[];
  recent: RecentAchievement[];
}
