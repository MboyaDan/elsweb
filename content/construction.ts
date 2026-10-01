import { z } from "zod";
import { faqSchema } from "./growth.config";

const section = z.object({ title: z.string(), items: z.array(z.string()).min(1) });

export const construction = z
  .object({
    audience: z.string(),
    discovery: z.string(),
    setup: section,
    questions: z.array(z.string()).length(5),
    measures: section,
    clientProvides: section,
    faq: faqSchema,
  })
  .parse({
    audience:
      "Small and mid-sized contractors, builders and developers who win work through enquiries and want those enquiries to be easier to receive, sort and follow up.",
    discovery:
      "In general, someone planning a build searches on Google or Google Maps, looks at a contractor's past projects, and sends a message on WhatsApp to ask about a quote. Referrals often get checked online before anyone calls. The contractor who shows up clearly, and replies promptly with the right questions, is easier to hire.",
    setup: {
      title: "What ELS sets up",
      items: [
        "A Google Business Profile that describes your services and areas accurately",
        "Service, location and project pages that match what people search for",
        "A WhatsApp click-to-chat path that records where each enquiry came from",
        "A quote request form for people who prefer to write it out",
        "A qualification flow, so serious enquiries are sorted from casual ones",
        "Response-time alerts and follow-up reminders for your team",
        "Tracking in GA4 and Search Console, and a simple report",
      ],
    },
    questions: [
      "What are you building?",
      "Where is the plot?",
      "Is it ready to build, and do you have drawings?",
      "What is your budget band?",
      "When do you want to start?",
    ],
    measures: {
      title: "What ELS measures",
      items: [
        "Which source each enquiry came from: search, Maps, ads, referral or WhatsApp",
        "How many enquiries pass qualification",
        "How quickly each enquiry gets a first reply",
        "Which qualified enquiries became quotes",
      ],
    },
    clientProvides: {
      title: "What you provide",
      items: [
        "Access to your Google Business Profile and website, or permission to set them up",
        "Photos and short descriptions of completed projects you are allowed to show",
        "A WhatsApp number your team will actually answer",
        "Your service areas and the kinds of jobs you want",
        "Someone who can answer enquiries and update quote status",
      ],
    },
    faq: [
      {
        q: "Do you promise more clients?",
        a: "No. We cannot promise outcomes. We make your enquiries easier to find and handle, and we measure what happens.",
      },
      {
        q: "Do I need to be on WhatsApp?",
        a: "The qualification flow is built around WhatsApp, because a customer can message you in one tap from a search result or an ad. A form is available for people who prefer it.",
      },
      {
        q: "Can I use the project photos I already have?",
        a: "Yes, if you have the right to show them. We help you turn them into project pages.",
      },
      {
        q: "Is this only for large contractors?",
        a: "No. It is written for small and mid-sized contractors, builders and developers.",
      },
    ],
  });
