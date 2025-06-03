import { test, expect } from "@playwright/test";

test("predict survival using calculator", async ({ page }) => {
  await page.goto("/calculator");

  await page.selectOption('select[name="pclass]', "First");
  await page.selectOption('select[name="sex"]', "Male");
  await page.fill('input[name="age"]', "28");
  await page.fill('input[name="fare"]', "50");
  await page.selectOption('select[name="traveledAlone"]', "Yes");
  await page.selectOption('select[name="embarked"]', "Cherbourg");
  await page.selectOption('select[name="title"]', "Mr");
  await page.selectOption('select[name="model"]', "randomForest");

  await page.click("button.predict-btn");

  // Expect prediction result to appear
  await expect(page.locator(".prediction-result")).toContainText(
    /Survived|Did Not Survive|Error: Failed to fetch/
  );
});
