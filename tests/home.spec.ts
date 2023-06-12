import { test, expect } from "@playwright/test";

test("should go to the home page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "close preview warning" }).click();

  await expect(page.getByRole("heading", { name: "Upcoming Group Rides" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Wachtebeke Explorer Tour" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Puyenbroek Green Mtb track" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Blaarmeersen Skatepark" })).toBeVisible();
});
