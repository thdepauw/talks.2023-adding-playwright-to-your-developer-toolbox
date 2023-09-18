import { test, expect } from "@playwright/test";

test("should show the first 3 upcoming rides", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("close preview warning").click();

  await expect(page.getByRole("heading", { name: "Next Group Rides" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Wachtebeke Explorer Tour" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Puyenbroek Green Mtb track" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Blaarmeersen Skatepark" })).toBeVisible();
});

test("should show all available rides", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("close preview warning").click();

  const searchResultPromise = page.waitForResponse("**/groupRide.search*");
  await page.getByRole("link", { name: "Group Rides", exact: true }).click();

  const response = await searchResultPromise;
  expect(response.status()).toBe(200);
  const responseData = await response.json();
  console.log("🚀 ~ responseData:", responseData[0].result.data.json);

  await expect(page.getByRole("heading", { name: "Wachtebeke Explorer Tour" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Puyenbroek Green Mtb track" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Blaarmeersen Skatepark" })).toBeVisible();
});

test("should show no ride available when no data is returned", async ({ page }) => {
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
  await page.getByRole("link", { name: "Group Rides", exact: true }).click();
});
