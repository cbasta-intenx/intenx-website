import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fixture Modernization Assessment — Axis Controls Line 1",
  description: "Sample Modernization Readiness Report — Axis Controls Line 1 Production Test Estate.",
  robots: { index: false, follow: false },
};

// ── Table helpers ─────────────────────────────────────────────────────────────

function TH({ children, right }: { children: React.ReactNode; right?: boolean }) {
  return (
    <th
      className={`px-4 py-2 text-xs font-semibold ${right ? "text-right" : "text-left"}`}
      style={{ color: "var(--muted)", borderBottom: "1px solid var(--border)" }}
    >
      {children}
    </th>
  );
}

function TD({ children, right, bold }: { children: React.ReactNode; right?: boolean; bold?: boolean }) {
  return (
    <td
      className={`px-4 py-2 text-xs ${right ? "text-right" : ""}`}
      style={{
        color: "var(--foreground)",
        fontWeight: bold ? 600 : 400,
        borderBottom: "1px solid var(--border)",
      }}
    >
      {children}
    </td>
  );
}

function GapCell({ v }: { v: string }) {
  const color = v === "✗" ? "#f87171" : "var(--muted)";
  return (
    <td className="px-4 py-2 text-center text-xs font-medium" style={{ color, borderBottom: "1px solid var(--border)" }}>
      {v}
    </td>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
      {children}
    </p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--foreground)" }}>
      {children}
    </h2>
  );
}

function KVTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="w-full border-collapse text-sm">
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k} style={{ borderBottom: "1px solid var(--border)" }}>
              <td className="px-4 py-2 text-xs font-medium w-48 shrink-0" style={{ color: "var(--muted)" }}>{k}</td>
              <td className="px-4 py-2 text-xs" style={{ color: "var(--foreground)" }}>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded p-4 mb-6 text-xs leading-relaxed" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--muted)" }}>
      {children}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FullReportPage() {
  return (
    <section className="max-w-2xl">
      {/* Header */}
      <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>
        Fixture Modernization Assessment
      </p>
      <h1 className="text-3xl font-bold leading-tight mb-2" style={{ color: "var(--foreground)" }}>
        Axis Controls — Line 1 Production Test Estate
      </h1>
      <div className="mb-12 text-xs" style={{ color: "var(--muted)" }}>
        <span>Prepared by INTenX / FixtureOps</span>
        <span className="mx-2">·</span>
        <span>Assessment type: Sample workup — representative mid-size OEM engagement</span>
        <span className="mx-2">·</span>
        <span>March 2026</span>
        <span className="mx-2">·</span>
        <span>Scope: Line 1 production test fixtures (3 stations)</span>
      </div>

      {/* Executive Summary */}
      <div className="mb-10 rounded-lg p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <SectionLabel>Executive Summary</SectionLabel>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--foreground)" }}>
          Axis Controls operates a five-fixture production test estate supporting embedded motor controller
          PCBAs. Line 1 — three stations responsible for functional test, ICT, and device programming —
          carries the most support risk. The control software on two of the three stations is either
          unsupported or dependent on a single internal technician. The third station generates no test
          data at all.
        </p>
        <p className="text-sm font-semibold mb-4" style={{ color: "var(--foreground)" }}>
          The fixtures are mechanically sound. The digital layer is not.
        </p>
        <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
          This assessment covers Line 1. It identifies the connectivity and supportability gaps on each
          station, outlines three modernization paths, and recommends a phased approach that eliminates
          the highest-risk single points of failure without requiring a rip-and-replace capital event.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded p-3" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
            <p className="text-xs font-semibold mb-1" style={{ color: "var(--muted)" }}>Phase 1 (Stations B + C + gateway)</p>
            <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>$26,500–$68,500 one-time</p>
            <p className="text-xs" style={{ color: "var(--muted)" }}>+ $2,400–$3,500/month managed</p>
          </div>
          <div className="rounded p-3" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
            <p className="text-xs font-semibold mb-1" style={{ color: "var(--muted)" }}>Phase 2 (Station A)</p>
            <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>$21,000–$48,000 (Supportability)</p>
            <p className="text-xs" style={{ color: "var(--muted)" }}>or $55,000–$135,000 (Control-Layer) — path after Readiness Report</p>
          </div>
        </div>
        <p className="text-xs mt-4" style={{ color: "var(--muted)" }}>
          Recommended first step: Modernization Readiness Report — $4,500, 100% credited toward execution if the project proceeds within 60 days, as confirmed in the assessment agreement.
        </p>
      </div>

      {/* Section 1 — Site Overview */}
      <div className="mb-10">
        <H2>1. Site and Estate Overview</H2>
        <KVTable rows={[
          ["Company",          "Axis Controls (composite representative profile)"],
          ["Products",         "Embedded motor controllers and power electronics (PCBA)"],
          ["Facility",         "Single-site Midwest manufacturing facility"],
          ["Total fixtures",   "5 (Line 1: 3; Line 2: 2)"],
          ["Fixture age",      "6–11 years"],
          ["Platform mix",     "LabVIEW/TestStand, PLC + HMI, bench ICT"],
          ["Yield tracking",   "Manual spreadsheet updated by line supervisor"],
          ["Remote support",   "None — all service requires on-site technician or contractor"],
          ["Data historian",   "None"],
          ["Plant IT posture", "Cautious — no cloud access to production floor without defined security posture"],
        ]} />
        <Note>Assessment scope: Line 1 only. Line 2 is stable; out of scope for this engagement.</Note>
      </div>

      {/* Section 2 — Current-State Assessment */}
      <div className="mb-10">
        <H2>2. Current-State Assessment — Line 1</H2>

        {/* Station A */}
        <div className="mb-8">
          <p className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>
            Station A — Functional Tester (FCT), LabVIEW-Based
          </p>
          <KVTable rows={[
            ["Type",                    "Clamshell FCT, 40-point"],
            ["Platform",                "LabVIEW 2016 / TestStand 5.1, Windows 7 (end of support)"],
            ["Fixture age",             "9 years"],
            ["Mechanical condition",    "Good — no wear or alignment issues"],
            ["Control platform status", "High risk"],
          ]} />
          <p className="text-xs font-semibold mb-2" style={{ color: "var(--muted)" }}>Findings</p>
          <ul className="text-sm leading-relaxed space-y-2 mb-4 list-none" style={{ color: "var(--muted)" }}>
            {[
              "Running Windows 7 on an embedded industrial PC. Microsoft ended extended support in January 2020. No security patches in six years.",
              "LabVIEW version is out of active NI support. Any software change requires a contractor who still holds the correct license.",
              "Test results written to a local .csv file. No structured export. File is manually copied to a shared drive weekly — sometimes monthly.",
              "Last software update: 22 months ago. Required a $2,800 contractor site visit for a limit change that took 45 minutes of actual work.",
              "The internal technician who understands this station's wiring and test logic is a single named individual. No documentation of the test architecture exists.",
            ].map((f, i) => (
              <li key={i} className="flex gap-2">
                <span style={{ color: "var(--accent)", flexShrink: 0 }}>—</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Note>
            <strong style={{ color: "var(--foreground)" }}>Primary risk:</strong> The next software
            failure, OS-level update conflict, or PC hardware failure could take this station down for
            days or weeks. The fixture itself would be fine. The digital layer would be the blocker.
          </Note>
        </div>

        {/* Station B */}
        <div className="mb-8">
          <p className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>
            Station B — In-Circuit Tester (ICT) / Bed-of-Nails
          </p>
          <KVTable rows={[
            ["Type",                    "Bed-of-nails ICT, 120 contact points"],
            ["Platform",                "PLC + HMI (Allen-Bradley MicroLogix 1400, PanelView 600)"],
            ["Fixture age",             "7 years"],
            ["Mechanical condition",    "Good"],
            ["Control platform status", "Stable but blind"],
          ]} />
          <p className="text-xs font-semibold mb-2" style={{ color: "var(--muted)" }}>Findings</p>
          <ul className="text-sm leading-relaxed space-y-2 mb-4 list-none" style={{ color: "var(--muted)" }}>
            {[
              "PLC logic and HMI are stable. No active complaints about reliability.",
              "The fixture generates pass/fail results that are displayed on the HMI and stored nowhere else. There is no data output path — no serial, no Ethernet, no log file.",
              "Yield for this station is tracked by the line supervisor counting manually at end of shift.",
              "The PLC has an Ethernet port that is unused. No network connection has ever been configured.",
              "Remote diagnostics are not possible. Any fault requires a technician to walk to the station and read the HMI.",
            ].map((f, i) => (
              <li key={i} className="flex gap-2">
                <span style={{ color: "var(--accent)", flexShrink: 0 }}>—</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Note>
            <strong style={{ color: "var(--foreground)" }}>Primary risk:</strong> The fixture is
            operationally stable today, but it is completely invisible. When it fails — or when
            throughput drops — there is no early warning and no structured data to support root cause
            analysis.
          </Note>
        </div>

        {/* Station C */}
        <div className="mb-8">
          <p className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>
            Station C — Programming Jig (Device Programmer)
          </p>
          <KVTable rows={[
            ["Type",                    "Bench-level programming jig, single DUT"],
            ["Platform",                "Dediprog SF600 programmer, no controller"],
            ["Fixture age",             "6 years"],
            ["Mechanical condition",    "Good"],
            ["Control platform status", "Manual — no automation"],
          ]} />
          <p className="text-xs font-semibold mb-2" style={{ color: "var(--muted)" }}>Findings</p>
          <ul className="text-sm leading-relaxed space-y-2 mb-4 list-none" style={{ color: "var(--muted)" }}>
            {[
              "Programming is initiated manually by the operator. Pass/fail is indicated by an LED. No result is logged.",
              "Firmware version flashed is controlled by the operator copying a file from a USB drive. No recipe management. No version enforcement.",
              "There have been two escapes in the past 18 months where devices were flashed with an incorrect firmware version. Both were caught at FCT (Station A). Recovery required manual re-flashing of the affected lot.",
              "Throughput data does not exist for this station.",
            ].map((f, i) => (
              <li key={i} className="flex gap-2">
                <span style={{ color: "var(--accent)", flexShrink: 0 }}>—</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Note>
            <strong style={{ color: "var(--foreground)" }}>Primary risk:</strong> Recipe and version
            control is entirely manual. The escape risk is ongoing. The fix does not require hardware —
            it requires version-controlled, auditable recipe delivery.
          </Note>
        </div>
      </div>

      {/* Section 3 — Gap Analysis */}
      <div className="mb-10">
        <H2>3. Connectivity Gap Analysis</H2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <TH>Gap</TH>
                <TH>Station A</TH>
                <TH>Station B</TH>
                <TH>Station C</TH>
              </tr>
            </thead>
            <tbody>
              {[
                ["Structured test data export",         "✗", "✗", "✗"],
                ["Real-time fault visibility",          "✗", "✗", "N/A"],
                ["Remote support path",                 "✗", "✗", "✗"],
                ["Controlled software/recipe updates",  "✗", "—", "✗"],
                ["Version-auditable firmware delivery", "—", "—", "✗"],
                ["Uptime / cycle monitoring",           "✗", "✗", "✗"],
                ["Secure, segmented network path",      "✗", "✗", "✗"],
              ].map(([gap, a, b, c]) => (
                <tr key={gap}>
                  <td className="px-4 py-2 text-xs" style={{ color: "var(--foreground)", borderBottom: "1px solid var(--border)" }}>{gap}</td>
                  <GapCell v={a} />
                  <GapCell v={b} />
                  <GapCell v={c} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          Every fixture on Line 1 is running blind. Service is reactive. There is no structured data
          flowing out of any station, no remote support path, and no version-controlled update process.
          The line is dependent on manual tracking and tribal knowledge to stay operational.
        </p>
      </div>

      {/* Section 4 — Modernization Options */}
      <div className="mb-10">
        <H2>4. Modernization Options</H2>
        <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
          Three retrofit paths are available for Line 1. They are not mutually exclusive — a phased
          approach is recommended.
        </p>

        {/* Path 1 */}
        <div className="mb-8 rounded-lg p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>Path 1</p>
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--foreground)" }}>Read-Only Connectivity</p>
          <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>Applies to: Station B (ICT), Station C (Programming jig) · Fastest time to value</p>
          <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
            Connects the fixture to the site gateway. Extracts pass/fail, cycle count, and fault events
            without modifying existing control logic. Adds structured data feed to a centralized
            dashboard. Real-time visibility from any browser on the plant network. Adds uptime and
            throughput monitoring. Does not touch PLC program or HMI on Station B.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr>
                  <TH>Station B — ICT (Read-Only)</TH><TH right>Low</TH><TH right>High</TH>
                </tr>
              </thead>
              <tbody>
                <tr><TD>Per-fixture modernization</TD><TD right>$6,000</TD><TD right>$14,000</TD></tr>
                <tr><TD>Platform adder (PLC/HMI)</TD><TD right>$4,000</TD><TD right>$14,000</TD></tr>
                <tr><TD bold>Station B subtotal</TD><TD right bold>$10,000</TD><TD right bold>$28,000</TD></tr>
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr>
                  <TH>Station C — Programming Jig (Read-Only)</TH><TH right>Low</TH><TH right>High</TH>
                </tr>
              </thead>
              <tbody>
                <tr><TD>Per-fixture modernization</TD><TD right>$3,000</TD><TD right>$7,000</TD></tr>
                <tr><TD>Platform adder (bench/manual)</TD><TD right>$0</TD><TD right>$4,000</TD></tr>
                <tr><TD bold>Station C subtotal</TD><TD right bold>$3,000</TD><TD right bold>$11,000</TD></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Path 2 */}
        <div className="mb-8 rounded-lg p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>Path 2</p>
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--foreground)" }}>Supportability Retrofit</p>
          <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>Applies to: Station A (LabVIEW FCT), Station C (version control) · Eliminates highest-risk single points of failure</p>
          <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
            Station A: Adds secure, audited remote support tunnel. Adds structured result export to the
            gateway. Adds controlled software update delivery. Does not replace LabVIEW test code or
            fixture mechanics. Station C: Adds version-controlled, auditable recipe delivery. Operator
            selects from an approved firmware list — no USB drives, no version escapes.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr>
                  <TH>Station A — LabVIEW FCT (Supportability)</TH><TH right>Low</TH><TH right>High</TH>
                </tr>
              </thead>
              <tbody>
                <tr><TD>Per-fixture modernization</TD><TD right>$14,000</TD><TD right>$30,000</TD></tr>
                <tr><TD>Platform adder (LabVIEW/TestStand)</TD><TD right>$7,000</TD><TD right>$18,000</TD></tr>
                <tr><TD bold>Station A subtotal</TD><TD right bold>$21,000</TD><TD right bold>$48,000</TD></tr>
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr>
                  <TH>Station C — Programming Jig (Supportability upgrade)</TH><TH right>Low</TH><TH right>High</TH>
                </tr>
              </thead>
              <tbody>
                <tr><TD>Incremental upgrade over Read-Only</TD><TD right>$3,000</TD><TD right>$7,000</TD></tr>
                <tr><TD bold>Station C (Supportability) subtotal</TD><TD right bold>$6,000</TD><TD right bold>$18,000</TD></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Path 3 */}
        <div className="mb-8 rounded-lg p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>Path 3</p>
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--foreground)" }}>Control-Layer Modernization</p>
          <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>Applies to: Station A only · Longest-term option</p>
          <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
            Replaces the Windows 7 industrial PC and LabVIEW/TestStand orchestration with a modern,
            maintainable control architecture. Test hardware preserved. Eliminates Windows 7 end-of-support
            risk permanently. Eliminates contractor dependency for limit and sequence changes. Significant
            engineering engagement — requires test architecture review, sequence re-implementation, and
            acceptance testing.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr>
                  <TH>Station A — LabVIEW FCT (Control-Layer)</TH><TH right>Low</TH><TH right>High</TH>
                </tr>
              </thead>
              <tbody>
                <tr><TD>Per-fixture modernization</TD><TD right>$35,000</TD><TD right>$75,000</TD></tr>
                <tr><TD>Platform adder (legacy NI/old OS)</TD><TD right>$20,000</TD><TD right>$60,000</TD></tr>
                <tr><TD bold>Station A subtotal (estimate only)</TD><TD right bold>$55,000</TD><TD right bold>$135,000</TD></tr>
              </tbody>
            </table>
          </div>
          <Note>This range is wide by design. A Readiness Report is required before a firm quote can be issued for Path 3 on Station A.</Note>
        </div>
      </div>

      {/* Section 5 — Site Gateway */}
      <div className="mb-10">
        <H2>5. Site Gateway</H2>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
          All three paths require a shared site gateway. This is a one-time infrastructure cost, not a
          per-fixture charge.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr><TH>Gateway tier</TH><TH>Description</TH><TH right>Cost</TH></tr>
            </thead>
            <tbody>
              <tr>
                <TD>Standard</TD>
                <TD>PostgreSQL, Grafana dashboards, secure remote access tunnel, staged update infrastructure, certificate management</TD>
                <TD right>$6,000–$18,000</TD>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 6 — Investment Summary */}
      <div className="mb-10">
        <H2>6. Investment Summary</H2>
        <p className="text-sm font-medium mb-4" style={{ color: "var(--foreground)" }}>
          Recommended Phase 1: Read-Only + Supportability (Stations B and C first, Station A assessment)
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr><TH>Item</TH><TH right>Low</TH><TH right>High</TH></tr>
            </thead>
            <tbody>
              {[
                ["Modernization Readiness Report (Line 1, on-site)", "$4,500",   "$4,500",   false],
                ["Site gateway (standard)",                          "$6,000",   "$18,000",  false],
                ["Station B — ICT (Read-Only)",                     "$10,000",  "$28,000",  false],
                ["Station C — Programming Jig (Supportability)",    "$6,000",   "$18,000",  false],
                ["Phase 1 one-time total",                          "$26,500",  "$68,500",  true],
                ["Managed service — Stations B and C + site stack", "$2,400/mo","$3,500/mo",false],
              ].map(([item, low, high, bold]) => (
                <tr key={item as string}>
                  <TD bold={bold as boolean}>{item}</TD>
                  <TD right bold={bold as boolean}>{low}</TD>
                  <TD right bold={bold as boolean}>{high}</TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Note>Readiness Report fee ($4,500) credited 100% toward Phase 1 execution if project proceeds within 60 days, as confirmed in the assessment agreement.</Note>

        <p className="text-sm font-medium mb-4" style={{ color: "var(--foreground)" }}>
          Phase 2: Station A — Decision point after Readiness Report
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr><TH>Option</TH><TH right>Low</TH><TH right>High</TH></tr>
            </thead>
            <tbody>
              <tr>
                <TD>Supportability Retrofit (preserve LabVIEW, add remote support)</TD>
                <TD right>$21,000</TD><TD right>$48,000</TD>
              </tr>
              <tr>
                <TD>Control-Layer Modernization (replace LabVIEW/Windows 7)</TD>
                <TD right>$55,000</TD><TD right>$135,000</TD>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 7 — Recommended Path */}
      <div className="mb-10">
        <H2>7. Recommended Path</H2>
        <p className="text-sm font-semibold mb-4" style={{ color: "var(--foreground)" }}>
          Start with the Readiness Report.
        </p>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
          The Line 1 estate is modernizable. The mechanics are sound. But Station A has enough unknown
          depth in its LabVIEW codebase and instrument driver stack that quoting a firm number without a
          structured assessment would be irresponsible.
        </p>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
          The Readiness Report for this engagement ($4,500, on-site, one day) will produce: fixture-by-fixture
          inventory, connectivity gap assessment, modernization path recommendation for each station,
          firm quote for Phase 1, and bounded estimate for Station A, plus plant IT assessment.
        </p>
        <Note>
          <strong style={{ color: "var(--foreground)" }}>Why this sequence:</strong> Stations B and C
          are lower-risk and faster to execute. Delivering visible, measurable value on those stations
          builds confidence for the Station A decision. The Station A decision is a significant one — the
          Readiness Report makes it data-driven, not a guess. The managed service engagement begins at
          Phase 1 completion, generating monthly recurring value before Station A is resolved.
        </Note>
      </div>

      {/* Section 8 — Next Step */}
      <div className="rounded-lg p-6 mb-12" style={{ background: "var(--surface)", border: "1px solid var(--accent)" }}>
        <SectionLabel>Next Step</SectionLabel>
        <p className="text-sm font-semibold mb-2" style={{ color: "var(--foreground)" }}>
          Modernization Readiness Report — Line 1
        </p>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
          On-site assessment, one day. Fixture-by-fixture inventory, connectivity gap analysis,
          platform risk review, plant IT walkthrough.
        </p>
        <p className="text-sm font-medium mb-4" style={{ color: "var(--foreground)" }}>
          $4,500 — 100% credited toward execution if the project proceeds within 60 days, as confirmed in the assessment agreement.
        </p>
        <a href="/contact?inquiry=modernize" className="btn-primary">
          Start with a scoping conversation
        </a>
      </div>

      {/* Footer note */}
      <p className="text-xs leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
        This workup is a representative sample based on a composite site profile. Actual assessments
        are produced after a scoping call and reflect the specific fixture estate, platform mix, and
        operational context of each customer.
      </p>
      <a href="/modernize" className="text-sm" style={{ color: "var(--accent)" }}>
        ← Back to /modernize
      </a>
    </section>
  );
}
