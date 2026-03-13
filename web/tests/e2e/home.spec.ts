import { test, expect } from "@playwright/test";

test("home page loads with correct hero content", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Managed Production Test/i })).toBeVisible();
  await expect(page.getByText(/Built for Hardware Companies/i)).toBeVisible();
});

test("home page CTA links to /fixtureops", async ({ page }) => {
  await page.goto("/");
  const cta = page.getByRole("link", { name: /Get a Fixture Estimate/i }).first();
  await expect(cta).toHaveAttribute("href", "/fixtureops");
});

test("three pillars are visible", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Fixed-price fixtures")).toBeVisible();
  await expect(page.getByText("Connected platform")).toBeVisible();
  await expect(page.getByText("Managed lifecycle")).toBeVisible();
});
