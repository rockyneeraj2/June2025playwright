import { test, expect, Locator, } from '@playwright/test';

test('Locator Concept', async ({ page }) => {

    /*
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

    //img alt= naveenopencart
    await page.getByAltText('naveenopencart').click();

    */

    page.goto('https://naveenautomationlabs.com/opencart/ui/data-testid-page.html');

    //<input type="text" class="form-input" data-testid="username-input" placeholder="Enter your username" required="">
    await page.getByTestId('username-input').fill('weeeeeeeee');
    await page.getByTestId('home-nav-btn').click();

    //<input type="text" name="firstname" value="" placeholder="First Name" id="input-firstname" class="form-control">
    await page.getByTestId('input-firstname').fill('weeeeeeeee'); // invalid
    await page.getByTestId('input-firstname').fill('weeeeeeeee'); //valid:

    //getByTitle:
    //<img src="https://naveenautomationlabs.com/opencart/image/catalog/opencart-logo.png" title="naveenopencart" alt="naveenopencart" class="img-responsive">
    await page.getByTitle('naveenopencart').click();

    //getByPlaceholder:
    await page.getByPlaceholder('12212').click();

})
