import { test, expect } from "@playwright/test";

// --- Contact form opt-in checkbox ---

test("contact form: marketing opt-in checkbox present and unchecked by default", async ({ page }) => {
  await page.goto("/contact");
  const checkbox = page.locator("#marketing_opt_in");
  await expect(checkbox).toBeVisible();
  await expect(checkbox).not.toBeChecked();
});

test("contact form: marketing opt-in checkbox can be checked", async ({ page }) => {
  await page.goto("/contact");
  const checkbox = page.locator("#marketing_opt_in");
  await checkbox.check();
  await expect(checkbox).toBeChecked();
  await checkbox.uncheck();
  await expect(checkbox).not.toBeChecked();
});

test("contact form: privacy policy link points to /privacy", async ({ page }) => {
  await page.goto("/contact");
  const link = page.locator('a[href="/privacy"]').first();
  await expect(link).toBeVisible();
});

// --- Configurator opt-in checkbox (appears on result step 7) ---

test("configurator: marketing opt-in checkbox present and unchecked by default on result step", async ({ page }) => {
  await page.goto("/fixtureops");

  // Navigate through all 6 steps to reach the result
  await page.getByRole("button", { name: "Functional test (FCT)" }).click();
  await page.getByRole("button", { name: /Continue/i }).click();
  await page.getByRole("button", { name: /Continue/i }).click();
  await page.getByRole("button", { name: /Continue/i }).click();
  await page.getByRole("button", { name: /1,000 – 10,000/i }).click();
  await page.getByRole("button", { name: /Continue/i }).click();
  await page.getByRole("button", { name: /Schematic \+ BOM/i }).click();
  await page.getByRole("button", { name: /Continue/i }).click();
  await page.getByRole("button", { name: /1 – 3 months/i }).click();
  await page.getByRole("button", { name: /See estimate/i }).click();

  const checkbox = page.locator("#fixture_marketing_opt_in");
  await expect(checkbox).toBeVisible();
  await expect(checkbox).not.toBeChecked();
});

test("configurator: privacy policy link present on result step", async ({ page }) => {
  await page.goto("/fixtureops");

  await page.getByRole("button", { name: "Functional test (FCT)" }).click();
  await page.getByRole("button", { name: /Continue/i }).click();
  await page.getByRole("button", { name: /Continue/i }).click();
  await page.getByRole("button", { name: /Continue/i }).click();
  await page.getByRole("button", { name: /1,000 – 10,000/i }).click();
  await page.getByRole("button", { name: /Continue/i }).click();
  await page.getByRole("button", { name: /Schematic \+ BOM/i }).click();
  await page.getByRole("button", { name: /Continue/i }).click();
  await page.getByRole("button", { name: /1 – 3 months/i }).click();
  await page.getByRole("button", { name: /See estimate/i }).click();

  const link = page.locator('a[href="/privacy"]').first();
  await expect(link).toBeVisible();
});

// --- Privacy page ---

test("GET /privacy returns 200", async ({ page }) => {
  const response = await page.goto("/privacy");
  expect(response?.status()).toBe(200);
});

test("privacy page contains INTenX and unsubscribe", async ({ page }) => {
  await page.goto("/privacy");
  const body = await page.content();
  expect(body).toMatch(/INTenX|Makanu/i);
  expect(body).toMatch(/unsubscribe/i);
});

// --- EC-22 extension: no compliance language as standalone page text ---

const publicRoutes = ["/", "/services", "/about", "/contact", "/fixtureops"];

for (const route of publicRoutes) {
  test(`${route} contains no standalone "unsubscribe required" or "opt-in required" text`, async ({ page }) => {
    await page.goto(route);
    const body = await page.content();
    expect(body).not.toMatch(/unsubscribe required/i);
    expect(body).not.toMatch(/opt-in required/i);
  });
}
