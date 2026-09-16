import {test} from '@playwright/test';

test(" select dropdown", async ({page})=>{
    
    await page.goto("https://orangehrm.com/contact-sales");

    //get by value:
    await page.locator("#Form_getForm_Country").selectOption("Albania");

    await page.waitForTimeout(4000);
    
    //get by label:
    await page.locator("#Form_getForm_Country").selectOption({label:'Bahamas'});

       await page.waitForTimeout(4000);

    //get by index
    await page.locator("#Form_getForm_Country").selectOption({index:3});

    await page.waitForTimeout(4000);
});