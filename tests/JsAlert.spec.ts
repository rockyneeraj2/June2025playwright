import { test, expect, Locator } from '@playwright/test';

test('pop up handle', async ({ page }) => {

    //const browser = await chromium.launch({ channel: 'chrome', headless: false });

    //Add one event listener at the page level. running in background - keep chekcing do we get any JS popup.
    //if any pop up is coming -- dismiss it immediately.

    page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept('Naveen Automation Labs');//accpe the alert - click on OK
        //await dialog.dismiss(); //dimiss the alert -- click on cancel
        console.log(dialog.type());
        console.log('----------');
    });

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await page.getByText('Click for JS Alert').click();
    await page.getByText('Click for JS Confirm').click();
    await page.getByText('Click for JS Prompt').click();

    //1. Alert : alert('messg') -- OK
    //2. Confirm: confirm('are you sure?') -- OK and Cancel
    //3. Prompt: prompt('enter username') -- only one text field with ok/cancel


    page.off('dialog', async dialog => { });

});