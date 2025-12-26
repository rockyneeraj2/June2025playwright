import { test, expect } from '@playwright/test';

test('store login session', async ({ page }) => {


    //page --> shadowDOM1 --> shadowDOM1 --> input
    // await page.goto('https://selectorshub.com/iframe-in-shadow-dom/');
    // await page.locator('#pizza').fill('Veg Pizza');



    //page-->iframe --> shadowDOM --> input
    await page.goto('https://selectorshub.com/shadow-dom-in-iframe/');
    await page.frameLocator('#pact').locator('#tea').fill('Masala Tea');
});