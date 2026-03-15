"use client";

import { useState, FormEvent } from "react";
import { sendSampleReportEmail } from "../../actions/sendEmail";

export default function SampleReportForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail]         = useState("");
  const [company, setCompany]     = useState("");
  const [status, setStatus]       = useState<"idle" | "submitting" | "sent" | "error">("idle");

  if (status === "sent") {
    return (
      <div className="rounded-lg p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <p className="font-semibold mb-3" style={{ color: "var(--foreground)" }}>
          Check your inbox — the report is on its way to {email}.
        </p>
        <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
          In the meantime, use the estimator on the /modernize page to get a rough ROM range
          for your own fixtures.
        </p>
        <a href="/modernize" style={{ color: "var(--accent)", fontSize: "0.875rem" }}>
          ← Back to /modernize
        </a>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const res = await sendSampleReportEmail({ firstName, email, company });
    setStatus(res.ok ? "sent" : "error");
  }

  return (
    <div className="rounded-lg p-6" style={{ background: "var(--surface)", border: "1px solid var(--accent)" }}>
      <h2 className="text-lg font-semibold mb-6" style={{ color: "var(--foreground)" }}>
        Download the full report
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium" style={{ color: "var(--muted)" }}>First name</label>
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="rounded px-3 py-2 text-sm outline-none"
            style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--foreground)" }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium" style={{ color: "var(--muted)" }}>Work email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded px-3 py-2 text-sm outline-none"
            style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--foreground)" }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium" style={{ color: "var(--muted)" }}>Company</label>
          <input
            type="text"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="rounded px-3 py-2 text-sm outline-none"
            style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--foreground)" }}
          />
        </div>

        {status === "error" && (
          <p className="text-sm" style={{ color: "#f87171" }}>
            Something went wrong. Email us at{" "}
            <a href="mailto:info@intenx.io" style={{ color: "var(--accent)" }}>info@intenx.io</a>.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary self-start"
          style={{ opacity: status === "submitting" ? 0.6 : 1 }}
        >
          {status === "submitting" ? "Sending…" : "Send me the report"}
        </button>
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          No sales call. We&apos;ll email the PDF within a few minutes.
        </p>
      </form>
    </div>
  );
}
