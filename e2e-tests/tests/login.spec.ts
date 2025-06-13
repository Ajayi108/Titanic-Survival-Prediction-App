import { test, expect } from "@playwright/test";

const funFacts = [
  "The Titanic was the largest moving man-made object of its time.",
  "It took about 3 million rivets to hold the Titanic together.",
  "There were only 20 lifeboats on board, enough for half the passengers.",
  "The Titanic had its own onboard newspaper: 'Atlantic Daily Bulletin'.",
  "The ship broke in two pieces as it sank.",
  "The wreck was discovered in 1985, 73 years after it sank.",
];

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8080/login");
    await expect(page.locator("h2")).toContainText("Sign in");
  });

  test("should display all page elements correctly", async ({ page }) => {
    await expect(page.locator(".background-video")).toBeVisible();
    await expect(page.locator(".login-box")).toBeVisible();
    await expect(page.locator(".fact-box")).toBeVisible();

    await expect(page.getByPlaceholder("Your email")).toBeVisible();
    await expect(page.getByPlaceholder("Password")).toBeVisible();
    await expect(page.locator("input[type='checkbox']")).toBeVisible();
    await expect(page.getByText("Keep me signed in")).toBeVisible();
    await expect(page.getByText("Forgot password?")).toBeVisible();
    await expect(page.locator(".login-btn")).toBeVisible();
  });

  test("should display random fun fact", async ({ page }) => {
    const factText = await page.locator(".fact-box p").textContent();
    expect(funFacts).toContain(factText);

    await expect(page.locator(".fact-box h3")).toContainText("Did You Know?");
  });

  test("should allow user to fill login form", async ({ page }) => {
    await page.getByPlaceholder("Your email").fill("user@example.com");
    await page.getByPlaceholder("Password").fill("password123");

    await expect(page.getByPlaceholder("Your email")).toHaveValue(
      "user@example.com"
    );
    await expect(page.getByPlaceholder("Password")).toHaveValue("password123");
  });

  test("should handle checkbox interaction", async ({ page }) => {
    const checkbox = page.locator("input[type='checkbox']");

    await expect(checkbox).not.toBeChecked();
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  });

  test("should handle form submission", async ({ page }) => {
    await fillLoginForm(page);

    await page.locator(".login-btn").click();
  });

  test("should navigate to signup page when clicking sign up link", async ({
    page,
  }) => {
    await expect(page.locator(".login-footer")).toContainText(
      "Don't have an account?"
    );

    const signupLink = page.locator(".login-footer .login-link");
    await expect(signupLink).toContainText("Sign up");
    await expect(signupLink).toHaveAttribute("href", "/Signup");
  });

  test("should handle forgot password link", async ({ page }) => {
    const forgotLink = page.getByText("Forgot password?");
    await expect(forgotLink).toBeVisible();
    await expect(forgotLink).toHaveAttribute("href", "#");
  });
});

// Helper function to fill the complete login form with test data

async function fillLoginForm(page) {
  await page.getByPlaceholder("Your email").fill("test@example.com");
  await page.getByPlaceholder("Password").fill("testPassword123");
}
