import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "INTenX is a founder-led production test engineering company based in Michigan City, Indiana.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About | INTenX", url: "/about" },
};

export default function About() {
  return (
    <section className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8" style={{ color: "var(--foreground)" }}>
        About INTenX
      </h1>

      <p className="text-base leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
        INTenX is a production test engineering company based in Michigan City, Indiana.
        We design, build, and manage the test fixtures that keep hardware manufacturing lines running.
      </p>

      <div className="space-y-8 mb-10">
        <div style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "1.25rem" }}>
          <p className="text-sm font-semibold mb-2" style={{ color: "var(--foreground)" }}>Founder-led</p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Cole Basta brings 30+ years of hands-on engineering experience across electronics design,
            embedded firmware, production test systems, and manufacturing automation. INTenX is the
            company he built to do one thing well: make production test transparent, intelligent, and
            accessible to the hardware companies that need it most.
          </p>
        </div>

        <div style={{ borderLeft: "2px solid var(--border)", paddingLeft: "1.25rem" }}>
          <p className="text-sm font-semibold mb-2" style={{ color: "var(--foreground)" }}>Why Indiana</p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            INTenX is anchored in the Midwest because that&apos;s where the manufacturers are. The
            companies building real hardware — industrial controls, IoT devices, medical equipment,
            automotive electronics — are often not in Silicon Valley. They need a test engineering
            partner who understands manufacturing constraints, not just software abstractions.
          </p>
        </div>

        <div style={{ borderLeft: "2px solid var(--border)", paddingLeft: "1.25rem" }}>
          <p className="text-sm font-semibold mb-2" style={{ color: "var(--foreground)" }}>Open by design</p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            The FixtureOps platform is built on open standards: MQTT, Sparkplug B, PostgreSQL. No
            proprietary lock-in, no black box. Your test data belongs to you, and the system is
            designed to integrate with the MES, ERP, or tools you already use.
          </p>
        </div>

        <div style={{ borderLeft: "2px solid var(--border)", paddingLeft: "1.25rem" }}>
          <p className="text-sm font-semibold mb-2" style={{ color: "var(--foreground)" }}>The name</p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            INTenX: IN (Indiana) + INTENtional + TenX. Engineering with intent — building things
            that work, not things that look like they work.
          </p>
        </div>
      </div>

      <a href="/contact" className="btn-primary">Get in touch</a>
    </section>
  );
}
