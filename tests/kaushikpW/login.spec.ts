import {test} from '@playwright/test'

test("login test cases",async({page}) =>{

    await page.goto("https://letcode.in/login");

    await page.setViewportSize({
    width: 1920,
    height: 1080,
  },)

    await page.getByPlaceholder("Enter Username").fill("mor_2314");
    await page.getByPlaceholder("Enter Password").fill("83r5^_");
    await page.locator("//button[@type='submit']").click();

    /*
       args: [
      '--disable-save-password-bubble',
      '--credentials-enable-service=false',
      '--password-store=basic'
    ]

    */

    await page.keyboard.press('Enter');
    await page.locator("//a[@href='/cart']//following-sibling::button");


})