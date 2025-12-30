import { test, expect, Locator, Page, } from '@playwright/test';


test('scrool down ', async ({ page }) => {


    await page.goto("https://www.orangehrm.com/en/contact-sales/");

    //1. scrollIntoViewIfNeeded:
    await page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click();
    // await page.locator(`//a[contains(text(),'Careers')]`).nth(2).scrollIntoViewIfNeeded();
    // await page.waitForTimeout(3000);
    // await page.locator(`//a[contains(text(),'Careers')]`).nth(2).click();

    // await page.waitForTimeout(3000);

    //2. scroll down areound 1000 pixels:
    // await page.evaluate(() => { window.scrollBy(0, 1000); });
    // await page.waitForTimeout(3000);
    // page.evaluate(() => { window.scrollBy(0, 2000); });

    //3. scroll to bottom of the page:
    await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
    await page.waitForTimeout(3000);

    //4. scroll to top of the page:
    await page.evaluate(() => { window.scrollTo(0, 0); });
    await page.waitForTimeout(3000);

    //5. scroll to bottom of the page:
    await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
    await page.waitForTimeout(3000);

});