import { test, expect, Page, Locator } from '@playwright/test';

test('select dropdown based on vlaue', async ({page}) => {

    await page.goto("https://letcode.in/dropdowns");
    await page.locator("//select[@id='fruits']").selectOption("Apple");
    await page.waitForTimeout(3000);

    const mes = page.locator("//p[text()='Apple']");
    if(mes){
        expect( await mes.textContent()).toContain("Apple");
    }

});

test('select multiple dropdown value', async ({page}) => {

    await page.goto("https://letcode.in/dropdowns");
    await page.locator("//select[@id='superheros']").selectOption([{label:"Supergirl"},{value:"bp"}]);
    await page.waitForTimeout(3000);

   
});

test('count the selected all dropdown', async ({page}) => {

    await page.goto("https://letcode.in/dropdowns");
    const len =await page.$$("#lang option");
    console.log(len.length);

   
});

test('get selected text()', async ({page}) => {

    await page.goto("https://letcode.in/dropdowns");
    const len =await page.selectOption("#country",{index:2});
   // const options = await page.locator('#country option').allTextContents();
   const value = await page.locator('#country').inputValue();

    console.log(value); // IN

    //console.log(options);

    //“In Playwright, for a native select dropdown, I use option:checked with textContent() 
    // to get the selected option text. If I need the selected value, I use inputValue(). For a custom dropdown, 
    // I use role-based locators such as getByRole('combobox') and retrieve the displayed text using innerText().”


   
});

test('select last droddown', async ({page}) => {

    await page.goto("https://letcode.in/dropdowns");
    const dropdowns = page.locator("#fruits");

    await dropdowns.last().selectOption('Pine Apple');
    await page.waitForTimeout(3000);


   
});

test('second last droddown', async ({page}) => {

    await page.goto("https://letcode.in/dropdowns");
    const dropdowns = page.locator("#fruits");

    const count =await dropdowns.count();
    console.log(count);

    await dropdowns.nth(count-2).selectOption("Banana");
     await page.waitForTimeout(3000);


   
});