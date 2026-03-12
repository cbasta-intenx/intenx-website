export default function Home() {

  return (
    <section className="flex flex-col items-start justify-center min-h-[55vh] max-w-2xl">
      <p className="text-sm font-medium uppercase tracking-widest mb-6" style={{ color: "var(--accent)" }}>
        Engineering Services
      </p>
      <h1 className="text-5xl font-bold leading-tight mb-5" style={{ color: "var(--foreground)" }}>
        INTenX
      </h1>
      <h2 className="text-xl font-normal mb-6" style={{ color: "var(--muted)" }}>
        Engineering &bull; Embedded Systems &bull; Production Test
      </h2>
      <p className="text-lg leading-relaxed mb-10" style={{ color: "var(--muted)", maxWidth: "540px" }}>
        INTenX supports hardware teams in building robust products by combining
        embedded development, firmware expertise, and production test systems.
      </p>
      <a href="/services" className="btn-primary">
        View Services
      </a>
    </section>
  );
}
