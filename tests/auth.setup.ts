import { test, expect } from "@playwright/test";

test("should work", async ({ page }) => {
  await page.goto("/");
  // Login
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByLabel("Email address").fill("jsvalley@floatrides.com");
  await page.getByLabel("Password").fill("#1*w1vyBJis!FwC*Shc0");
  await page.getByRole("button", { name: "Continue", exact: true }).click();

  // wait for redirect to complete
  await page.waitForURL("http://localhost:3000/");
  await expect(page.getByTestId("index")).toContainText("index");

  // Save context state
  await page.context().storageState({ path: "playwright/.auth/user.json" });
});
