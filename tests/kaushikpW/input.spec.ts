import { test, expect, Page, Locator } from '@playwright/test';

test('input files', async ({page}) => {

    await page.goto("https://letcode.in/edit");
    // await page.getByPlaceholder("Enter first & last name").fill("ttttt");
    const name = await page.$("fullName");
    name?.fill("nnn");

    await name?.focus();
    await page.keyboard.press("End");

})

test('what is inside text', async ({page}) => {



    await page.goto("https://letcode.in/edit");
    let value =await page.getAttribute("#join","value");
    console.log(value);

});

test('clear text', async ({page}) => {



    await page.goto("https://letcode.in/edit");
    await page.fill("#clearMe","");

});