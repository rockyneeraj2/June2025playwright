import { test, expect, Page, Locator } from '@playwright/test';

test('Verify new page opened', async ({ page,context }) => {

    await page.goto("https://www.selenium.dev/selenium/web/window_switching_tests/page_with_frame.html");

     // Wait for new page BEFORE clicking
    const pagePromise = context.waitForEvent('page');

    // Click "Open new window"
    await page.locator("//a[@target='newWindow']").click();

    // Capture newly opened page
    const newPage = await pagePromise;

    // Wait until page is loaded
    await newPage.waitForLoadState();

     // Verify new page exists
    expect(newPage).toBeTruthy();

     // Verify title
    await expect(newPage).toHaveTitle('Simple Page');

    console.log('New page opened successfully');
    console.log('URL:', newPage.url());
    console.log('Title:', await newPage.title());

    //Playwright recommends starting context.waitForEvent('page') before the click that opens the new page, 
    // then awaiting that promise to obtain the new Page object.

    //"I first register a listener for the page event on the browser context because the new tab
    //  belongs to the same browser context. Then I perform the click and capture the newly created Page object.
    //  After waiting for the page to load, I validate something meaningful such as URL, title, or a unique 
    // element."

    //await expect(newPage).toHaveTitle('Simple Page');
    // expect(newPage.url()).toContain('simple_page');






});