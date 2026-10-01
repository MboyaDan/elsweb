import { z } from "zod";

const packageSchema = z.object({
  id: z.string(),
  name: z.string(),
  summary: z.string(),
  includes: z.array(z.string()).min(1),
});
const layerSchema = z.object({
  id: z.string(),
  name: z.string(),
  tasks: z.array(z.string()).min(1),
});

// No prices, results, guarantees or outcome statistics. By design.
export const growthPositioning =
  "ELS helps businesses generate, capture, qualify and convert digital demand, and builds the technical infrastructure behind it.";

export const growthPackages = z.array(packageSchema).parse([
  {
    id: "growth-audit",
    name: "Growth Audit",
    summary:
      "A short review of how a business shows up when customers search, with the top fixes and how long each takes.",
    includes: ["Review of search presence", "Prioritised fixes", "Time estimate for each fix"],
  },
  {
    id: "foundation-sprint",
    name: "Foundation Sprint",
    summary: "A 30-day project that sets up the basics.",
    includes: [
      "Google Business Profile",
      "Service or landing pages",
      "A WhatsApp path",
      "Tracking",
      "A day-30 report",
    ],
  },
  {
    id: "lead-engine",
    name: "Lead Engine",
    summary: "Monthly work on top of the foundation.",
    includes: ["Paid search", "Local SEO", "Content", "A monthly enquiry report"],
  },
  {
    id: "growth-system",
    name: "Growth System",
    summary: "Adds qualification, alerts and follow-up around every enquiry.",
    includes: [
      "WhatsApp qualification",
      "Response-time alerts",
      "Follow-up sequences",
      "A CRM record",
      "Attribution",
    ],
  },
  {
    id: "custom-build",
    name: "Custom build",
    summary: "Software around the funnel, scoped per project.",
    includes: ["Scoped per project"],
  },
]);

export const growthLayers = z.array(layerSchema).parse([
  {
    id: "get-found",
    name: "Get Found",
    tasks: [
      "Google Business Profile",
      "Local SEO",
      "Service and location pages",
      "Project pages",
      "Review routine",
      "Technical SEO fixes",
    ],
  },
  {
    id: "generate-demand",
    name: "Generate Demand",
    tasks: ["Google Search ads", "Meta ads that open WhatsApp", "Content", "LinkedIn for B2B"],
  },
  {
    id: "capture-leads",
    name: "Capture Leads",
    tasks: [
      "Landing pages",
      "WhatsApp click-to-chat with source tracking",
      "Quote or booking forms",
      "Call tracking",
      "Missed-call capture",
    ],
  },
  {
    id: "convert",
    name: "Convert",
    tasks: [
      "WhatsApp qualification questions",
      "Lead scoring and routing",
      "Response-time alerts",
      "Follow-up sequences",
      "Quote tracking",
    ],
  },
  {
    id: "measure",
    name: "Measure",
    tasks: [
      "GA4",
      "Tag Manager",
      "Search Console",
      "Dashboards",
      "Lead source to qualified lead to quote",
    ],
  },
  {
    id: "automate",
    name: "Automate",
    tasks: [
      "AI-assisted answers with handover to a person",
      "Notifications",
      "Weekly summaries",
      "Review requests",
    ],
  },
]);

export const funnelSteps = [
  "Google / Meta / SEO",
  "Landing page",
  "WhatsApp / form",
  "Qualification",
  "CRM / API",
  "Follow-up",
  "Booking / quote",
  "Dashboard",
] as const;

export const faqSchema = z.array(z.object({ q: z.string(), a: z.string() }));

export const growthFaq = faqSchema.parse([
  {
    q: "Do you guarantee results?",
    a: "No. We do not promise outcomes. We set the work up, measure it, and report what the numbers show.",
  },
  {
    q: "What does the Growth Audit cover?",
    a: "A short review of how your business shows up when customers search, with the top fixes and how long each one takes.",
  },
  {
    q: "How long is the Foundation Sprint?",
    a: "It is a 30-day project. It covers your Google Business Profile, service or landing pages, a WhatsApp path, tracking, and a report on day 30.",
  },
  {
    q: "Do I need a new website?",
    a: "Not necessarily. The audit looks at what you have first. Some businesses need new service pages, others need fixes to what exists.",
  },
  {
    q: "Does AI answer my customers?",
    a: "Where it makes sense, AI can draft answers to common questions, and every conversation can be handed to a person. You decide how much it does.",
  },
  {
    q: "Where are you based?",
    a: "We are based in Nairobi and deliver to clients in Kenya and internationally, working remotely.",
  },
]);
