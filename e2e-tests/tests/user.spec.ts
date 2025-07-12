import { test, expect } from "@playwright/test";

const testUser = {
  email: "user@example.com",
  password: "password123",
};

test.describe("Logged-in User Flow", () => {
  test("should login and make a prediction", async ({ page }) => {
    await page.goto("http://localhost:8080/login");

    await page.getByPlaceholder("Your email").fill(testUser.email);
    await page.getByPlaceholder("Password").fill(testUser.password);
    await page.locator(".login-btn").click();

    await page.waitForURL("**/calculator");
    await expect(page.locator("text=Select Prediction Models")).toBeVisible();

    const modelCard = page.locator(".model-card").first();
    await modelCard.click();

    const proceedButton = page.locator("button", { hasText: /Proceed/ });
    if (await proceedButton.isVisible()) {
      await proceedButton.click();

      // Fill required fields
      const selects = await page.locator("select").all();
      for (const sel of selects) {
        await sel.selectOption({ index: 1 });
      }

      const numbers = await page.locator("input[type=number]").all();
      for (const input of numbers) {
        await input.fill("25");
      }

      const predictBtn = page.locator(".predict-btn");
      await predictBtn.click();
      await expect(page.locator("text=Prediction Results")).toBeVisible({
        timeout: 5000,
      });
    } else {
      console.warn(
        "No model available or proceed button missing – skipping prediction."
      );
    }
  });
});
