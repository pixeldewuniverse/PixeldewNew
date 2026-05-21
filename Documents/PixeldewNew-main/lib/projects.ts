export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
  glow: string;
  url?: string;
  featured: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "kadobajo",
    title: "Kadobajo.id",
    subtitle: "CRM Platform",
    description: "Sistem CRM untuk manajemen relasi pelanggan, pipeline penjualan, dan analitik bisnis secara real-time.",
    tags: ["UI/UX", "Frontend", "CRM", "Dashboard"],
    color: "#2CFF8F",
    glow: "rgba(44,255,143,0.12)",
    url: "https://kadobajo.id",
    featured: true,
  },
  {
    id: "gripiz-kuta",
    title: "The Gripiz Kuta",
    subtitle: "Restaurant Website",
    description: "Website restoran modern dengan menu interaktif, reservasi online, dan visual storytelling yang kuat.",
    tags: ["Web Design", "Branding", "Motion", "Restaurant"],
    color: "#FF3BD4",
    glow: "rgba(255,59,212,0.12)",
    url: "#",
    featured: true,
  },
];

export const FEATURED = PROJECTS.filter((p) => p.featured);
