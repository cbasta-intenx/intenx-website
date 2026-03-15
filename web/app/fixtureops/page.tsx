import type { Metadata } from "next";
import FixtureConfigurator from "./FixtureConfigurator";

export const metadata: Metadata = {
  title: "FixtureOps — Get a Fixture Estimate",
  description: "Scope your test fixture project and get an instant price range. FCT, ICT, programming jigs, assembly testers — no sales call required.",
  alternates: { canonical: "/fixtureops" },
  openGraph: { title: "FixtureOps — Get a Fixture Estimate | INTenX", url: "/fixtureops" },
};

export default function FixtureOps() {
  return (
    <>
      <section className="mb-12">
        <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>
          FixtureOps
        </p>
        <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--foreground)" }}>
          Your test fixtures.<br />Without the test team.
        </h1>
        <p className="text-base leading-relaxed max-w-xl mb-8" style={{ color: "var(--muted)" }}>
          Answer a few questions about your board and program. We&apos;ll show you a price range on
          the spot — no sales call required. If your program warrants a conversation first,
          we&apos;ll say so.
        </p>
        <div className="rounded-lg p-5 max-w-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Every fixture quote takes too long. The price changes when scope changes. And after delivery,
            you&apos;re on your own — no remote support, no OTA updates, no one to call when the line goes
            down.
          </p>
          <p className="text-sm leading-relaxed mt-3" style={{ color: "var(--muted)" }}>
            FixtureOps fixtures are fixed-price for defined scope, built fast, and managed for the life of the program.
            Software changes — new board variants, recipe updates, integration changes — are included.
            No new PO every time your product evolves.
          </p>
        </div>
      </section>

      <FixtureConfigurator />
    </>
  );
}
