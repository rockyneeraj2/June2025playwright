import { test, expect } from '@playwright/test';

test('back and forward button simulation test', async ({ page }) => {
  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login')
  console.log(await page.title());
  await page.goto('https://www.google.com/')
});