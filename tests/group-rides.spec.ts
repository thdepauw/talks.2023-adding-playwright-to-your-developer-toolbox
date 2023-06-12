import { test, expect } from "@playwright/test";

test("should see the details of a group ride and be able to join and leave", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "close preview warning" }).click();
  // Login
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByLabel("Email address").fill("jsvalley@floatrides.com");
  await page.getByLabel("Password").fill("#1*w1vyBJis!FwC*Shc0");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByTestId("index")).toContainText("index");

  // open group ride details
  await page.getByRole("heading", { name: "Puyenbroek Green Mtb track" }).click();
  await expect(page.getByTestId("group-rides-id")).toContainText("group-rides-id");

  // Validate group ride details
  await expect(page.getByText("14:00")).toBeVisible();
  await expect(page.getByText("02/05/2024")).toBeVisible();
  await expect(page.getByText("11 km")).toBeVisible();
  await expect(page.getByText("Urban Trails")).toBeVisible();
  await expect(page.getByText("120 min")).toBeVisible();
  await expect(page.getByText("Puyenbroek, Wachtebeke")).toBeVisible();
  await expect(page.getByText("Ride the green mtb track in Puyenbroek. This consists of different terrain and i")).toBeVisible();

  // Join group ride
  await page.getByRole("button", { name: "Join" }).click();
  await page.getByRole("img", { name: "jsvalley" }).click();

  // Leave group ride
  await page.getByRole("button", { name: "Leave" }).click();
  await expect(page.getByText("Be the first to join!")).toBeVisible();
});
