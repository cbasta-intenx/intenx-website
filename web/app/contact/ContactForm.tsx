"use client";

import { useState, FormEvent } from "react";
import { sendContactEmail } from "../actions/sendEmail";

const inquiryTypes = ["Fixture quote", "Platform demo", "Partnership", "Other"];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const fd = new FormData(e.currentTarget);

    const result = await sendContactEmail({
      name: fd.get("name") as string,
      company: fd.get("company") as string,
      email: fd.get("email") as string,
      inquiryType: fd.get("inquiry_type") as string,
      message: fd.get("message") as string,
    });

    if (result.ok) {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <p className="font-semibold mb-2" style={{ color: "var(--foreground)" }}>Message received.</p>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          We respond within 1 business day. You can also reach us directly at{" "}
          <a href="mailto:info@intenx.io" style={{ color: "var(--accent)" }}>info@intenx.io</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium" style={{ color: "var(--muted)" }}>Name</label>
          <input name="name" type="text" required
            className="rounded px-3 py-2 text-sm outline-none"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--foreground)" }} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium" style={{ color: "var(--muted)" }}>Company</label>
          <input name="company" type="text"
            className="rounded px-3 py-2 text-sm outline-none"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--foreground)" }} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium" style={{ color: "var(--muted)" }}>Email</label>
        <input name="email" type="email" required
          className="rounded px-3 py-2 text-sm outline-none"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--foreground)" }} />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium" style={{ color: "var(--muted)" }}>Inquiry type</label>
        <select name="inquiry_type"
          className="rounded px-3 py-2 text-sm outline-none"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--foreground)" }}>
          {inquiryTypes.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium" style={{ color: "var(--muted)" }}>Message</label>
        <textarea name="message" required rows={5}
          className="rounded px-3 py-2 text-sm outline-none resize-none"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--foreground)" }} />
      </div>

      {status === "error" && (
        <p className="text-sm" style={{ color: "#f87171" }}>
          Something went wrong. Email us directly at{" "}
          <a href="mailto:info@intenx.io" style={{ color: "var(--accent)" }}>info@intenx.io</a>.
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn-primary self-start"
        style={{ opacity: status === "submitting" ? 0.6 : 1, cursor: status === "submitting" ? "not-allowed" : "pointer" }}>
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
