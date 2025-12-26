import { test, expect, Locator, } from '@playwright/test';

test('Locator Concept', async ({ page }) => {


   /*

   await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login')

   //1.
   //find the element using locator + perform the actions:
   //await page.locator('#input-email').fill('neerajkr937@gmail.com');
   //await page.locator('#input-password').fill('test@1234');
   //await page.locator('//input[@value="Login"]').click();

   // await page.locator('//input[value="Login"]').click();

   //2nd approach:
   //find the element using locator:
   let emailId: Locator = page.locator('#input-email');
   let password: Locator = page.locator('#input-password');
   let loginBtn: Locator = page.locator('//input[@value="Login"]');

   //perform the action:
   await emailId.fill('neerajkr937@gmail.com');
   await password.fill('test@1234');
   await loginBtn.click();

   //6 element same text: my Account:3rd -2
   //let header:string | null = await page.getByText('My Account').nth(3).textContent();
   //console.log(header);

   //using xpath:
   let header: string | null = await page.locator('//h2[text()="My Account"]').textContent();
   console.log(header);

   */

   //using element placeholder value:
   await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
   await page.getByPlaceholder('First Name').fill('neeraj');
   //await page.getByPlaceholder('Telephone').highlight();
   await page.getByPlaceholder('Telephone').fill('87787878')

   //highlight --debugging:
   //await page.locator('#input-firstname').highlight();

   //enter value with delay: char by char like real user ---search feature
   await page.locator('#input-lastname').pressSequentially('Automation Testing Labs', { delay: 200 });

   await page.waitForTimeout(2000);


})
