import { expect, test, Page } from '@playwright/test'

test("Browser COntext", async ({ browser }) => {

    //playwright code
    // => anonomous functions -- ligheter
    //step1: -open browser
    //step 2: enter username and pwd
    //step 3 - click();

    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    await page1.goto("https://rahulshettyacademy.com/loginpagePractise/");


});

test("page  COntext", async ({ page, browser, context }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");


});

test.only("only", async ({ page, browser, context }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // get the title and put the assertion
    console.log(await page.title());
    await expect (page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");


});