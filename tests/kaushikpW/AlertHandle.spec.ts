import { test, expect, Page, Locator } from '@playwright/test';

test('simple  alert', async ({page}) => {

    await page.goto("https://letcode.in/alert");

    

    page.on("dialog",(dialog) =>{
    console.log("dialog log"+ dialog.message());
    console.log("default value"+dialog.defaultValue());
    console.log("type"+dialog.type());
    dialog.accept();

    });
   
    await page.locator("//button[@id='accept']").click();

});

test('confirm alert', async ({page}) => {

    await page.goto("https://letcode.in/alert");
    page.on("dialog",(dialog) =>{
    console.log("dialog log"+ dialog.message());
    console.log("default value"+dialog.defaultValue());
    console.log("type"+dialog.type());
    dialog.accept();
    //dialog.dismiss();

    })

    await page.locator("//button[@id='confirm']").click();
    

});

test('prompt alert', async ({page}) => {

    await page.goto("https://letcode.in/alert");
    page.on("dialog",(dialog) =>{
    console.log("dialog log"+ dialog.message());
    console.log("default value"+dialog.defaultValue());
    console.log("type"+dialog.type());
    dialog.accept("yy");

    
    //dialog.dismiss();

    })

    await page.locator("//button[@id='prompt']").click();
    await page.waitForTimeout(3000);
    

});


