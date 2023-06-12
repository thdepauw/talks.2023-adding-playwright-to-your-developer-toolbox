import { test, expect } from "@playwright/test";

test("should go to the home page", async ({ page }) => {
  await page.goto("/");
});
