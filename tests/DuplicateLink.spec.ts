import { test, expect, Page } from '@playwright/test';

test('drop down handling', async ({ page }) => {
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    await page.getByRole('link', { name: 'Forgotten Password' }).nth(1).click();


});