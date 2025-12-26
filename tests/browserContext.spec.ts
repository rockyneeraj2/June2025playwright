import { test, expect, chromium, Browser, BrowserContext, Page } from '@playwright/test';

test('browser context', async () => {

   let browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' })

   //Create a new incognitive browser:
   let context1: BrowserContext = await browser.newContext();
   let context2: BrowserContext = await browser.newContext();

   let page1: Page = await context1.newPage();
   let page2: Page = await context2.newPage();

   //user1:
   await page1.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
   await page1.locator('#input-email').fill('neerajkr937@gmail.com');
   await page1.locator('#input-password').fill('test@1234');
   await page1.locator('//input[@value="Login"]').click();



   //customer:
   await page2.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
   await page2.locator('#input-email').fill('neerajkr7766@gmail.com');
   await page2.locator('#input-password').fill('test@1234');
   await page2.locator('//input[@value="Login"]').click();

   context1.close();
   context2.close();


})