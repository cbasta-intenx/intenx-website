import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with INTenX. We respond within 1 business day.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact | INTenX", url: "/contact" },
};

export default function Contact() {
  return (
    <section className="max-w-xl">
      <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
        Contact INTenX
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
        We respond within 1 business day.
      </p>

      <Suspense fallback={null}>
        <ContactForm />
      </Suspense>

      <p className="text-sm mt-8" style={{ color: "var(--muted)" }}>
        Or reach us directly at{" "}
        <a href="mailto:info@intenx.io" style={{ color: "var(--accent)" }}>info@intenx.io</a>
        {" "}— 202 Lindenwood Dr., Michigan City, IN 46360
      </p>
    </section>
  );
}
