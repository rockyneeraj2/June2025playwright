import { test, expect, Browser, Page } from '@playwright/test';


test('has title', async ({ browser }) => {
    let brCtx = await browser.newContext();
    const page = await brCtx.newPage();



    //create event listener for Accept Cookies button:
    //background listener:
    page.on('framenavigated', async () => {
        let acceptCookiesButton = page.locator(`#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll`);
        if (await acceptCookiesButton.isVisible()) {
            await acceptCookiesButton.click();
        }
    });

    await page.goto("https://www.orangehrm.com/en/contact-sales/");//parent window
    let orangeHrmTitle = await page.title();

    await page.locator(`//a[contains(@href, 'linkedin')]`).click();
    await page.locator(`//a[contains(@href, 'facebook')]`).click();
    await page.locator(`//a[contains(@href, 'youtube')]`).click();

    await page.waitForTimeout(3000);

    let allPages: Page[] = brCtx.pages();// Returns all open pages in the context.
    console.log('total number of windows: ' + allPages.length);

    for (let pg of allPages) {
        console.log(await pg.title());
        if (await pg.title() !== orangeHrmTitle) {
            await pg.close();//close only child window popups
        }

    }



    // await page.bringToFront();
    // console.log(await page.title());
    // await page.getByRole('textbox', { name: 'Full Name' }).fill('Naveen');

});