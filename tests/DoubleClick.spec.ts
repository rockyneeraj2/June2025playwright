import { test, expect, chromium, Browser, BrowserContext, Page } from '@playwright/test';

test('Double click', async ({ page }) => {
    // Use the provided 'page' from the test context
    await page.goto('https://api.jquery.com/dblclick/');
    let frameEle = page.frameLocator('iframe');
    let box = frameEle.locator('div');

    //using dblclick:
    //await box.dblclick();

    await box.click({ clickCount: 2 });

});