"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = "cole.basta@makanuienterprises.com";
const FROM = "INTenX Website <no-reply@intenx.io>";

// In test/CI environments, skip actual sending to avoid burning Resend quota.
// Set RESEND_API_KEY=test or omit it entirely — emails log to console instead.
function isTestMode() {
  const key = process.env.RESEND_API_KEY ?? "";
  return !key || key.startsWith("test");
}

export interface ContactPayload {
  name: string;
  company: string;
  email: string;
  inquiryType: string;
  message: string;
}

export interface FixturePayload {
  name: string;
  company: string;
  email: string;
  fixtureType: string;
  description: string;
  complexity: string;
  volume: string;
  scope: string;
  timeline: string;
  estimate: string;
}

export async function sendContactEmail(p: ContactPayload): Promise<{ ok: boolean }> {
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
      "",
      p.message,
    ].join("\n"),
  });
  if (error) console.error("sendContactEmail error:", error);
  return { ok: !error };
}

export async function sendFixtureEmail(p: FixturePayload): Promise<{ ok: boolean }> {
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
    ].join("\n"),
  });
  if (error) console.error("sendFixtureEmail error:", error);
  return { ok: !error };
}
