import{expect, test} from '@playwright/test'

test("Assertion", async({page}) =>{

    await page.goto("https://www.saucedemo.com/");
    await expect(page).toHaveTitle("Swag Labs");

    await expect(page).toHaveURL("https://www.saucedemo.com/");
    const logo = page.locator("//div[@class='login_logo']");
    await expect (logo).toBeVisible();

    const usernam= page.locator("//input[@id='user-name']");
    await expect(usernam).toBeEnabled();

    const userAccept =page.locator("//h4[text()='Accepted usernames are:']");
    await expect(userAccept).toHaveText("Accepted usernames are:");

    const someText = page.locator("//h4[text()='Password for all users:']");
    await expect(someText).toContainText("Password for all");

});