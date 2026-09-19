export type BranchType = "headquarters" | "branch";

export interface Branch {
  id: string;
  slug: string;
  name: string;
  type: BranchType;
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapEmbed: string;
  features: string[];
  featured: boolean;
}
