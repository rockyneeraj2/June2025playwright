import { test, expect, Locator, } from '@playwright/test';

test('GetByText Concept', async ({ page }) => {

    await page.goto("https://www.orangehrm.com/en/contact-sales/");

    let contactSales: Locator = page.getByRole('button', { name: 'Contact Sales' }).first();

    //get the background color of the element:
    let bgColor: string = await contactSales.evaluate(ele => getComputedStyle(ele).backgroundColor);
    console.log("background color: " + bgColor);


    //get the text color of the element:
    let color: string = await contactSales.evaluate(ele => getComputedStyle(ele).color);
    console.log("text color: " + color);

    //page.evaluate(() => alert('Hello Naveen')); 
});
