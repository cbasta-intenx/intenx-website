export default function About() {
  return (
    <section className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8" style={{ color: "var(--foreground)" }}>
        About INTenX
      </h1>

      <p className="text-base leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
        INTenX accelerates product development for hardware teams by combining deep expertise
        in electronics, embedded firmware, and production test systems.
      </p>

      <div className="space-y-4 mb-8" style={{ borderLeft: "2px solid var(--border)", paddingLeft: "1.25rem" }}>
        <div>
          <p className="text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>History &amp; Mission</p>
          <p className="text-sm" style={{ color: "var(--muted)" }}>Supporting hardware teams in building robust products.</p>
        </div>
        <div>
          <p className="text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>Experience</p>
          <p className="text-sm" style={{ color: "var(--muted)" }}>Electronics, firmware, and production test.</p>
        </div>
        <div>
          <p className="text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>Theme</p>
          <p className="text-sm" style={{ color: "var(--muted)" }}>"Accelerating Product Development" through partnership.</p>
        </div>
      </div>

      <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
        INTenX partners with clients to deliver practical, reliable engineering solutions
        for real-world challenges.
      </p>
    </section>
  );
}
