import type { Metadata } from "next";
import SampleReportForm from "./SampleReportForm";

export const metadata: Metadata = {
  title: "Sample Modernization Readiness Report",
  description:
    "See what a FixtureOps Modernization Readiness Report looks like — real retrofit paths, ROM ranges, and phased investment summary for a composite 5-fixture OEM.",
  alternates: { canonical: "/modernize/sample-report" },
  robots: { index: true, follow: true },
};

// ── Gap analysis table data ───────────────────────────────────────────────────

const gapRows = [
  { gap: "Structured test data export",        a: "✗", b: "✗", c: "✗" },
  { gap: "Real-time fault visibility",         a: "✗", b: "✗", c: "N/A" },
  { gap: "Remote support path",                a: "✗", b: "✗", c: "✗" },
  { gap: "Controlled software/recipe updates", a: "✗", b: "—", c: "✗" },
  { gap: "Version-auditable firmware delivery",a: "—", b: "—", c: "✗" },
  { gap: "Uptime / cycle monitoring",          a: "✗", b: "✗", c: "✗" },
  { gap: "Secure, segmented network path",     a: "✗", b: "✗", c: "✗" },
];

const investmentRows = [
  { item: "Modernization Readiness Report (Line 1, on-site)", low: "$4,500",     high: "$4,500",  bold: false },
  { item: "Site gateway (standard)",                          low: "$6,000",     high: "$18,000", bold: false },
  { item: "Station B — ICT (Read-Only)",                     low: "$10,000",    high: "$28,000", bold: false },
  { item: "Station C — Programming Jig (Supportability)",    low: "$6,000",     high: "$18,000", bold: false },
  { item: "Phase 1 one-time total",                          low: "$26,500",    high: "$68,500", bold: true },
  { item: "Managed service — 3 stations, site retainer",     low: "$3,200/mo",  high: "$4,500/mo", bold: false },
];

// ── Cell style helper ─────────────────────────────────────────────────────────

function GapCell({ value }: { value: string }) {
  const color = value === "✗" ? "#f87171" : value === "—" ? "var(--muted)" : "var(--muted)";
  return (
    <td className="px-4 py-2 text-center text-sm font-medium" style={{ color }}>
      {value}
    </td>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SampleReportPage() {
  return (
    <section className="max-w-2xl">
      {/* Hero */}
      <p className="text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: "var(--accent)" }}>
        Sample Assessment
      </p>
      <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: "var(--foreground)" }}>
        See what a Modernization Readiness Report looks like.
      </h1>
      <p className="text-lg leading-relaxed mb-12" style={{ color: "var(--muted)" }}>
        A real workup for a composite 5-fixture electronics OEM — three stations, three retrofit
        paths, phased investment summary.
      </p>

      {/* Teaser preview */}
      <div className="rounded-lg mb-12 overflow-hidden" style={{ border: "1px solid var(--border)" }}>
        {/* Document header */}
        <div className="px-6 py-4 border-b" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>
            Sample — Fixture Modernization Assessment
          </p>
          <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Axis Controls — Line 1 Production Test Estate
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
            INTenX / FixtureOps · March 2026
          </p>
        </div>

        <div className="px-6 py-6" style={{ background: "var(--bg)" }}>
          {/* Section A — Executive Summary */}
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--muted)" }}>
              Executive Summary
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--foreground)" }}>
              Axis Controls operates a five-fixture production test estate supporting embedded motor
              controller PCBAs. Line 1 — three stations responsible for functional test, ICT, and
              device programming — carries the most support risk. The control software on two of
              the three stations is either unsupported or dependent on a single internal technician.
              The third station generates no test data at all.
            </p>
            <p className="text-sm font-semibold mb-4" style={{ color: "var(--foreground)" }}>
              The fixtures are mechanically sound. The digital layer is not.
            </p>
            <div className="rounded p-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--muted)" }}>
                Estimated modernization investment — Line 1 (phased)
              </p>
              <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                $26,500–$68,500 one-time + $3,200–$4,500/month managed
              </p>
            </div>
          </div>

          {/* Section B — Connectivity Gap Analysis */}
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--muted)" }}>
              Connectivity Gap Analysis
            </p>
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <th className="px-4 py-2 text-left text-xs font-semibold" style={{ color: "var(--muted)" }}>Gap</th>
                    <th className="px-4 py-2 text-center text-xs font-semibold" style={{ color: "var(--muted)" }}>Station A</th>
                    <th className="px-4 py-2 text-center text-xs font-semibold" style={{ color: "var(--muted)" }}>Station B</th>
                    <th className="px-4 py-2 text-center text-xs font-semibold" style={{ color: "var(--muted)" }}>Station C</th>
                  </tr>
                </thead>
                <tbody>
                  {gapRows.map((row) => (
                    <tr key={row.gap} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td className="px-4 py-2 text-xs" style={{ color: "var(--foreground)" }}>{row.gap}</td>
                      <GapCell value={row.a} />
                      <GapCell value={row.b} />
                      <GapCell value={row.c} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section C — Phase 1 Investment Summary (with fade) */}
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--muted)" }}>
              Phase 1 Investment Summary
            </p>
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <th className="px-4 py-2 text-left text-xs font-semibold" style={{ color: "var(--muted)" }}>Item</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold" style={{ color: "var(--muted)" }}>Low</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold" style={{ color: "var(--muted)" }}>High</th>
                  </tr>
                </thead>
                <tbody>
                  {investmentRows.map((row) => (
                    <tr key={row.item} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td
                        className="px-4 py-2 text-xs"
                        style={{ color: "var(--foreground)", fontWeight: row.bold ? 600 : 400 }}
                      >
                        {row.item}
                      </td>
                      <td
                        className="px-4 py-2 text-xs text-right"
                        style={{ color: "var(--foreground)", fontWeight: row.bold ? 600 : 400 }}
                      >
                        {row.low}
                      </td>
                      <td
                        className="px-4 py-2 text-xs text-right"
                        style={{ color: "var(--foreground)", fontWeight: row.bold ? 600 : 400 }}
                      >
                        {row.high}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Fade overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, transparent, var(--bg))",
              }}
            />
          </div>
        </div>

        {/* Below fade */}
        <div className="px-6 pb-6" style={{ background: "var(--bg)" }}>
          <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
            The full report covers current-state assessment for each station, three retrofit paths
            with pricing, site gateway requirements, and the recommended sequencing rationale.
          </p>
        </div>
      </div>

      {/* Gate form */}
      <SampleReportForm />
    </section>
  );
}
