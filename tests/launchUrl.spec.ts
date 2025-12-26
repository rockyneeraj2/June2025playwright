import { test, expect } from '@playwright/test';

test('check page title', async ({ page }) => {
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login', { waitUntil: 'load' });
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login', { waitUntil: 'commit' });
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login', { waitUntil: 'domcontentloaded' });
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login', { waitUntil: 'domcontentloaded' });

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login', { referer: 'google.com' });

})