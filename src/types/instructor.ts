export interface InstructorStat {
  value: number;
  suffix: string;
  label: string;
}

export interface Instructor {
  name: string;
  title: string;
  dan: string;
  style: string;
  shortBio: string;
  bio: string;
  bioExtended: string;
  image: string;
  stats: InstructorStat[];
  qualifications: string[];
  achievements: string[];
}
