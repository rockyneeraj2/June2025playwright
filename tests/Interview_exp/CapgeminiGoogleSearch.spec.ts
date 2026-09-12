import { test, expect, Page, Locator } from '@playwright/test';

test('google search 2nd no select', async ({ page }) => {

    await page.goto("https://www.google.com/");
    await page.locator("#ti6dpd").fill("india");

    await page.waitForTimeout(2000);

    // find all th lists of search option:
    const selestList = await page.locator("//ul[@role='listbox']//li");

    //count all lists
    const count = await selestList.count();

    //print all counts
    console.log(count);

    //print 2nd last
    const sec = await selestList.nth(count-2).innerText();
    console.log("second last textin search box -----< : "+sec);

     console.log("-------------------");

    const first = await selestList.first().innerText();
    console.log("first----> "+first);

     console.log("-------------------");

    const second = await selestList.nth(2).innerText();
    console.log("second---->" +second);

    console.log("-------------------");
    

    const last = await selestList.last().innerText();
    console.log("last--->" +last);

    console.log("-------------------");

    //print all texts
    const alltext = await selestList.allInnerTexts();
    console.log("-------------<" + alltext);

    await page.waitForTimeout(7000);

});