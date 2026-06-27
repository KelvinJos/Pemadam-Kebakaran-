export interface NavItem {
  label: string;
  href: string;
  iconName?: string;
}

export interface Rank {
  title: string;
  abbreviation: string;
  payGrade?: string;
  responsibilities: string[];
}

export interface Vehicle {
  name: string;
  code: string;
  description: string;
}

export interface Division {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  accentColor: string;
  ranks: Rank[];
  vehicles: Vehicle[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Training" | "Operation" | "Vehicles" | "Ceremony";
  imageUrl: string;
  description: string;
}

export interface QuickStat {
  value: string;
  label: string;
  description: string;
}

export interface Leader {
  name: string;
  role: string;
  callsign: string;
  description: string;
  avatarUrl: string;
}
