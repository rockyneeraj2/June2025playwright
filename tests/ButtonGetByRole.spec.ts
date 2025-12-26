import { test, expect, chromium, Browser, BrowserContext, Page } from '@playwright/test';

test('Get By role', async ({ page }) => {
await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

await page.getByRole('button', { name: 'Login' }).click();
await page.getByRole('link', { name: 'Continue' }).highlight();

//input or button ---> role: button
//link -- role: link

});


