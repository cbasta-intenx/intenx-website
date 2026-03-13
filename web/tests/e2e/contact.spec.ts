import { test, expect } from "@playwright/test";

test("contact page renders form fields", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByLabel("Name")).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Message")).toBeVisible();
  await expect(page.getByLabel("Inquiry type")).toBeVisible();
  await expect(page.getByRole("button", { name: /Send message/i })).toBeVisible();
});

test("contact form requires name, email, and message", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: /Send message/i }).click();
  // HTML5 validation prevents submission — form stays on page
  await expect(page.getByRole("button", { name: /Send message/i })).toBeVisible();
});
