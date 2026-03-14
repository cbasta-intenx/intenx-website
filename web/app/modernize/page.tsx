import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect Existing Test Fixtures",
  description:
    "Add remote monitoring, AI diagnostics, and managed support to your existing production test fixtures. No rip-and-replace.",
  alternates: { canonical: "/modernize" },
  openGraph: { title: "Connect Existing Test Fixtures | INTenX FixtureOps", url: "/modernize" },
};

const modernizeSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "FixtureOps Connect",
  provider: { "@type": "Organization", name: "INTenX", url: "https://intenx.io" },
  description:
    "Add remote monitoring, AI diagnostics, and managed support to existing production test fixtures via the FixtureOps Gateway — no rip-and-replace.",
  url: "https://intenx.io/modernize",
};

export default function ModernizePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(modernizeSchema) }}
      />

      <section className="max-w-2xl">
        {/* Hero */}
        <p className="text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: "var(--accent)" }}>
          Modernize Existing Fixtures
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: "var(--foreground)" }}>
          Your fixtures. Connected.
        </h1>
        <p className="text-lg leading-relaxed mb-12" style={{ color: "var(--muted)" }}>
          No rip-and-replace. Add remote monitoring, AI diagnostics, and managed support to what you already have.
        </p>

        {/* Pain */}
        <div className="mb-12 rounded-lg p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <p className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>
            Your fixtures are on the floor. But they&apos;re invisible to operations.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            No yield data. No remote diagnostics. No way to know when something is drifting until a batch fails.
            Every service call is a surprise. Every firmware update is a site visit. And when a fixture goes
            down mid-shift, you find out from the line — not from a dashboard.
          </p>
        </div>

        {/* Solution */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--foreground)" }}>
            Connect the fixtures you have.
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
            The FixtureOps Gateway connects to your existing test hardware. You get a Grafana dashboard with
            FPY and Cpk, an AI diagnostic layer that classifies faults before they become failures, OTA
            firmware delivery, and remote support via audited SSH tunnel. No new fixtures. No production
            interruption. Operational in days.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Real-time yield visibility", body: "FPY, Cpk, and fault frequency on a live Grafana dashboard. Ops sees what engineering sees." },
              { label: "AI fault classification", body: "The LLM diagnostic layer identifies fault patterns and probable causes before they become line stoppages." },
              { label: "OTA firmware delivery", body: "Recipe updates and firmware changes pushed remotely. No site visit, no manual process." },
              { label: "Remote support", body: "Audited SSH tunnel gives INTenX engineers secure access to diagnose and resolve issues without travel." },
            ].map(({ label, body }) => (
              <div key={label} className="rounded-lg p-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <p className="text-xs font-semibold mb-2" style={{ color: "var(--foreground)" }}>{label}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-lg p-6" style={{ background: "var(--surface)", border: "1px solid var(--accent)" }}>
          <p className="font-semibold mb-2" style={{ color: "var(--foreground)" }}>Connect your existing fixtures.</p>
          <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
            Tell us what fixtures you have, your test hardware interface, and your connectivity constraints.
            We&apos;ll scope a gateway integration.
          </p>
          <a href="/contact?inquiry=Connect+Existing+Fixtures" className="btn-primary">
            Connect your fixtures
          </a>
        </div>
      </section>
    </>
  );
}
