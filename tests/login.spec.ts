import { test, expect } from "@playwright/test";

test("login with valid credentials", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.fill('input[id="email"]', "test@example.com");
  await page.fill('input[id="password"]', "password123");

  const emailValue = await page.inputValue('input[id="email"]');
  expect(emailValue).not.toBe("");

  const passwordValue = await page.inputValue('input[id="email"]');
  expect(passwordValue).not.toBe("");
});
