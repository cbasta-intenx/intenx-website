import { test, expect } from "@playwright/test";

test("configurator page loads with hero", async ({ page }) => {
  await page.goto("/fixtureops");
  await expect(page.getByRole("heading", { name: /Your test fixtures/i })).toBeVisible();
  await expect(page.getByText("Step 1 of 6")).toBeVisible();
});

test("configurator: Continue button disabled until selection made", async ({ page }) => {
  await page.goto("/fixtureops");
  const continueBtn = page.getByRole("button", { name: /Continue/i });
  await expect(continueBtn).toHaveCSS("opacity", "0.4");

  await page.getByRole("button", { name: "Functional test (FCT)" }).click();
  await expect(continueBtn).toHaveCSS("opacity", "1");
});

test("configurator: completes full flow and shows price range", async ({ page }) => {
  await page.goto("/fixtureops");

  // Step 1 — fixture type
  await page.getByRole("button", { name: "Functional test (FCT)" }).click();
  await page.getByRole("button", { name: /Continue/i }).click();

  // Step 2 — description (optional)
  await expect(page.getByText("Step 2 of 6")).toBeVisible();
  await page.getByRole("button", { name: /Continue/i }).click();

  // Step 3 — complexity (skip, no selections)
  await expect(page.getByText("Step 3 of 6")).toBeVisible();
  await page.getByRole("button", { name: /Continue/i }).click();

  // Step 4 — volume
  await expect(page.getByText("Step 4 of 6")).toBeVisible();
  await page.getByRole("button", { name: /1,000 – 10,000/i }).click();
  await page.getByRole("button", { name: /Continue/i }).click();

  // Step 5 — scope
  await expect(page.getByText("Step 5 of 6")).toBeVisible();
  await page.getByRole("button", { name: /Schematic \+ BOM/i }).click();
  await page.getByRole("button", { name: /Continue/i }).click();

  // Step 6 — timeline
  await expect(page.getByText("Step 6 of 6")).toBeVisible();
  await page.getByRole("button", { name: /1 – 3 months/i }).click();
  await page.getByRole("button", { name: /See estimate/i }).click();

  // Result — price range shown
  await expect(page.getByText("Fixture estimate", { exact: true })).toBeVisible();
  await expect(page.getByText(/\$\d/)).toBeVisible();
  await expect(page.getByRole("button", { name: /Send my estimate request/i })).toBeVisible();
});

test("configurator: RF + high voltage + regulatory triggers let's talk", async ({ page }) => {
  await page.goto("/fixtureops");

  // Step 1
  await page.getByRole("button", { name: "Functional test (FCT)" }).click();
  await page.getByRole("button", { name: /Continue/i }).click();

  // Step 2
  await page.getByRole("button", { name: /Continue/i }).click();

  // Step 3 — check RF, HV, regulatory
  await page.getByRole("button", { name: /RF \/ High-frequency/i }).click();
  await page.getByRole("button", { name: /High voltage/i }).click();
  await page.getByRole("button", { name: /Regulatory compliance/i }).click();
  await page.getByRole("button", { name: /Continue/i }).click();

  // Step 4
  await page.getByRole("button", { name: /1,000 – 10,000/i }).click();
  await page.getByRole("button", { name: /Continue/i }).click();

  // Step 5
  await page.getByRole("button", { name: /Schematic \+ BOM/i }).click();
  await page.getByRole("button", { name: /Continue/i }).click();

  // Step 6
  await page.getByRole("button", { name: /Flexible/i }).click();
  await page.getByRole("button", { name: /See estimate/i }).click();

  // Should show "let's talk"
  await expect(page.getByText(/Let's talk through this one/i)).toBeVisible();
});

test("configurator: $50K+ estimate triggers let's talk (ICT, high complexity)", async ({ page }) => {
  await page.goto("/fixtureops");

  // Step 1 — ICT (highest base price)
  await page.getByRole("button", { name: /Bed of nails/i }).click();
  await page.getByRole("button", { name: /Continue/i }).click();

  // Step 2 — skip description
  await page.getByRole("button", { name: /Continue/i }).click();

  // Step 3 — RF + High voltage (pushes well over $50K)
  await page.getByRole("button", { name: /RF \/ High-frequency/i }).click();
  await page.getByRole("button", { name: /High voltage/i }).click();
  await page.getByRole("button", { name: /Continue/i }).click();

  // Step 4
  await page.getByRole("button", { name: /50,000\+/i }).click();
  await page.getByRole("button", { name: /Continue/i }).click();

  // Step 5
  await page.getByRole("button", { name: /Schematic \+ BOM/i }).click();
  await page.getByRole("button", { name: /Continue/i }).click();

  // Step 6
  await page.getByRole("button", { name: /Flexible/i }).click();
  await page.getByRole("button", { name: /See estimate/i }).click();

  await expect(page.getByText(/Let's talk through this one/i)).toBeVisible();
});

test("configurator: 'not sure' with no description triggers let's talk", async ({ page }) => {
  await page.goto("/fixtureops");

  // Step 1 — Not sure
  await page.getByRole("button", { name: "Not sure" }).click();
  await page.getByRole("button", { name: /Continue/i }).click();

  // Step 2 — leave description blank
  await page.getByRole("button", { name: /Continue/i }).click();

  // Steps 3–6
  await page.getByRole("button", { name: /Continue/i }).click();
  await page.getByRole("button", { name: /1,000 – 10,000/i }).click();
  await page.getByRole("button", { name: /Continue/i }).click();
  await page.getByRole("button", { name: /Schematic \+ BOM/i }).click();
  await page.getByRole("button", { name: /Continue/i }).click();
  await page.getByRole("button", { name: /Flexible/i }).click();
  await page.getByRole("button", { name: /See estimate/i }).click();

  await expect(page.getByText(/Let's talk through this one/i)).toBeVisible();
});

test("configurator: disclaimer shown on price range result", async ({ page }) => {
  await page.goto("/fixtureops");

  await page.getByRole("button", { name: "Functional test (FCT)" }).click();
  await page.getByRole("button", { name: /Continue/i }).click();
  await page.getByRole("button", { name: /Continue/i }).click();
  await page.getByRole("button", { name: /Continue/i }).click();
  await page.getByRole("button", { name: /1,000 – 10,000/i }).click();
  await page.getByRole("button", { name: /Continue/i }).click();
  await page.getByRole("button", { name: /Schematic \+ BOM/i }).click();
  await page.getByRole("button", { name: /Continue/i }).click();
  await page.getByRole("button", { name: /Flexible/i }).click();
  await page.getByRole("button", { name: /See estimate/i }).click();

  await expect(page.getByText(/Estimate excludes specialty test equipment/i)).toBeVisible();
});

test("configurator: back button navigates to previous step", async ({ page }) => {
  await page.goto("/fixtureops");

  await page.getByRole("button", { name: "Functional test (FCT)" }).click();
  await page.getByRole("button", { name: /Continue/i }).click();
  await expect(page.getByText("Step 2 of 6")).toBeVisible();

  await page.getByRole("button", { name: /Back/i }).click();
  await expect(page.getByText("Step 1 of 6")).toBeVisible();
});
