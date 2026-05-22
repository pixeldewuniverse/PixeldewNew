import { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pixeldew.xyz";

  const projectPages = PROJECTS.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/work`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    ...projectPages,
  ];
}
