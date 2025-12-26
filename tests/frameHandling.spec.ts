import { test, expect, Page, FrameLocator } from '@playwright/test';

test('frame handling', async ({ page }) => {
    await page.goto('https://www.formsite.com/templates/registration-form-templates/vehicle-registration-form/');
    await page.getByTitle('Vehicle-Registration-Forms-and-Examples').click();

    //frame will be loaded:
    let frameLel: FrameLocator = page.frameLocator(`iframe[id*='frame-one']`);
    await frameLel.locator('#RESULT_TextField-1').fill('test automation');

    let header = await page.locator('h3.details__form-preview-title').innerText();
    console.log(header);

});