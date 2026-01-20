import { expect, test } from '@playwright/test'

test("Assertion2", async ({ page }) => {

    await page.goto("https://www.facebook.com/r.php?entry_point=login");
    await page.locator("//input[@name='firstname']").fill("neeraj");
    await page.locator("//input[@name='lastname']").fill("kumar");
    await expect(page.locator("firstname")).toHaveValue("neeraj");

});