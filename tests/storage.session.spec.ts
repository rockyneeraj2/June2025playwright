
import { test, expect } from '@playwright/test';

test('store login session', async({ page })=> {
   await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login')
   await page.locator('#input-email').fill('neerajkr937@gmail.com');
   await page.locator('#input-password').fill('test@1234');
   await page.locator('//input[@value="Login"]').click();
   await page.waitForURL('https://naveenautomationlabs.com/opencart/index.php?route=account/account')

   await page.context().storageState({path: 'auth/session.json'})

})