import { test, expect, Browser, Page } from '@playwright/test';


test('new window', async ({ page }) => {
    
   await page.goto("https://www.orangehrm.com/en/contact-sales/");

   
});