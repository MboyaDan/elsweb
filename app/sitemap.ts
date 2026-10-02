import type { MetadataRoute } from "next";
import { absoluteUrl } from "../lib/seo";
import { liveRoutes } from "../lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return liveRoutes.map((path) => ({ url: absoluteUrl(path), priority: path === "/" ? 1 : 0.7 }));
}
