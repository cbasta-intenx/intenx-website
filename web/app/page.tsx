import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "INTenX — Custom Test Infrastructure",
  alternates: { canonical: "/" },
  openGraph: { title: "INTenX — Custom Test Infrastructure", url: "/" },
};

const pillars = [
  {
    label: "Fixed-price fixtures",
    body: "Functional testers, bed-of-nails, programming jigs, and assembly testers — scoped, priced, and delivered. No hourly surprises.",
  },
  {
    label: "Connected platform",
    body: "Every fixture ships connected. Real-time yield data, faster fault diagnosis, and remote visibility through the FixtureOps platform.",
  },
  {
    label: "Managed lifecycle",
    body: "Test Fixtures as a Service (TFaaS) — INTenX owns the fixture hardware, you pay monthly. Maintenance, updates, and support included.",
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
          Custom Test Infrastructure.
        </h1>
        <p className="text-lg leading-relaxed mb-10 max-w-2xl" style={{ color: "var(--muted)" }}>
          Designed for your product. Managed for your team.
        </p>
      </section>

      {/* Routing tiles */}
      <section className="mb-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              headline: "Fixtures on the floor with no visibility?",
              body: "No yield data. No remote support. No way to push a recipe update without a site visit. INTenX connects what you have — without replacing it.",
              cta: "Connect your fixtures",
              href: "/modernize",
            },
            {
              headline: "Ready to go to production?",
              body: "Fixed-price fixtures, built fast, connected and supported for life. Transparent pricing from the first visit — no sales call to get a number.",
              cta: "Get a fixture estimate",
              href: "/fixtureops",
            },
            {
              headline: "Qualifying a new hardware design?",
              body: "Your bench rig won't survive the handoff to production. We build qualification fixtures that become your production fixtures — so EVT data sets your test limits, not guesswork.",
              cta: "Talk to us about DVT fixtures",
              href: "/qualify",
            },
          ].map(({ headline, body, cta, href }) => (
            <a
              key={href}
              href={href}
              className="flex flex-col gap-3 rounded-lg p-5 transition-colors hover:border-[var(--accent)]"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", textDecoration: "none" }}
            >
              <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{headline}</p>
              <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--muted)" }}>{body}</p>
              <p className="text-xs font-medium" style={{ color: "var(--accent)" }}>{cta} →</p>
            </a>
          ))}
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
