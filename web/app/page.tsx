const pillars = [
  {
    label: "Fixed-price fixtures",
    body: "Functional testers, bed-of-nails, programming jigs, and assembly testers — scoped, priced, and delivered. No hourly surprises.",
  },
  {
    label: "Connected platform",
    body: "Every fixture ships connected. Real-time yield data, AI-assisted diagnostics, and remote visibility through the FixtureOps platform.",
  },
  {
    label: "Managed lifecycle",
    body: "Test Fixtures as a Service (TFaaS) — INTenX owns the fixture hardware, you pay per test. Maintenance, updates, and support included.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="pb-20 pt-4">
        <p className="text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: "var(--accent)" }}>
          Production Test Infrastructure
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: "var(--foreground)" }}>
          Managed Production Test.<br />
          Built for Hardware Companies.
        </h1>
        <p className="text-lg leading-relaxed mb-10 max-w-2xl" style={{ color: "var(--muted)" }}>
          INTenX designs, builds, and manages production test fixtures — connected to a platform
          that gives your team real-time yield data, AI-assisted diagnostics, and remote support.
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <a href="/fixtureops" className="btn-primary">Get a Fixture Estimate</a>
          <a href="/contact"
             className="text-sm font-medium transition-colors hover:text-white"
             style={{ color: "var(--muted)" }}>
            Talk to us →
          </a>
        </div>
      </section>

      {/* Pillars */}
      <section style={{ borderTop: "1px solid var(--border)" }} className="pt-16">
        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.label}>
              <p className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>{p.label}</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
