import type { Metadata } from "next";
import ModernizeEstimator from "./ModernizeEstimator";

export const metadata: Metadata = {
  title: "Connect Existing Test Fixtures",
  description:
    "Connect your existing production test fixtures — add yield visibility, remote support, and managed lifecycle without replacing hardware.",
  alternates: { canonical: "/modernize" },
  openGraph: { title: "Connect Existing Test Fixtures | INTenX FixtureOps", url: "/modernize" },
};

const modernizeSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "FixtureOps Connect",
  provider: { "@type": "Organization", name: "INTenX", url: "https://intenx.io" },
  description:
    "Connect existing production test fixtures — yield visibility, remote support, and managed lifecycle without rip-and-replace.",
  url: "https://intenx.io/modernize",
};

const featureTiles = [
  { label: "Real-time yield visibility", body: "FPY, Cpk, and fault frequency on a live dashboard. Ops sees what engineering sees." },
  { label: "Faster fault diagnosis", body: "Pattern recognition that surfaces probable root causes and repair guidance before faults become line stoppages." },
  { label: "OTA firmware delivery", body: "Recipe updates and firmware changes pushed remotely. No site visit, no manual process." },
  { label: "Remote support", body: "Audited SSH tunnel gives INTenX engineers secure access to diagnose and resolve issues without travel." },
];

const archetypes = [
  {
    label: "Read-Only Connectivity",
    body: "Telemetry, dashboards, alerting. No changes to core test logic. Fastest to deploy.",
  },
  {
    label: "Supportability Retrofit",
    body: "Remote support tunnel, structured diagnostics, controlled update paths.",
  },
  {
    label: "Control-Layer Modernization",
    body: "Replace fragile PC/HMI/PLC orchestration while preserving fixture mechanics.",
  },
  {
    label: "Fixture Estate Standardization",
    body: "Bring multiple legacy fixtures onto a common architecture and support model.",
  },
];

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
          Fixtures on the floor. Finally visible.
        </h1>
        <p className="text-lg leading-relaxed mb-12" style={{ color: "var(--muted)" }}>
          Yield data, remote support, and managed lifecycle — without replacing what you have.
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
            The FixtureOps Gateway is designed to connect to your existing test hardware to enable a live dashboard with
            FPY and Cpk, structured fault diagnostics, OTA firmware delivery, and remote support through controlled
            SSH-based access paths, where customer policy permits. FixtureOps engagements are structured to keep
            fixtures supported and updatable after deployment — not stop at the shipping dock.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {featureTiles.map(({ label, body }) => (
              <div key={label} className="rounded-lg p-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <p className="text-xs font-semibold mb-2" style={{ color: "var(--foreground)" }}>{label}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Retrofit archetypes */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--foreground)" }}>
            Four retrofit paths.
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
            Not every modernization is the same. The right scope depends on your fixtures, your constraints,
            and what you need to run reliably.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {archetypes.map(({ label, body }) => (
              <div key={label} className="rounded-lg p-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <p className="text-xs font-semibold mb-2" style={{ color: "var(--foreground)" }}>{label}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Modernize Estimator */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--foreground)" }}>
            Get a rough estimate.
          </h2>
          <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
            Answer seven questions. We&apos;ll give you a ROM range — or tell you when a scoping
            conversation makes more sense.
          </p>
          <ModernizeEstimator />
        </div>

        {/* Sample report CTA */}
        <div className="mt-12 rounded-lg p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <p className="text-sm font-semibold mb-2" style={{ color: "var(--foreground)" }}>
            Want to see what a full Readiness Report looks like?
          </p>
          <a href="/modernize/sample-report" style={{ color: "var(--accent)", fontSize: "0.875rem" }}>
            Download a sample assessment →
          </a>
        </div>
      </section>
    </>
  );
}
