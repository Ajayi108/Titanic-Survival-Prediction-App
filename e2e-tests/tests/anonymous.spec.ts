import { test, expect } from "@playwright/test";

test.describe("Anonymous User Flow", () => {
  test("should visit calculator page and view inputs", async ({ page }) => {
    await page.goto("http://localhost:8080/calculator");
    await expect(page).toHaveTitle(/Predictanic/i);
    await expect(page.locator("text=Anonymous Prediction")).toBeVisible();
  });
});
