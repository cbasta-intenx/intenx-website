"use server";

import { Resend } from "resend";
import { ContactSchema, FixtureSchema, SampleReportSchema } from "../../lib/schemas";
import { upsertContact } from "../../lib/hubspot";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = "cole.basta@makanuienterprises.com";
const FROM = "INTenX Website <no-reply@updates.intenx.io>";

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

  upsertContact({
    email: p.email, name: p.name, company: p.company || undefined,
    marketingOptIn: p.marketingOptIn,
    pageUri: "https://intenx.io/contact", pageName: "Contact",
  });
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

  upsertContact({
    email: p.email, name: p.name, company: p.company || undefined,
    marketingOptIn: p.marketingOptIn,
    pageUri: "https://intenx.io/fixtureops", pageName: "Fixture Configurator",
  });
  return { ok: true };
}

export async function sendSampleReportEmail(raw: unknown): Promise<{ ok: boolean; error?: string }> {
  const parsed = SampleReportSchema.safeParse(raw);
  if (!parsed.success) {
    console.warn("sendSampleReportEmail: invalid payload", parsed.error.flatten());
    return { ok: false, error: "invalid_input" };
  }
  const p = parsed.data;

  if (isTestMode()) {
    console.log("[sendSampleReportEmail] TEST MODE — skipping Resend:", p);
    return { ok: true };
  }

  const reportUrl = "https://intenx.io/modernize/sample-report/full";

  // Email to visitor with report link
  const { error: visitorError } = await resend.emails.send({
    from: FROM,
    to: p.email,
    subject: "Your sample Modernization Readiness Report",
    text: [
      `Hi ${p.firstName},`,
      "",
      "Here's your sample Modernization Readiness Report:",
      reportUrl,
      "",
      "It's a real workup for a composite five-fixture electronics OEM — three stations, three retrofit paths, and a phased investment summary.",
      "",
      "If you want a ROM range for your own fixtures, the estimator on /modernize can get you there in about two minutes:",
      "https://intenx.io/modernize",
      "",
      "— INTenX",
    ].join("\n"),
  });

  if (visitorError) {
    console.error("sendSampleReportEmail visitor error:", visitorError);
    return { ok: false };
  }

  // Internal lead notification
  resend.emails.send({
    from: FROM,
    to: TO,
    subject: `[intenx.io] Sample report download — ${p.firstName} (${p.company})`,
    text: [
      `First name: ${p.firstName}`,
      `Company: ${p.company}`,
      `Email: ${p.email}`,
      "",
      "Downloaded: Sample Modernization Readiness Report",
      `Page: ${reportUrl}`,
    ].join("\n"),
  }).catch((err) => console.error("sendSampleReportEmail internal notify error:", err));

  upsertContact({
    email: p.email, name: p.firstName, company: p.company,
    marketingOptIn: false,
    pageUri: "https://intenx.io/modernize/sample-report", pageName: "Sample Report Gate",
  });
  return { ok: true };
}
