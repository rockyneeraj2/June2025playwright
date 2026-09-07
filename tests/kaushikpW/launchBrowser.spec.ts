import { test, expect, Page, Locator } from '@playwright/test';

test('lauch', async ({page}) => {

    await page.goto("https://www.makemytrip.com/");

})