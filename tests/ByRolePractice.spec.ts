import { test, expect, Locator, } from '@playwright/test';

test('Locator Concept', async ({ page }) => {

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');

    await page.getByRole('textbox', { name: 'First Name' }).fill('neeraj');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('kumar');

    //1. textbox should have <label or tag> <arai> --label attribute>

    await page.getByRole('radio', { name: 'Yes' }).click();
    //await page.getByRole('checkbox').click(); -- Avoid it because there is no role:
    await page.locator('//input[@name="agree"]').click();

    //await page.getByRole('link',{name:'Register'}).click();

    //h1--to--h6-- headers --heading
    let header:string = await page.getByRole('heading',{name:'Register Account'}).innerText();
    console.log(header);



    await page.waitForTimeout(2000);

});