import { test, expect } from '@playwright/test';

test('shaddow dom element', async ({ page }) => {


    //page --> shadowDOM1 --> shadowDOM1 --> input
    // await page.goto('https://selectorshub.com/iframe-in-shadow-dom/');
    // await page.locator('#pizza').fill('Veg Pizza');



    //page-->iframe --> shadowDOM --> input
    await page.goto('https://selectorshub.com/shadow-dom-in-iframe/');
    await page.frameLocator('#pact').getByTitle('Chai is a feeling').fill('Masala Chai');

    //psuedo code:
    // page.frameLocator('iframe#pact').locator('css-selector-of-shadow-host').shadowLocator('css-selector-inside-shadow-dom').fill('value');
    //1. psuedo classes:
    //2. ::before / ::after
    //has not html tah no attribute:

    //window.getComputedStyle(document.querySelector('label[for="input-firstname"]', '::before')).getPropertyValue('content');





});