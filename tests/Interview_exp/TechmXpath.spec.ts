import { test, expect, Page, Locator } from '@playwright/test';

test('xpath spaces', async ({ page }) => {

    await page.goto("http://seleniumpractise.blogspot.com/2021/08/webtable-in-html.html");
    const xpath = await page.locator("//a[normalize-space()='Selenium Practise']").click();

    await page.waitForTimeout(3000);

});