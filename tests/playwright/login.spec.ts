import { test } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:5173/login");
  await page.getByLabel("メールアドレス").click();
  await page.getByLabel("メールアドレス").fill("hiroa788@gmail.com");
  await page.getByLabel("パスワード").click();
  await page.getByLabel("パスワード").fill("aaa");
  await page.getByRole("button", { name: "ログイン" }).click();
});
