import { test, expect, Locator, } from '@playwright/test';

test('Locator Concept', async ({ page }) => {

    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register", {
        timeout: 5000
    });

    //10 secs -- 2 secs = 8 secs cancelled

    // let firstname: Locator = page.locator(`#input-firstname11`); //no error in case of wrong locator
    // firstname.click({ timeout: 5000 });
    //actions: auto wait will be applied
    //click
    //fill
    //hover
    //textcontent
    //check

    //pw will follow this sequence:
    //dom loaded -> loaded on the page
    //--> visible on the page
    //--> stable on the page
    //--> enable
    //clickable

    // await firstname.fill('testing'); //error will be thrown -
    //Timeout 10000ms exceeded.
    //  - waiting for locator

    //no need to write the wait if we are performing any action on the locator

    //
    //explicit wait in PW; dynamic wait : for a specific locator
    //
    // firstname.waitFor({ state: 'visible', timeout: 5000 });
    // firstname.fill('Naveen');

    //fill the reg form: success messg on the page.
    //await page.locator('#successmesg').waitFor({ state: 'visible', timeout: 5000 });

    //assertions in pw: using expect : default auto wait
    //    expect(page.locator(`#successmesg)).toBeVisible();


    //wait for Selector from page lib:
    //legacy + not a good practice to use
    //only xpath/css/text/htmltag
    (await page.waitForSelector('#input-firstname')).fill('Testing');

    //waitFor() --> locator -- any kind of locators - pw=semantic roles
    //waitForSelector() --> page --only for xpath/css

    //its only for the page loading concept:
    page.waitForLoadState("load"); //page is fully loaded
    page.waitForLoadState("domcontentloaded") ////DOM is fully loaded
    page.waitForLoadState("networkidle"); //network api are done

    //dialog, popup
    // page.waitForEvent()

    //wait for url:
    //page.waitForURL('url value');


});