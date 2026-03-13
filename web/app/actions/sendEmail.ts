"use server";

import { Resend } from "resend";
import { ContactSchema, FixtureSchema } from "../../lib/schemas";
import { upsertContact } from "../../lib/hubspot";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = "cole.basta@makanuienterprises.com";
const FROM = "INTenX Website <no-reply@intenx.io>";

function isTestMode() {
  const key = process.env.RESEND_API_KEY ?? "";
  return !key || key.startsWith("test");
}

export async function sendContactEmail(raw: unknown): Promise<{ ok: boolean; error?: string }> {
  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    console.warn("sendContactEmail: invalid payload", parsed.error.flatten());
    return { ok: false, error: "invalid_input" };
  }
  const p = parsed.data;

  if (isTestMode()) {
    console.log("[sendContactEmail] TEST MODE — skipping Resend:", p);
    return { ok: true };
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: p.email,
    subject: `[intenx.io] ${p.inquiryType} inquiry — ${p.name}${p.company ? ` (${p.company})` : ""}`,
    text: [
      `Name: ${p.name}`,
      `Company: ${p.company || "—"}`,
      `Email: ${p.email}`,
      `Inquiry type: ${p.inquiryType}`,
      `Marketing opt-in: ${p.marketingOptIn ? "Yes" : "No"}`,
      "",
      p.message,
    ].join("\n"),
  });

  if (error) {
    console.error("sendContactEmail error:", error);
    return { ok: false };
  }

  upsertContact({ email: p.email, name: p.name, company: p.company || undefined });
  return { ok: true };
}

export async function sendFixtureEmail(raw: unknown): Promise<{ ok: boolean; error?: string }> {
  const parsed = FixtureSchema.safeParse(raw);
  if (!parsed.success) {
    console.warn("sendFixtureEmail: invalid payload", parsed.error.flatten());
    return { ok: false, error: "invalid_input" };
  }
  const p = parsed.data;

  if (isTestMode()) {
    console.log("[sendFixtureEmail] TEST MODE — skipping Resend:", p);
    return { ok: true };
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: p.email,
    subject: `[intenx.io] Fixture estimate request — ${p.name}${p.company ? ` (${p.company})` : ""}`,
    text: [
      `Name: ${p.name}`,
      `Company: ${p.company || "—"}`,
      `Email: ${p.email}`,
      "",
      `Fixture type: ${p.fixtureType}`,
      `Description: ${p.description || "—"}`,
      `Complexity factors: ${p.complexity}`,
      `Volume: ${p.volume}`,
      `Scope confidence: ${p.scope}`,
      `Timeline: ${p.timeline}`,
      "",
      `Estimate shown: ${p.estimate}`,
      `Marketing opt-in: ${p.marketingOptIn ? "Yes" : "No"}`,
    ].join("\n"),
  });

  if (error) {
    console.error("sendFixtureEmail error:", error);
    return { ok: false };
  }

  upsertContact({ email: p.email, name: p.name, company: p.company || undefined });
  return { ok: true };
}
