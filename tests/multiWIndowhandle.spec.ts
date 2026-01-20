import { test, expect, Browser, Page } from '@playwright/test';


test('handle multiple window', async ({page,browser }) => {

   const content = await browser.newContext();
   const page1 = await content.newPage();

   await page.goto("https://demoqa.com/browser-windows");
   await page.getByText("Alerts, Frame & Windows").click();
   await page.getByText("Elements").click();

});