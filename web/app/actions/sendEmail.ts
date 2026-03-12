"use server";

import nodemailer from "nodemailer";

const TO = "cole.basta@makanuienterprises.com";

function transporter() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
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
  try {
    await transporter().sendMail({
      from: `"INTenX Website" <${process.env.GMAIL_USER}>`,
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
    return { ok: true };
  } catch (err) {
    console.error("sendContactEmail error:", err);
    return { ok: false };
  }
}

export async function sendFixtureEmail(p: FixturePayload): Promise<{ ok: boolean }> {
  try {
    await transporter().sendMail({
      from: `"INTenX Website" <${process.env.GMAIL_USER}>`,
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
        `Complexity factors: ${p.complexity || "none"}`,
        `Volume: ${p.volume}`,
        `Scope confidence: ${p.scope}`,
        `Timeline: ${p.timeline}`,
        "",
        `Estimate shown: ${p.estimate}`,
      ].join("\n"),
    });
    return { ok: true };
  } catch (err) {
    console.error("sendFixtureEmail error:", err);
    return { ok: false };
  }
}
