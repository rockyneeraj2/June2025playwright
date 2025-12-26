import { test, expect } from '@playwright/test';

test('Get Attribute Test', async ({ page }) => {
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

    await page.locator('#input-email').fill('neerajkr937@gmail.com');

    // get attribute () for any attribute value attribute method:
    let name = await page.locator('#input-email').getAttribute('name');
    console.log(name);

    await page.waitForTimeout(3000);

    let placeholder = await page.locator('#input-email').getAttribute('Password');
    console.log(placeholder);

    //here getAttribute('value') --this wont work:
    //we have to use inputValue() to fetch the enter valuein text field:
    await page.locator('#input-email').fill('neerajkr937@gmail.com');
    let enterValue = await page.locator('#input-email').inputValue();
    console.log(enterValue);


});