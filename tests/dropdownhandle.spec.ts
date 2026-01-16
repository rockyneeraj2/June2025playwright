import { test, expect, chromium, Browser, BrowserContext, Page } from '@playwright/test';

test(' select Drag And Drop d', async ({ page }) => {
    await page.goto("https://www.magupdate.co.uk/magazine-subscription/phrr");

    const country = 'select#Contact_CountryCode';

    //select based on value
    await page.selectOption(country, { value: 'AL' });

    //select based on label
    await page.selectOption(country, { label: 'American Samoa' });

    //select based on index:
    await page.selectOption(country, { index: 2 });

    // select multiple dropdown:
    // css selector: select#Contact_CountryCode>option
   const alloptions =await page.$$(country+'> option')
   console.log(alloptions.length);

   for(const e of alloptions){
    const text =await e.textContent();
    console.log(text);
    if(text==='India'){
        await page.selectOption(country, { label: 'India' });
        break;
    }
   }

    await page.waitForTimeout(5000);

});