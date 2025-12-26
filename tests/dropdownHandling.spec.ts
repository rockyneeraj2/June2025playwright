import { test, expect, Page } from '@playwright/test';

test('drop down handling', async ({ page }) => {
    await page.goto('https://naveenautomationlabs.com/opencart/ui/dropdowns.html');

    // await page.locator(` //div[@class='select-trigger']//span[text()='Choose your preferred programming language']`).click();
    // await page.getByText('Java', { exact: true }).click();

    // await page.waitForTimeout(3000);

    // await page.locator(` //div[@class='select-trigger']//span[text()='Choose your preferred web framework']`).click();
    // await page.getByText('Angular', { exact: true }).click();

    // await page.waitForTimeout(3000);


    // await page.locator(` //div[@class='select-trigger']//span[text()='Select your experience level']`).click();
    // await page.getByText('Junior (2-3 years)', { exact: true }).click();

    await selectValue(page, 'Choose your preferred programming language', 'Java');
    await selectValue(page, 'Choose your preferred web frameworke', 'Angular');
    await selectValue(page, 'Select your experience level', 'Junior (2-3 years)');

    await page.waitForTimeout(3000);


});

async function selectValue(page: Page, dropdownlabel: string, value: string): Promise<void> {

    await page.locator(` //div[@class='select-trigger']//span[text()='${dropdownlabel}']`).click();
    await page.getByText(`${value}`, { exact: true }).click();

}