
import { test, expect, Locator } from '@playwright/test';

test('Right click', async ({ page }) => {

    await page.goto('https://swisnl.github.io/jQuery-contextMenu/demo.html');
    //right click - context click

    await page.locator('span.context-menu-one').click({ button: 'right' });
    let allOptions: string[] = await page.locator(`ul.context-menu-list span`).allInnerTexts();
    console.log(allOptions);
    await page.getByText('Copy', { exact: true }).click();
});