import { test, expect, Locator } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

    let rightPaneelLinnk: string[] = await page.locator('.list-group-item').allInnerTexts();

    console.log(rightPaneelLinnk.length);
    console.log(rightPaneelLinnk);

    // for ...of loop:
    // for (let e of rightPaneelLinnk) {
    //     console.log(e);
    //     if (e === 'Forgotten Password') {
    //         await page.getByText(e).first().click();
    //         break;
    //     }
    // }

    console.log('====================')

    for (let i = 0; i < rightPaneelLinnk.length; i++) {
        console.log(i);
    }

    console.log('====================')

    //capture all the footers
    let footerLink: Locator[] = await page.locator('footer a').all();
    console.log(footerLink.length);

    let allfooterLink = [];
    for (let e of footerLink) {
        // console.log(await e.innerText());
        //console.log(await e.getAttribute('href'));
        let innerText: string = await e.innerText();
        allfooterLink.push(innerText);
    }


});