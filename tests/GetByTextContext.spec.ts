import { test, expect, Locator, } from '@playwright/test';

test('GetByText Concept', async ({ page }) => {

   await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');

   //1. approach:
   await page.getByText('Register Account',{exact:true}).innerText();

   //2. locator + hastext();
   //locator('h1',{hasText:'Register Account'});
   //locator('h1',{hasText:'Privacy policy'})

   await page.locator('h1',{hasText:'Register Account'}).highlight();

   //3. using tag: text ('value') -- webtable with checkboxes
   await page.locator('h1:text{"Register Account"}').highlight();
});