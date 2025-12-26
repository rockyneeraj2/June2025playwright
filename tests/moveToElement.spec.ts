import { test, expect, Locator, } from '@playwright/test';

test('Locator Concept', async ({ page }) => {

    await page.goto('https://www.spicejet.com/');
    await page.getByText('Add-ons', { exact: true }).hover();
    page.getByTestId('test-id-Taxi').click();
});