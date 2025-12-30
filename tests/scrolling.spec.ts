import { test, expect, Locator, Page, } from '@playwright/test';
import { promises } from 'node:dns';


test('scrool down ', async ({ page }) => {

    await page.goto("https://www.orangehrm.com/en/contact-sales/");

    //1. scrollIntoViewIfNeeded
    await page.locator(`#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll`).click();
    // await page.locator(`//a[contains(text(), 'Careers')]`).nth(2).scrollIntoViewIfNeeded();
    // await page.waitForTimeout(3000);
    // await page.locator(`//a[contains(text(), 'Careers')]`).nth(2).click();


    //2. scroll down 1000 pixels:
    // await page.evaluate(() => window.scrollBy(0, 1000));
    // await page.waitForTimeout(2000);
    // await page.evaluate(() => window.scrollBy(0, 2000));

    //3. scroll down to the bottom of the page:
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);

    //4. scroll up to the top of the page:
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(2000);

    //3. scroll down to the bottom of the page:
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);
});