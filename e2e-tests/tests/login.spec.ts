import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8080/login");
  });

  test("should display email and password fields", async ({ page }) => {
    await expect(page.getByPlaceholder("Your email")).toBeVisible();
    await expect(page.getByPlaceholder("Password")).toBeVisible();
  });

  test("should allow user to fill and submit login form", async ({ page }) => {
    await page.getByPlaceholder("Your email").fill("test@example.com");
    await page.getByPlaceholder("Password").fill("test1234");
    await page.locator(".login-btn").click();

    await page.waitForTimeout(1000); // avoid false failure due to fast redirect
    await expect(page).toHaveURL(/\/calculator|\/dashboard|\/$/);
  });
});
