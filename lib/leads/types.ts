import type { Attribution } from "../validation";

export type Lead = {
  id: string;
  receivedAt: string;
  type: "contact" | "audit";
  /** Name to greet the submitter with. */
  name: string;
  email: string;
  data: Record<string, string | boolean>;
  attribution: Attribution;
};

export interface LeadSink {
  name: string;
  enabled(): boolean;
  send(lead: Lead): Promise<void>;
}
