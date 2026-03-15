import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Qualification Fixtures",
  description:
    "Test fixtures for EVT and DVT hardware qualification. Built on the same stack as your production fixtures — so characterization data becomes your production test limits.",
  alternates: { canonical: "/qualify" },
  openGraph: { title: "Design Qualification Fixtures | INTenX", url: "/qualify" },
};

const qualifySchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "FixtureOps Qualify",
  provider: { "@type": "Organization", name: "INTenX", url: "https://intenx.io" },
  description:
    "Qualification fixtures for EVT and DVT that become your production fixtures — so characterization data sets your production test limits.",
  url: "https://intenx.io/qualify",
};

export default function QualifyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(qualifySchema) }}
      />

      <section className="max-w-2xl">
        {/* Hero */}
        <p className="text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: "var(--accent)" }}>
          Design Qualification
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: "var(--foreground)" }}>
          Test fixtures for design validation.
        </h1>
        <p className="text-lg leading-relaxed mb-12" style={{ color: "var(--muted)" }}>
          Not throwaway bench rigs — qualification infrastructure that becomes your production fixture.
        </p>

        {/* Pain */}
        <div className="mb-12 rounded-lg p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <p className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>
            Engineering qualification is where institutional knowledge goes to die.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Your team builds test rigs for DVT. They work — for engineers, on good days, on the right bench.
            Then the design goes to production and none of it transfers. Production rebuilds from scratch.
            Test limits get guessed. The yield problems you solved in DVT show up again on the line.
          </p>
        </div>

        {/* Solution */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--foreground)" }}>
            Qualification infrastructure that survives the handoff.
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
            FixtureOps Qualify fixtures run on the same stack as your production test system from day one.
            The characterization data you collect during EVT flows directly into your production fixture
            configuration. When you release to manufacturing, we deliver a throughput-optimized derivative —
            not a rebuild. Your test limits are derived from real data. Your production fixture is ready
            before your first unit ships.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "EVT → production continuity", body: "Same fixture stack from first characterization run to volume production. No rebuild at handoff." },
              { label: "Data-derived test limits", body: "Characterization data collected during DVT sets your production pass/fail thresholds — not engineering estimates." },
              { label: "Throughput-optimized derivative", body: "Production fixture is engineered from the qualification fixture. Operator-proof, cycle-time optimized." },
              { label: "Connected from day one", body: "FixtureOps platform visibility during qualification and production — yield data, diagnostics, remote support." },
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
          <p className="font-semibold mb-2" style={{ color: "var(--foreground)" }}>Tell us about your design.</p>
          <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
            Every qualification program is different. Let&apos;s talk through your board, your test requirements,
            and your production timeline.
          </p>
          <a href="/contact?inquiry=qualify" className="btn-primary">
            Talk to us about DVT fixtures
          </a>
        </div>
      </section>
    </>
  );
}
