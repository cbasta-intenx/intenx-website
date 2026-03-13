import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://intenx.io",            lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: "https://intenx.io/services",   lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://intenx.io/fixtureops", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://intenx.io/contact",    lastModified: new Date(), changeFrequency: "yearly",  priority: 0.7 },
    { url: "https://intenx.io/about",      lastModified: new Date(), changeFrequency: "yearly",  priority: 0.6 },
    { url: "https://intenx.io/privacy",    lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];
}
