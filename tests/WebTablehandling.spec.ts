import { test, expect, Locator, Page, } from '@playwright/test';
import { promises } from 'node:dns';

test('WebTable Handle: ', async ({ page }) => {

    await page.goto('https://naveenautomationlabs.com/opencart/ui/webtable.html');

    //td[text()='Joe.Root']/preceding-sibling::td/input[@type='checkbox']
    //td[text()='Jasmine.Morgan']/preceding-sibling::td/input[@type='checkbox']



    //xpaths:
    // await page.locator("//td[text()='Joe.Root']/preceding-sibling::td/input[@type='checkbox']").click();
    // await page.locator("//td[text()='Jasmine.Morgan']/preceding-sibling::td/input[@type='checkbox']").click();

    //css used:
   // page.locator(`tr:has(td:text('Joe.Root'))`.locator('td'.first()))

    await selectUser(page, 'Joe.Root');
    await selectUser(page, 'Jasmine.Morgan');

    await page.waitForTimeout(3000);

});

async function selectUser(page: Page, username: string): Promise<void> {
    await page.locator(`//td[text()='${username}']/preceding-sibling::td/input[@type='checkbox']`).click();

}