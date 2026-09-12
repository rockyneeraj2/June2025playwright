import { test, expect, Page, Locator } from '@playwright/test';

test('google search', async ({page}) => {

    await page.goto("https://www.google.com/");
    await page.locator("#ti6dpd").fill("india");

      // Get search suggestions
    const suggestion = await page.locator("//ul[@role='listbox']//li");

    // Wait for suggestions
    await suggestion.first().waitFor();

    //count
    let count =await suggestion.count();

    //print count
    console.log("print count "+ count);
    

    //2nd last
    const secondlast =suggestion.nth(count-2);

    //print 
    console.log("2nd last: " + await secondlast.innerText());

    await page.waitForTimeout(6000);


    
});