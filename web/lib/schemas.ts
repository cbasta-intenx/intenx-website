import { z } from "zod";

export const ContactSchema = z.object({
  name:           z.string().min(1).max(200),
  company:        z.string().max(200).optional().default(""),
  email:          z.string().email().max(254),
  inquiryType:    z.enum(["Fixture quote", "Platform demo", "Design Qualification", "Connect Existing Fixtures", "Partnership", "Other"]),
  message:        z.string().min(10).max(5000),
  marketingOptIn: z.boolean().default(false),
});

export const FixtureSchema = z.object({
  name:           z.string().min(1).max(200),
  company:        z.string().max(200).optional().default(""),
  email:          z.string().email().max(254),
  fixtureType:    z.enum(["fct", "ict", "programming", "assembly", "multiup", "notsure", ""]),
  description:    z.string().max(2000).optional().default(""),
  complexity:     z.string().max(200).optional().default("none"),
  volume:         z.enum(["<1k", "1k-10k", "10k-50k", "50k+", ""]),
  scope:          z.enum(["ready", "prototype", "concept", ""]),
  timeline:       z.enum(["asap", "1-3mo", "3-6mo", "flexible", ""]),
  estimate:       z.string().max(500),
  marketingOptIn: z.boolean().default(false),
});

export type ContactPayload = z.infer<typeof ContactSchema>;
export type FixturePayload = z.infer<typeof FixtureSchema>;
