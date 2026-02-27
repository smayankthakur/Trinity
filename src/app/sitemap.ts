import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/rap-90", "/case-results", "/industries", "/about", "/book-diagnostic"];

  return routes.map((route) => ({
    url: `https://sitelytc.com${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}

