import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section className="max-w-xl">
      <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
        Contact INTenX
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
        We respond within 1 business day.
      </p>

      <ContactForm />

      <p className="text-sm mt-8" style={{ color: "var(--muted)" }}>
        Or reach us directly at{" "}
        <a href="mailto:info@intenx.io" style={{ color: "var(--accent)" }}>info@intenx.io</a>
        {" "}— 202 Lindenwood Dr., Michigan City, IN 46360
      </p>
    </section>
  );
}
