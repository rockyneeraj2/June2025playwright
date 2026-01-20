import{test} from '@playwright/test'

test("locator",async({page}) =>{

    await page.goto("https://www.amazon.com/");
    await page.getByPlaceholder("Search Amazon").fill("laptop");
    await page.locator("//input[@id='nav-search-submit-button']").click();
    await page.waitForTimeout(3000);

});