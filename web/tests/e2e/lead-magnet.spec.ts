/**
 * Lead magnet spec — /modernize/sample-report gated report page
 * SAMP-1 through SAMP-6 per intenx-website 2026-03-15 spec.
 *
 * SAMP-1 and SAMP-2 are skipped: post-submit state requires a live Resend
 * API key to reach "sent" status. Server action returns ok:false locally
 * (no API key), so the confirmation message is never shown. These tests
 * must be verified manually after production deploy with credentials set.
 *
 * Run with: BASE_URL=https://intenx.io npx playwright test tests/e2e/lead-magnet.spec.ts
 */
import { test, expect } from "@playwright/test";

// ── SAMP-1: Gate form submission → post-submit state ─────────────────────────

test.skip("SAMP-1: gate form submission shows post-submit confirmation", async ({ page }) => {
  // Skipped: sendSampleReportEmail server action requires RESEND_API_KEY.
  // Without it, the action returns ok:false and the "sent" state is never shown.
  // Verify manually on production: fill form, submit, expect
  // "Check your inbox — the report is on its way to <email>" to be visible.
  await page.goto("/modernize/sample-report");
  await page.locator('input[type="text"]').first().fill("Test");
  await page.locator('input[type="email"]').fill("test@example.com");
  await page.locator('input[type="text"]').last().fill("Acme Corp");
  await page.getByRole("button", { name: "Send me the report" }).click();
  await expect(page.getByText(/Check your inbox/)).toBeVisible();
  await expect(page.getByText(/on its way to test@example.com/)).toBeVisible();
});

// ── SAMP-2: Post-submit back link ─────────────────────────────────────────────

test.skip("SAMP-2: post-submit link navigates back to /modernize", async ({ page }) => {
  // Skipped: depends on SAMP-1 reaching "sent" state (requires live Resend).
  await page.goto("/modernize/sample-report");
  await page.locator('input[type="text"]').first().fill("Test");
  await page.locator('input[type="email"]').fill("test@example.com");
  await page.locator('input[type="text"]').last().fill("Acme Corp");
  await page.getByRole("button", { name: "Send me the report" }).click();
  await page.getByRole("link", { name: /Back to \/modernize/i }).click();
  await expect(page).toHaveURL(/\/modernize$/);
});

// ── SAMP-3: Form validation ───────────────────────────────────────────────────

test("SAMP-3: form blocks submission with empty or invalid fields", async ({ page }) => {
  await page.goto("/modernize/sample-report");

  const submitBtn = page.getByRole("button", { name: "Send me the report" });
  await expect(submitBtn).toBeVisible();

  // Empty submit: HTML required validation prevents submission
  await submitBtn.click();
  // Form should still be visible (not replaced by confirmation)
  await expect(submitBtn).toBeVisible();

  // Fill name and email, leave company empty — still blocked
  await page.locator('input[type="text"]').first().fill("Test");
  await page.locator('input[type="email"]').fill("test@example.com");
  await submitBtn.click();
  await expect(submitBtn).toBeVisible();

  // Invalid email format — browser validation blocks
  await page.locator('input[type="email"]').fill("notanemail");
  await page.locator('input[type="text"]').last().fill("Acme Corp");
  await submitBtn.click();
  await expect(submitBtn).toBeVisible();
});

// ── SAMP-4: Full report page — loads + noindex ────────────────────────────────

test("SAMP-4: /modernize/sample-report/full renders and is noindex", async ({ page }) => {
  const res = await page.goto("/modernize/sample-report/full");
  expect(res?.status()).toBe(200);

  // Full report content renders (no gate)
  await expect(page.getByRole("button", { name: "Send me the report" })).not.toBeVisible();

  // noindex meta tag present
  const robots = await page.locator('meta[name="robots"]').getAttribute("content");
  expect(robots).toMatch(/noindex/i);
});

// ── SAMP-5: Teaser preview + fade ─────────────────────────────────────────────

test("SAMP-5: teaser preview shows report content with fade at bottom", async ({ page }) => {
  await page.goto("/modernize/sample-report");

  // Page loads with correct H1
  await expect(page.getByRole("heading", { name: /See what a Modernization Readiness Report looks like/i })).toBeVisible();

  // Exec summary context line
  await expect(page.getByText(/The fixtures are mechanically sound\. The digital layer is not\./i)).toBeVisible();

  // Connectivity gap table — look for a known gap row
  await expect(page.getByText("Structured test data export")).toBeVisible();

  // Phase 1 Investment Summary table — bold total row
  await expect(page.getByText("Phase 1 one-time total")).toBeVisible();

  // Fade overlay present (absolute positioned div with gradient, pointer-events-none)
  await expect(page.locator('.pointer-events-none[style*="linear-gradient"]')).toBeAttached();

  // "The full report covers..." teaser line visible below the fade
  await expect(page.getByText(/The full report covers/i)).toBeVisible();
});

// ── SAMP-6: /modernize has link to sample report ──────────────────────────────

test("SAMP-6: /modernize page has download sample assessment link", async ({ page }) => {
  await page.goto("/modernize");

  // CTA block present
  await expect(page.getByText(/Want to see what a full Readiness Report looks like/i)).toBeVisible();

  // Link to sample-report
  await expect(page.locator('a[href="/modernize/sample-report"]').filter({
    hasText: /Download a sample assessment/i,
  })).toBeVisible();
});
