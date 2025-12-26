import { test, expect, chromium } from '@playwright/test';

test.use({ storageState: 'auth/session.json' });

test('Navigate to cart page without login', async ({ page }) => {
   await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=checkout/cart')

   await page.waitForTimeout(5000);

})

//ideal use:
// cookies, auth forever 24 hr

//wont work:
//otp
//2FA
//captcha