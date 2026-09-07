import {test} from '@playwright/test'

test("upload files",async({page}) =>{

    await page.goto("https://letcode.in/file");
   // await page.setInputFiles("//span[text()='Choose a file…']", "D:\June2025Playwright\one.png");
    //await page.setInputFiles("//span[text()='Choose a file…']", "D:\June2025Playwright\one.png","yyyy");

    page.on("filechooser",async(filechooser) =>{

       // await filechooser.isMultiple()
       await filechooser.setFiles("D:\June2025Playwright\one.pn");

    })
    await page.click("//span[text()='Choose a file…']",{force:true});


});