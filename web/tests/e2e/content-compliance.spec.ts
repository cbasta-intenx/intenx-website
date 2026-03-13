import { test, expect } from "@playwright/test";

const routes = ["/", "/services", "/about", "/fixtureops", "/contact"];

// No lead time language on any page
for (const route of routes) {
  test(`${route} contains no lead time language`, async ({ page }) => {
    await page.goto(route);
    const body = await page.locator("body").innerText();
    expect(body).not.toMatch(/\blead time\b/i);
    expect(body).not.toMatch(/\bweeks?\b/i);
    expect(body).not.toMatch(/\bdelivery date\b/i);
  });
}

// No RTGF references on any page
for (const route of routes) {
  test(`${route} contains no RTGF references`, async ({ page }) => {
    await page.goto(route);
    const body = await page.locator("body").innerText();
    expect(body).not.toContain("RTGF");
  });
}
