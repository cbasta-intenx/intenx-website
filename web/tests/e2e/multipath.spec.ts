/**
 * Multi-path feature spec — baseline failures documented pre-feature/multipath branch.
 * All tests marked test.fail() are EXPECTED TO FAIL on feature/phase2-content.
 * When feature/multipath lands, remove the test.fail() calls — every test should pass.
 * Run with: BASE_URL=<preview-url> npx playwright test tests/e2e/multipath.spec.ts
 */
import { test, expect } from "@playwright/test";

// MP-1: /qualify route exists
test("MP-1: /qualify returns 200", async ({ page }) => {
  test.fail(); // EXPECTED FAIL — pre-multipath: /qualify not yet implemented
  const res = await page.goto("/qualify");
  expect(res?.status()).toBe(200);
});

// MP-2: /modernize route exists
test("MP-2: /modernize returns 200", async ({ page }) => {
  test.fail(); // EXPECTED FAIL — pre-multipath: /modernize not yet implemented
  const res = await page.goto("/modernize");
  expect(res?.status()).toBe(200);
});

// MP-3: Homepage has three routing tiles
test("MP-3: homepage has three routing tiles", async ({ page }) => {
  test.fail(); // EXPECTED FAIL — pre-multipath: routing tiles not yet on homepage
  await page.goto("/");
  await expect(page.getByText("Qualifying a new hardware design?")).toBeVisible();
  await expect(page.getByText("Ready to go to production?")).toBeVisible();
  await expect(page.getByText("Fixtures already on the floor?")).toBeVisible();
});

// MP-4: Homepage tiles link to correct routes
test("MP-4: homepage tiles link to /qualify, /fixtureops, /modernize", async ({ page }) => {
  test.fail(); // EXPECTED FAIL — pre-multipath: routing tiles not yet on homepage
  await page.goto("/");
  await expect(page.locator('a[href="/qualify"]')).toBeVisible();
  await expect(page.locator('a[href="/fixtureops"]')).toBeVisible();
  await expect(page.locator('a[href="/modernize"]')).toBeVisible();
});

// MP-5: Solutions nav dropdown
test("MP-5: nav contains Solutions dropdown linking to all three paths", async ({ page }) => {
  test.fail(); // EXPECTED FAIL — pre-multipath: Solutions nav dropdown not yet implemented
  await page.goto("/");
  await expect(page.getByRole("link", { name: /Solutions/i })).toBeVisible();
  await expect(page.locator('nav a[href="/qualify"]')).toBeVisible();
  await expect(page.locator('nav a[href="/fixtureops"]')).toBeVisible();
  await expect(page.locator('nav a[href="/modernize"]')).toBeVisible();
});

// MP-6: Contact form has new inquiry types
test("MP-6: contact form has Design Qualification and Connect Existing Fixtures inquiry types", async ({ page }) => {
  test.fail(); // EXPECTED FAIL — pre-multipath: new inquiry types not yet in contact form
  await page.goto("/contact");
  await expect(page.locator('#inquiry_type option:has-text("Design Qualification")')).toBeAttached();
  await expect(page.locator('#inquiry_type option:has-text("Connect Existing Fixtures")')).toBeAttached();
});

// MP-7: Contact form URL param pre-selection
test("MP-7a: /contact?inquiry=qualify pre-selects Design Qualification", async ({ page }) => {
  test.fail(); // EXPECTED FAIL — pre-multipath: URL param pre-selection not yet implemented
  await page.goto("/contact?inquiry=qualify");
  const selected = await page.locator("#inquiry_type").inputValue();
  expect(selected).toMatch(/Design Qualification/i);
});

test("MP-7b: /contact?inquiry=modernize pre-selects Connect Existing Fixtures", async ({ page }) => {
  test.fail(); // EXPECTED FAIL — pre-multipath: URL param pre-selection not yet implemented
  await page.goto("/contact?inquiry=modernize");
  const selected = await page.locator("#inquiry_type").inputValue();
  expect(selected).toMatch(/Connect Existing Fixtures/i);
});

// MP-8: Sitemap includes new routes
test("MP-8: sitemap.xml includes /qualify and /modernize", async ({ page }) => {
  test.fail(); // EXPECTED FAIL — pre-multipath: new routes not yet in sitemap
  await page.goto("/sitemap.xml");
  const body = await page.content();
  expect(body).toContain("https://intenx.io/qualify");
  expect(body).toContain("https://intenx.io/modernize");
});

// MP-9: /qualify page content
test("MP-9: /qualify page content and CTA", async ({ page }) => {
  test.fail(); // EXPECTED FAIL — pre-multipath: /qualify not yet implemented
  await page.goto("/qualify");
  await expect(page.getByRole("heading", { name: /Test fixtures for design validation/i })).toBeVisible();
  await expect(page.getByText(/production fixture/i)).toBeVisible();
  await expect(page.locator('a[href="/contact?inquiry=qualify"]')).toBeVisible();
});

// MP-10: /modernize page content
test("MP-10: /modernize page content and CTA", async ({ page }) => {
  test.fail(); // EXPECTED FAIL — pre-multipath: /modernize not yet implemented
  await page.goto("/modernize");
  await expect(page.getByRole("heading", { name: /Your fixtures\. Connected\./i })).toBeVisible();
  await expect(page.getByText(/no rip.and.replace|without replacing/i)).toBeVisible();
  await expect(page.locator('a[href="/contact?inquiry=modernize"]')).toBeVisible();
});

// MP-11: Content compliance on new routes — skipped until routes exist
// When feature/multipath lands, move these assertions into content-compliance.spec.ts
test.skip("MP-11: /qualify and /modernize — no lead time language or RTGF", async ({ page }) => {
  for (const route of ["/qualify", "/modernize"]) {
    await page.goto(route);
    const body = await page.content();
    expect(body).not.toMatch(/week\(s\)|lead time/i);
    expect(body).not.toMatch(/RTGF/i);
  }
});

// MP-12: SEO on new routes — skipped until routes exist
// When feature/multipath lands, move these assertions into seo.spec.ts
test.skip("MP-12: /qualify and /modernize — SEO metadata present", async ({ page }) => {
  for (const route of ["/qualify", "/modernize"]) {
    await page.goto(route);
    const title = await page.title();
    expect(title.trim().length).toBeGreaterThan(0);
    const desc = await page.locator('meta[name="description"]').getAttribute("content");
    expect(desc).toBeTruthy();
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toBeTruthy();
  }
});
