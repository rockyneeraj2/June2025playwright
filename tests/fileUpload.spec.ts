import { test, expect, BrowserContext, BrowserContextOptions, chromium } from '@playwright/test';

test('file upload popup', async ({page}) => {

    //type= file attribute should be present in the html dom
    
    await page.goto('https://practice.expandtesting.com/upload'); 

    //attach the file to the input file element
    await page.locator("#fileInput").setInputFiles("C:\Users\neera\Downloads\SDET New (1).pdf");


    //upload the file by clicking on the upload button
    await page.locator("#fileSubmit").click();

    });
