import { test, expect } from "@playwright/test";

test("should find the next 3 group rides on the landing page", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("close preview warning").click();

  await expect(page.getByRole("heading", { name: "Next Group Rides" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Wachtebeke Explorer Tour" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Puyenbroek Green Mtb track" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Blaarmeersen Skatepark" })).toBeVisible();
});

test("should find the first 3 group rides on the group rides page", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("close preview warning").click();
  const searchResultPromise = page.waitForResponse("**/groupRide.search*");
  await page.getByRole("link", { name: "Group Rides", exact: true }).click();

  const response = await searchResultPromise;
  expect(response.status()).toBe(200);
  await expect(page.getByRole("heading", { name: "Group Rides" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Wachtebeke Explorer Tour" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Puyenbroek Green Mtb track" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Blaarmeersen Skatepark" })).toBeVisible();
});

test("should show no group rides available when no data is returned", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("close preview warning").click();

  await page.route("**/groupRide.search*", async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify([
        {
          result: {
            data: {
              json: [],
              meta: {},
            },
          },
        },
      ]),
    });
  });
  const searchResultPromise = page.waitForResponse("**/groupRide.search*");
  await page.getByRole("link", { name: "Group Rides", exact: true }).click();
  await searchResultPromise;

  await expect(page.getByRole("heading", { name: "Group Rides" })).toBeVisible();
});
