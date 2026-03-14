import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "INTenX",
  url: "https://intenx.io",
  description: "Test Fixtures as a Service for hardware and manufacturing teams.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "cole.basta@makanuienterprises.com",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL("https://intenx.io"),
  title: {
    default: "INTenX — Custom Test Infrastructure",
    template: "%s | INTenX",
  },
  description: "INTenX designs, connects, and manages production test fixtures for hardware manufacturers. We help teams launch faster, modernize legacy fixtures, and run test infrastructure without building a large internal test organization.",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  openGraph: {
    siteName: "INTenX",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
            style={{ background: "var(--background)", color: "var(--foreground)" }}>

        <header style={{ borderBottom: "1px solid var(--border)", background: "rgba(13,17,23,0.92)", backdropFilter: "blur(8px)" }}
                className="sticky top-0 z-50">
          <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 h-14">
            <a href="/" className="font-semibold text-lg tracking-tight transition-opacity hover:opacity-80"
               style={{ color: "var(--foreground)" }}>
              INTenX
            </a>
            <ul className="flex items-center gap-7 text-sm font-medium" style={{ color: "var(--muted)" }}>
              <li><a href="/" className="transition-colors hover:text-white">Home</a></li>
              <li className="relative group">
                <span className="transition-colors hover:text-white cursor-default select-none">Solutions</span>
                <ul
                  className="absolute left-0 top-full pt-2 min-w-[200px] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50"
                >
                  <li style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "0.5rem", overflow: "hidden" }}>
                    <a href="/qualify" className="block px-4 py-2.5 text-xs transition-colors hover:text-white hover:bg-[var(--border)]" style={{ color: "var(--muted)" }}>Design Qualification</a>
                    <a href="/fixtureops" className="block px-4 py-2.5 text-xs transition-colors hover:text-white hover:bg-[var(--border)]" style={{ color: "var(--muted)", borderTop: "1px solid var(--border)" }}>Production Fixtures</a>
                    <a href="/modernize" className="block px-4 py-2.5 text-xs transition-colors hover:text-white hover:bg-[var(--border)]" style={{ color: "var(--muted)", borderTop: "1px solid var(--border)" }}>Connect Existing Fixtures</a>
                  </li>
                </ul>
              </li>
              <li><a href="/about" className="transition-colors hover:text-white">About</a></li>
              <li><a href="/contact" className="transition-colors hover:text-white">Contact</a></li>
              <li>
                <a href="/fixtureops" className="btn-primary" style={{ padding: "0.375rem 0.875rem", fontSize: "0.8rem" }}>
                  Get a Fixture Estimate
                </a>
              </li>
            </ul>
          </nav>
        </header>

        <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-16">
          {children}
        </main>

        <footer style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
          <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-8">
            <div>
              <p className="font-semibold mb-3" style={{ color: "var(--foreground)" }}>INTenX</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                Custom Test Infrastructure.<br />
                Michigan City, IN 46360
              </p>
            </div>
            <div className="text-sm" style={{ color: "var(--muted)" }}>
              <a href="mailto:info@intenx.io"
                 className="transition-colors hover:opacity-80"
                 style={{ color: "var(--accent)" }}>
                info@intenx.io
              </a>
              <p className="mt-4">&copy; {new Date().getFullYear()} INTenX</p>
            </div>
          </div>
        </footer>
        <Analytics />

      </body>
    </html>
  );
}
