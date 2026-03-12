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

export const metadata: Metadata = {
  title: "INTenX — Managed Production Test",
  description: "INTenX designs, builds, and manages production test fixtures — connected to a platform that gives your team real-time yield data, AI-assisted diagnostics, and remote support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
              <li><a href="/services" className="transition-colors hover:text-white">Services</a></li>
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
                Managed Production Test.<br />
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
