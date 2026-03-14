import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How INTenX collects, uses, and protects your information.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Privacy Policy</h1>
      <p className="text-sm mb-12" style={{ color: "var(--muted)" }}>Effective March 13, 2026</p>

      <section className="flex flex-col gap-8 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>

        <div>
          <h2 className="text-base font-semibold mb-3" style={{ color: "var(--foreground)" }}>What we collect</h2>
          <p>
            When you use the contact form or fixture configurator on intenx.io, we collect the information
            you voluntarily provide: your name, business email address, company name, and the details of
            your inquiry or fixture requirements. We do not collect payment information on this site.
          </p>
          <p className="mt-3">
            Vercel Analytics (our hosting provider) collects anonymized, aggregated page-view data — no
            cookies, no personal identifiers.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold mb-3" style={{ color: "var(--foreground)" }}>How we use it</h2>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li><strong style={{ color: "var(--foreground)" }}>Responding to your inquiry.</strong> We use your contact details to reply to your message or estimate request. This is the primary purpose of collection.</li>
            <li><strong style={{ color: "var(--foreground)" }}>Optional marketing updates.</strong> If you checked the opt-in box on our form, we may send occasional product updates or news about INTenX. You can unsubscribe at any time by replying to any email or contacting us at the address below.</li>
            <li><strong style={{ color: "var(--foreground)" }}>CRM record-keeping.</strong> We store contact information in HubSpot CRM to manage follow-ups and avoid sending duplicate messages.</li>
          </ul>
          <p className="mt-3">We do not sell, rent, or share your personal information with third parties for their own marketing purposes.</p>
        </div>

        <div>
          <h2 className="text-base font-semibold mb-3" style={{ color: "var(--foreground)" }}>Third-party processors</h2>
          <p>The following services process data on our behalf:</p>
          <ul className="list-disc pl-5 mt-3 flex flex-col gap-2">
            <li><strong style={{ color: "var(--foreground)" }}>Vercel</strong> — site hosting and anonymous analytics. Data stored in the United States.</li>
            <li><strong style={{ color: "var(--foreground)" }}>Resend</strong> — transactional email delivery. Your submitted information is included in the email sent to us. Resend processes email in accordance with their own privacy policy.</li>
            <li><strong style={{ color: "var(--foreground)" }}>HubSpot</strong> — CRM. Name, email, and company are stored in HubSpot to manage our sales pipeline. HubSpot is certified under the EU-US Data Privacy Framework.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-semibold mb-3" style={{ color: "var(--foreground)" }}>Data retention</h2>
          <p>
            We retain contact information for as long as needed to service your inquiry or maintain our
            business relationship. You may request deletion at any time by emailing us.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold mb-3" style={{ color: "var(--foreground)" }}>Your rights</h2>
          <p>
            You have the right to access, correct, or delete the personal information we hold about you.
            To exercise these rights, contact us at{" "}
            <a href="mailto:info@intenx.io" style={{ color: "var(--accent)" }}>info@intenx.io</a>.
            We will respond within 30 days.
          </p>
          <p className="mt-3">
            If you are located in Canada, you may also have rights under PIPEDA or applicable provincial
            privacy legislation. If you are in the European Economic Area, you have rights under GDPR.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold mb-3" style={{ color: "var(--foreground)" }}>Contact</h2>
          <p>
            INTenX (Makanu&igrave; Enterprises LLC)<br />
            Indianapolis, Indiana, USA<br />
            <a href="mailto:info@intenx.io" style={{ color: "var(--accent)" }}>info@intenx.io</a>
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold mb-3" style={{ color: "var(--foreground)" }}>Changes to this policy</h2>
          <p>
            We may update this policy periodically. When we do, the effective date above will change.
            Material changes will be noted on this page.
          </p>
        </div>

      </section>
    </main>
  );
}
