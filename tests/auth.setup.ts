import { test as setup, expect } from "@playwright/test";

setup("should login", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "close preview warning" }).click();

  // Login
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByLabel("Email address").fill("jsvalley@floatrides.com");
  await page.getByLabel("Password").fill("#1*w1vyBJis!FwC*Shc0");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  
  await page.waitForURL("http://localhost:3000/");
  await expect(page.getByTestId("index")).toContainText("index");

  await page.context().storageState({ path: 'playwright/.auth/user.json'});
});
