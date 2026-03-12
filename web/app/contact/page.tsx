export default function Contact() {
  return (
    <section className="max-w-xl">
      <h1 className="text-3xl font-bold mb-8" style={{ color: "var(--foreground)" }}>
        Contact INTenX
      </h1>

      <p className="text-base leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
        To reach out about a project or availability, please provide:
      </p>

      <ul className="space-y-3 mb-10">
        {[
          "A short overview of your product",
          "A description of what you need help with",
          "An approximate project timeline",
        ].map((item) => (
          <li key={item} className="flex gap-3 text-sm" style={{ color: "var(--muted)" }}>
            <span style={{ color: "var(--accent)", flexShrink: 0 }}>—</span>
            {item}
          </li>
        ))}
      </ul>

      <a href="mailto:info@intenx.io" className="btn-primary">
        info@intenx.io
      </a>
    </section>
  );
}
