import { test, expect, Locator, Page, } from '@playwright/test';
import { promises } from 'node:dns';


test('Screenshot handle: ', async ({ page }) => {

    await page.goto("https://www.orangehrm.com/en/contact-sales/");
    await page.screenshot({ path: 'one.png' });
    await page.screenshot({ path: 'full.png', fullPage: true });
    await page.screenshot({ path: './screenshots/three.png' });
});