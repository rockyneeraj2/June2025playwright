import { expect, test } from '@playwright/test'

test("Dropdown", async ({ page }) => {

    await page.goto("https://www.amazon.com/");
    // await page.locator("#searchDropdownBox").selectOption("search-alias=arts-crafts-intl-ship"); // by using value
    // await page.waitForTimeout(3000);
    // await page.locator("#searchDropdownBox").selectOption("Baby");// using visible text
    // await page.waitForTimeout(3000);
    // await page.locator("#searchDropdownBox").selectOption({label:'Beauty & Personal Care'}); // by Visible text
    // await page.waitForTimeout(3000);
    // await page.locator("#searchDropdownBox").selectOption({index:9}); // by using index
    // await page.waitForTimeout(3000);

    // await page.selectOption("#searchDropdownBox", { label: 'Beauty & Personal Care' });
    // await page.waitForTimeout(3000);
    // const selectOption = await page.locator("#searchDropdownBox").inputValue();
    // expect(selectOption).toBe("search-alias=beauty-intl-ship");
    // await page.waitForTimeout(3000);

    const selectOption = await page.locator("#searchDropdownBox option:checked").textContent();
    expect(selectOption).toBe("All Departments");
    await page.waitForTimeout(3000);
});

test(" searchable Dropdown", async ({ page }) => {

    await page.goto("https://www.amazon.com/");
    await page.locator("#twotabsearchtextbox").fill("book");
    await page.waitForSelector(".left-pane-results-container");
    await expect(page.locator(".left-pane-results-container")).toBeVisible();
    await page.waitForTimeout(3000);
});