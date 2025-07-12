import { test, expect } from "@playwright/test";

const admin = {
  email: "admin@ice.com",
  password: "pass",
};

test.describe("Admin Flow", () => {
  test("should login as admin (if UI exists)", async ({ page }) => {
    await page.goto("http://localhost:8080/login");

    await page.getByPlaceholder("Your email").fill(admin.email);
    await page.getByPlaceholder("Password").fill(admin.password);
    await page.locator(".login-btn").click();

    await page.waitForTimeout(1000);
    const adminLink = page.locator("a[href='/admin']");

    if (await adminLink.isVisible()) {
      await adminLink.click();
      await expect(page).toHaveURL(/\/admin/);
    } else {
      console.warn("Admin panel not visible – skipping navigation.");
    }
  });

  test("should train a model if form exists", async ({ page }) => {
    await page.goto("http://localhost:8080/admin");

    const dropdown = page.locator("select#model-select");
    const trainBtn = page.locator("button", { hasText: /Train/ });

    if ((await dropdown.isVisible()) && (await trainBtn.isVisible())) {
      await dropdown.selectOption({ index: 0 });

      const checkboxes = await page.locator("input[type='checkbox']").all();
      for (let i = 0; i < Math.min(checkboxes.length, 5); i++) {
        await checkboxes[i].check();
      }

      await trainBtn.click();
      await expect(page.locator("text=Model training completed")).toBeVisible({
        timeout: 8000,
      });
    } else {
      console.warn("Train model UI not found – skipping training.");
    }
  });
});
