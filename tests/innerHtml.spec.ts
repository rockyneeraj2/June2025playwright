import { test, expect } from '@playwright/test';

test('check page title', async ({ page }) => {
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
    let innerHtml = await page.getByRole('heading', { name: 'Register Account' }).innerHTML();

    // <h1>Register Account</h1>

    //<input type="text" name="firstname" value="" placeholder="First Name" id="input-firstname" class="form-control">
    let firstName = await page.locator('#input-firstname').innerHTML();
    console.log(firstName);

});