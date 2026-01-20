import { expect, test } from '@playwright/test'

test("InputBox", async ({ page }) => {

    await page.goto("https://www.tutorialspoint.com/selenium/practice/text-box.php");
    await page.locator("//button[@data-bs-toggle='collapse']//parent::h2[@id='headingOne']").click();
    await page.getByText("Text Box").click();
    await expect(page).toHaveTitle("Selenium Practice - Text Box");
});

test("Radio Button", async ({ page }) => {

    await page.goto("https://www.tutorialspoint.com/selenium/practice/text-box.php");
    await page.locator("//a[text()=' Radio Button']").click();

    await page.waitForTimeout(3000);
    await expect(page).toHaveTitle("Selenium Practice - Radio Button");
    await expect(page.locator("form h1")).toHaveText("Radio Button");

    await expect(page.locator("//label[text()='Yes']")).not.toBeChecked();
    await expect(page.locator("//label[text()='Impressive']")).not.toBeChecked();
    await expect(page.locator("//label[text()='No (Disable)']")).toBeDisabled();

});