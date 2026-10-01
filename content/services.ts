import { z } from "zod";

export const serviceSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  /** Route for this service. Only rendered once the route is live (see lib/routes.ts). */
  href: z.string().optional(),
});
export type Service = z.infer<typeof serviceSchema>;

export const services: Service[] = z.array(serviceSchema).parse([
  {
    slug: "software-engineering",
    title: "Software engineering",
    summary: "Backend systems, APIs and web applications, built to be maintained.",
  },
  {
    slug: "mobile",
    title: "Mobile",
    summary: "Mobile applications connected to the same systems as your web products.",
  },
  {
    slug: "data-engineering",
    title: "Data engineering",
    summary: "Pipelines and warehouses that turn operational data into reporting you can use.",
  },
  {
    slug: "ai-ml",
    title: "AI and machine learning",
    summary: "LLM-assisted features that answer from your own data and hand over to people.",
  },
  {
    slug: "cloud-devops",
    title: "Cloud and DevOps",
    summary: "Containerised deployments and CI pipelines on Google Cloud.",
  },
  {
    slug: "growth",
    title: "Growth and customer acquisition",
    summary:
      "Generate, capture, qualify and convert digital demand, with the technical infrastructure behind it.",
    href: "/services/growth",
  },
]);
