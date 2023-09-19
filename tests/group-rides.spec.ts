import { test, expect } from "@playwright/test";

test("should see the details of a group ride and be able to join and leave", async ({ page }) => {
  await page.goto("/");

  // navigatie naar de details
  await page.getByRole("heading", { name: "Puyenbroek Green Mtb track" }).click();
  await expect(page.getByTestId("group-rides-id")).toContainText("group-rides-id");

  // Validatie group ride data
  await expect(page.getByRole("heading", { name: "Puyenbroek Green Mtb track" })).toBeVisible();
  await expect(page.getByText("By john.test")).toBeVisible();
  await expect(page.getByText("02/05/2024")).toBeVisible();
  await expect(page.getByText("14:00")).toBeVisible();
  await expect(page.getByText("120 min")).toBeVisible();
  await expect(page.getByText("Urban Trails")).toBeVisible();
  await expect(page.getByText("11 km")).toBeVisible();
  await expect(page.getByRole("link", { name: "Puyenbroek, Wachtebeke" })).toBeVisible();
  await expect(page.getByText("Be the first to join!")).toBeVisible();

  // Join a ride
  await page.getByRole("button", { name: "Join" }).click();
  await expect(page.getByRole("img", { name: "jsvalley" })).toBeVisible();
  await expect(page.getByText("1 Joined")).toBeVisible();

  // Leave ride
  await page.getByRole("button", { name: "Leave" }).click();
  await expect(page.getByText("Be the first to join!")).toBeVisible();
});
