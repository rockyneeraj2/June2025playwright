import { test, expect, Locator, } from '@playwright/test';

test('Locator Concept', async ({ page }) => {

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');

    //<label class="col-sm-2 control-label" for="input-firstname">First Name</label>
    //<input type="text" name="firstname" value="" placeholder="First Name" id="input-firstname" class="form-control">
    await page.getByRole('textbox',{name:'First Name'}).fill('neeraj');
    await page.getByRole('textbox',{name:'Last Name'}).fill('kumar');
    
    await page.getByRole('checkbox').click();
    await page.getByRole('button',{name:'Continue'}).click();


});