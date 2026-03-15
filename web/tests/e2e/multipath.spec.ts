/**
 * Multi-path feature spec — feature/multipath branch.
 * All routes, tiles, nav, and contact form pre-selection are implemented.
 */
import { test, expect } from "@playwright/test";

// MP-1: /qualify route exists
test("MP-1: /qualify returns 200", async ({ page }) => {
  const res = await page.goto("/qualify");
  expect(res?.status()).toBe(200);
});

// MP-2: /modernize route exists
test("MP-2: /modernize returns 200", async ({ page }) => {
  const res = await page.goto("/modernize");
  expect(res?.status()).toBe(200);
});

// MP-3: Homepage has three routing tiles
test("MP-3: homepage has three routing tiles", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Fixtures on the floor with no visibility?")).toBeVisible();
  await expect(page.getByText("Ready to go to production?")).toBeVisible();
  await expect(page.getByText("Qualifying a new hardware design?")).toBeVisible();
});

// MP-4: Homepage tiles link to correct routes
test("MP-4: homepage tiles link to /qualify, /fixtureops, /modernize", async ({ page }) => {
  await page.goto("/");
  // Tiles in main content (not nav) — use first matching link per route
  await expect(page.locator('main a[href="/qualify"]').first()).toBeVisible();
  await expect(page.locator('main a[href="/fixtureops"]').first()).toBeVisible();
  await expect(page.locator('main a[href="/modernize"]').first()).toBeVisible();
});

// MP-5: Solutions nav dropdown — verify label exists and all three paths are in DOM
test("MP-5: nav contains Solutions label and dropdown links to all three paths", async ({ page }) => {
  await page.goto("/");
  // Solutions is a <span>, not a link — check text presence in nav
  await expect(page.locator("nav").getByText("Solutions")).toBeVisible();
  // Dropdown links are inside a nested <ul> within the Solutions <li>
  // The CTA button (also in nav) shares /fixtureops href — scope to nested list only
  await expect(page.locator('nav li ul a[href="/qualify"]')).toBeAttached();
  await expect(page.locator('nav li ul a[href="/fixtureops"]')).toBeAttached();
  await expect(page.locator('nav li ul a[href="/modernize"]')).toBeAttached();
});

// MP-6: Contact form has new inquiry types
test("MP-6: contact form has Design Qualification and Connect Existing Fixtures inquiry types", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.locator('#inquiry_type option:has-text("Design Qualification")')).toBeAttached();
  await expect(page.locator('#inquiry_type option:has-text("Connect Existing Fixtures")')).toBeAttached();
});

// MP-7: Contact form URL param pre-selection
test("MP-7a: /contact?inquiry=qualify pre-selects Design Qualification", async ({ page }) => {
  await page.goto("/contact?inquiry=qualify");
  const selected = await page.locator("#inquiry_type").inputValue();
  expect(selected).toMatch(/Design Qualification/i);
});

test("MP-7b: /contact?inquiry=modernize pre-selects Connect Existing Fixtures", async ({ page }) => {
  await page.goto("/contact?inquiry=modernize");
  const selected = await page.locator("#inquiry_type").inputValue();
  expect(selected).toMatch(/Connect Existing Fixtures/i);
});

// MP-8: Sitemap includes new routes
test("MP-8: sitemap.xml includes /qualify and /modernize", async ({ page }) => {
  await page.goto("/sitemap.xml");
  const body = await page.content();
  expect(body).toContain("https://intenx.io/qualify");
  expect(body).toContain("https://intenx.io/modernize");
});

// MP-9: /qualify page content
test("MP-9: /qualify page content and CTA", async ({ page }) => {
  await page.goto("/qualify");
  await expect(page.getByRole("heading", { name: /Test fixtures for design validation/i })).toBeVisible();
  await expect(page.getByText(/production fixture/i).first()).toBeVisible();
  await expect(page.locator('a[href="/contact?inquiry=qualify"]')).toBeVisible();
});

// MP-10: /modernize page content
test("MP-10: /modernize page content and CTA", async ({ page }) => {
  await page.goto("/modernize");
  await expect(page.getByRole("heading", { name: /Fixtures on the floor\. Finally visible\./i })).toBeVisible();
  await expect(page.getByText(/no rip.and.replace|without replacing/i)).toBeVisible();
  await expect(page.locator('a[href="/contact?inquiry=modernize"]')).toBeVisible();
});

// MP-11: Content compliance on new routes
test("MP-11: /qualify and /modernize — no lead time language or RTGF", async ({ page }) => {
  for (const route of ["/qualify", "/modernize"]) {
    await page.goto(route);
    const body = await page.content();
    expect(body).not.toMatch(/week\(s\)|lead time/i);
    expect(body).not.toMatch(/RTGF/i);
  }
});

// MP-12: SEO on new routes
test("MP-12: /qualify and /modernize — SEO metadata present", async ({ page }) => {
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
