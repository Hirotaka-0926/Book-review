import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:5173/login");
  await page.getByLabel("email").click();
  await page.getByLabel("email").fill("hiroa788@gmail.com");
  await page.getByLabel("password").click();
  await page.getByLabel("password").fill("aaa");
  await page.getByRole("button", { name: "LogIn" }).click();
  await expect(page).toHaveURL("http://localhost:5173/");
});

test("正しくエラーを吐くか", async ({ page }) => {
  await page.goto("http://localhost:5173/login");
  await page.getByLabel("email").click();
  await page.getByLabel("email").fill("hiroa788@gmail.com");
  await page.getByLabel("password").click();
  await page.getByLabel("password").fill("aaaa");
  await page.getByRole("button", { name: "LogIn" }).click();
  await expect(page.getByText("認証に失敗しました")).toBeVisible();
});
