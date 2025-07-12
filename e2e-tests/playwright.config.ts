// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: "http://localhost:8080",
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
});
