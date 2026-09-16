import{expect, test} from '@playwright/test'

test("Browser COntext", async({page,browser}) =>{

    //Creates a new browser context. It won't share cookies/cache with other browser contexts.
    const context =await browser.newContext();
    const context1 =await browser.newContext();

    const page1 = await context.newPage();
    const page2 = await context1.newPage();

    page1.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");
    page2.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");

    await page1.locator("#input-firstname").fill("neeraj");
    await page1.locator("#input-firstname").click();

    await page1.waitForTimeout(2000);
    await page2.locator("#input-firstname").fill("kumar");
     await page2.locator("#input-firstname").click();

    await page2.waitForTimeout(2000);

});