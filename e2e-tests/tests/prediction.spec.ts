import { test, expect } from "@playwright/test";

test.describe("Titanic Calculator Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8080/calculator");
    await expect(page.locator("h1.glitch")).toContainText("TITANIC.AI");
  });

  test("should display initial page and allow model selection", async ({
    page,
  }) => {
    await expect(page.locator(".subtitle")).toContainText(
      "Advanced machine learning models"
    );
    await expect(page.getByText("RANDOM FOREST")).toBeVisible();
    await expect(page.getByText("SUPPORT VECTOR MACHINE")).toBeVisible();

    await page.locator(".model-card").first().click();
    await expect(page.locator(".input-grid")).toBeVisible();
    await expect(page.locator(".model-info")).toContainText(
      "ACTIVE MODEL: RANDOM FOREST"
    );
  });

  test("should enable prediction button only when all inputs are filled", async ({
    page,
  }) => {
    await page.locator(".model-card").first().click();
    await expect(page.locator(".predict-btn")).toHaveClass(/disabled/);

    await fillAllInputs(page);
    await expect(page.locator(".predict-btn")).toHaveClass(/active/);
  });

  test("should reset all inputs when reset button is clicked", async ({
    page,
  }) => {
    await page.locator(".model-card").first().click();

    const classCell = page.locator(".input-cell").filter({ hasText: "CLASS" });
    await classCell.click();
    await classCell.getByText("First").click();
    await expect(classCell).toHaveClass(/filled/);

    await page.locator(".reset-btn").click();
    await expect(classCell).not.toHaveClass(/filled/);
  });

  test("should complete full prediction flow with Random Forest", async ({
    page,
  }) => {
    await page.locator(".model-card").first().click();
    await fillAllInputs(page);

    await page.locator(".predict-btn").click();

    // Wait for prediction computation to complete

    await expect(page.locator(".computing")).toBeVisible();
    await expect(page.locator(".computing")).not.toBeVisible({ timeout: 3000 });

    const resultPanel = page.locator(".result-panel");
    await expect(resultPanel).toBeVisible();
    await expect(resultPanel).toContainText(/Survived|Did not survive/);
    await expect(page.locator(".model-indicator")).toContainText(
      "RANDOM FOREST ANALYSIS"
    );
    await expect(page.locator(".probability")).toContainText("Confidence:");
  });

  test("should complete full prediction flow with SVM model", async ({
    page,
  }) => {
    await page.locator(".model-card").nth(1).click();
    await fillAllInputs(page);

    await page.locator(".predict-btn").click();
    await expect(page.locator(".computing")).not.toBeVisible({ timeout: 3000 });

    await expect(page.locator(".result-panel")).toBeVisible();
    await expect(page.locator(".model-indicator")).toContainText(
      "SVM ANALYSIS"
    );
  });

  test("should show explanation when clicking input fields", async ({
    page,
  }) => {
    await page.locator(".model-card").first().click();

    await page.locator(".input-cell").filter({ hasText: "CLASS" }).click();
    await expect(page.locator(".explanation-panel")).toBeVisible();
    await expect(page.locator(".explanation-panel h4")).toContainText("CLASS");

    await page.locator(".close-explanation").click();
    await expect(page.locator(".explanation-panel")).not.toBeVisible();
  });
});

// Helper function to fill all required inputs with valid test data

async function fillAllInputs(page) {
  const classCell = page.locator(".input-cell").filter({ hasText: "CLASS" });
  await classCell.click();
  await classCell.getByText("First").click();

  const sexCell = page.locator(".input-cell").filter({ hasText: "SEX" });
  await sexCell.click();
  await sexCell.getByText("Female").click();

  const ageCell = page.locator(".input-cell").filter({ hasText: "AGE" });
  await ageCell.click();
  await ageCell.getByPlaceholder("AGE").fill("28");

  const fareCell = page.locator(".input-cell").filter({ hasText: "FARE" });
  await fareCell.click();
  await fareCell.getByPlaceholder("FARE").fill("80");

  const aloneCell = page.locator(".input-cell").filter({ hasText: "ALONE" });
  await aloneCell.click();
  await aloneCell.getByText("No").click();

  const embarkCell = page
    .locator(".input-cell")
    .filter({ hasText: "EMBARKED" });
  await embarkCell.click();
  await embarkCell.getByText("Southampton").click();

  const titleCell = page.locator(".input-cell").filter({ hasText: "TITLE" });
  await titleCell.click();
  await titleCell.getByText("Mrs").click();
}
