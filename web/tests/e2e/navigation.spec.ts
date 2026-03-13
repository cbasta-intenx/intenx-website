import { test, expect } from "@playwright/test";

const routes = ["/", "/services", "/about", "/contact", "/fixtureops"];

for (const route of routes) {
  test(`${route} returns 200 and has INTenX nav`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("link", { name: "INTenX" }).first()).toBeVisible();
  });
}

test("nav links all resolve without 404", async ({ page }) => {
  await page.goto("/");
  const navLinks = ["/services", "/about", "/contact"];
  for (const href of navLinks) {
    const res = await page.goto(href);
    expect(res?.status()).toBe(200);
  }
});
