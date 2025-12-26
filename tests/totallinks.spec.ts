import { test, expect, Locator } from '@playwright/test';

test('Total links Playwright', async ({ page }) => {
    await page.goto('https://www.flipkart.com/');

    //total links on the page:
    let allLinks: string[] = await page.locator('a[href]').allInnerTexts();
    console.log('total no of links' + allLinks.length);

    let totalimages: Locator[] = await page.locator('//img[@alt]').all();
    console.log('total no of images: ' +totalimages);

    for (let i of totalimages){
        console.log(await i.getAttribute('alt'));
    }

});