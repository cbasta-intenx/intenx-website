import { test, expect } from "@playwright/test";

const routes = ["/", "/services", "/about", "/contact", "/fixtureops"];

// --- Metadata: title and description on all routes ---
for (const route of routes) {
  test(`${route} has non-empty <title>`, async ({ page }) => {
    await page.goto(route);
    const title = await page.title();
    expect(title.trim().length).toBeGreaterThan(0);
    expect(title).not.toBe("Create Next App");
  });

  test(`${route} has meta description`, async ({ page }) => {
    await page.goto(route);
    const desc = await page.locator('meta[name="description"]').getAttribute("content");
    expect(desc).toBeTruthy();
    expect(desc!.trim().length).toBeGreaterThan(0);
  });

  test(`${route} has canonical link`, async ({ page }) => {
    await page.goto(route);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toBeTruthy();
  });
}

// --- OG tags (home page carries og:title from layout) ---
test("home page has og:title", async ({ page }) => {
  await page.goto("/");
  const ogTitle = await page.locator('meta[property="og:title"]').getAttribute("content");
  expect(ogTitle).toBeTruthy();
  expect(ogTitle!.trim().length).toBeGreaterThan(0);
});

// --- sitemap.xml ---
test("GET /sitemap.xml returns 200 and contains <urlset>", async ({ page }) => {
  const response = await page.goto("/sitemap.xml");
  expect(response?.status()).toBe(200);
  const body = await page.content();
  expect(body).toContain("urlset");
  expect(body).toContain("https://intenx.io");
});

// --- robots.txt ---
test("GET /robots.txt returns 200 with sitemap and api disallow", async ({ page }) => {
  const response = await page.goto("/robots.txt");
  expect(response?.status()).toBe(200);
  const body = await page.content();
  expect(body).toContain("Sitemap:");
  expect(body).toContain("/api/");
});

test("robots.txt does not block AI crawlers", async ({ page }) => {
  await page.goto("/robots.txt");
  const body = await page.content();
  // These crawlers must remain accessible for AI search citation
  for (const bot of ["GPTBot", "PerplexityBot", "ClaudeBot", "Googlebot"]) {
    // Verify no "Disallow: /" rule follows a User-agent line for these bots
    expect(body).not.toMatch(new RegExp(`User-agent: ${bot}[\\s\\S]{0,50}Disallow: \\/[^a]`));
  }
});

// --- /llms.txt ---
test("GET /llms.txt returns 200", async ({ page }) => {
  const response = await page.goto("/llms.txt");
  expect(response?.status()).toBe(200);
  const body = await page.content();
  expect(body).toContain("INTenX");
});

// --- JSON-LD on home page ---
test("home page contains Organization JSON-LD with correct url", async ({ page }) => {
  await page.goto("/");
  const ldJson = await page.locator('script[type="application/ld+json"]').textContent();
  expect(ldJson).toBeTruthy();
  const parsed = JSON.parse(ldJson!);
  expect(parsed["@type"]).toBe("Organization");
  expect(parsed["url"]).toBe("https://intenx.io");
});

// --- Heading hierarchy ---
for (const route of routes) {
  test(`${route} has exactly one <h1>`, async ({ page }) => {
    await page.goto(route);
    const h1s = await page.locator("h1").count();
    expect(h1s).toBe(1);
  });
}
