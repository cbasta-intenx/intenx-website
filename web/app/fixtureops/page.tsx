import FixtureConfigurator from "./FixtureConfigurator";

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
        <p className="text-base leading-relaxed max-w-xl" style={{ color: "var(--muted)" }}>
          Answer a few questions about your board and program. We&apos;ll show you a price range on
          the spot — no sales call required. If your program warrants a conversation first,
          we&apos;ll say so.
        </p>
      </section>

      <FixtureConfigurator />
    </>
  );
}
