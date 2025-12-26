import { test, expect } from '@playwright/test';

test('store login session', async ({ page }) => {

    await page.goto('https://www.flipkart.com/');
    await page.locator('input[name="q"]').fill('Macbook');
    await page.locator(`button[title = 'Search for Products, Brands and More'] svg`).click();

    //css:
    //button[title = 'Search for Products, Brands and More'] svg

    //xpath:
    //*[name()='svg' and @fill='none']
    //*[local-name()='svg' and @fill='none']
    //*[local-name()='svg']//*[name()='g' and @id='regions']/*[name()='g']
    //*[local-name()='svg']//*[name()='g' and @id='regions']/*[name()='g' and @class='region']



});