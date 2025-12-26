import { test, expect, Locator, } from '@playwright/test';

test('Visible and Enable', async ({ page }) => {

    await page.goto('https://classic.freecrm.com/');

    let submitBtn: Locator = page.getByTitle('Login');
    let isVisible: Boolean = await submitBtn.isVisible();
    console.log(isVisible);

    let isEnabled = await submitBtn.isEnabled();
    console.log(isEnabled);

    
    let isDisbled = await submitBtn.isDisabled();
    console.log(isDisbled);

});