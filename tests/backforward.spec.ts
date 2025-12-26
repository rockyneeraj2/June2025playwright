import { test, expect } from '@playwright/test';

test('back and forward button simulation test', async ({ page }) => {
  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login')
  console.log(await page.title());
  await page.goto('https://www.google.com/')
  console.log(await page.title());

  await page.goBack();
  console.log(await page.title());
  await page.goBack();
  await page.goBack();
  console.log(await page.title());

  await page.waitForTimeout(5000);

  await page.reload() // refresh the page

})