import { test, expect, Locator } from '@playwright/test';

test('has title', async ({ page }) => {

    // //use case 1:
    // await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

    // let footerEle: Locator = page.locator('footer a');
    // footerEle.filter({ hasText: 'Privacy Policy', visible: true }).click();

    //use case 2:
    //search scenario:
    // await page.goto('https://www.google.com/');
    // await page.locator("[name='q']").fill('selenium testing');

    // await page.locator("ul[role='listbox'] li div[role='option']").filter({hasText: 'websites'}).click();

    // await page.waitForTimeout(3000);

    //use case 3:
    //search scenario:
    await page.goto('https://www.flipkart.com/');
    await page.getByPlaceholder('Search for Products, Brands and More').fill('macbook');
    await page.locator('a.Q4gOLj').filter({ hasText: 'pro m4' }).click();

    await page.waitForTimeout(3000);





});