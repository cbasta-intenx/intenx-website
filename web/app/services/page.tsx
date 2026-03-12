const services = [
  {
    title: "FixtureOps — Production Test Fixtures",
    description: "Hardware-first fixture engineering for electronics manufacturers.",
    items: [
      "Functional circuit testers (FCT) — custom to your board",
      "Bed-of-nails and ICT fixtures",
      "Programming jigs: JTAG, SWD, UART",
      "Assembly testers and mechanical verification fixtures",
      "Multi-up panel fixtures for high-volume lines",
      "Test Fixtures as a Service (TFaaS) — managed hardware, pay per test",
    ],
  },
  {
    title: "FixtureOps Platform — Connected Test Infrastructure",
    description: "Real-time visibility into your production test floor.",
    items: [
      "Fixture-to-cloud connectivity via MQTT / Sparkplug B",
      "Real-time yield dashboards and failure trend analysis",
      "AI-assisted diagnostics — pattern detection across test runs",
      "MES and ERP integration",
      "Remote fixture monitoring and support",
      "PostgreSQL-backed — open standards, no black box",
    ],
  },
  {
    title: "AI Enablement & Engineering Consulting",
    description: "Practical AI implementation for manufacturing and engineering teams.",
    items: [
      "AI workflow design for production and quality ops",
      "Context governance for AI-assisted engineering teams",
      "Team training and onboarding for AI tooling",
      "Embedded systems and firmware consulting",
      "Electronics design and hardware bring-up support",
    ],
  },
];

export default function Services() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
        Services
      </h1>
      <p className="text-base mb-12" style={{ color: "var(--muted)" }}>
        Production test infrastructure and engineering support for hardware companies.
      </p>

      <div className="flex flex-col gap-8">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-lg p-6"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <h3 className="font-semibold text-base mb-1" style={{ color: "var(--foreground)" }}>
              {service.title}
            </h3>
            <p className="text-sm mb-4" style={{ color: "var(--accent)" }}>{service.description}</p>
            <ul className="space-y-2">
              {service.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-snug" style={{ color: "var(--muted)" }}>
                  <span style={{ color: "var(--accent)", flexShrink: 0 }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
        <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
          Ready to scope a fixture program?
        </p>
        <a href="/fixtureops" className="btn-primary">Get a Fixture Estimate</a>
      </div>
    </section>
  );
}
