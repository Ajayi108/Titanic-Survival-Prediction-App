import { test, expect } from "@playwright/test";

test("should load landing page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Iceberg-AI|Titanic/i);
});
