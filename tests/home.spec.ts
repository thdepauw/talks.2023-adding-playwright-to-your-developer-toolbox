import { test, expect } from "@playwright/test";

test("should work", async ({ page }) => {
  await page.goto("/");
});
