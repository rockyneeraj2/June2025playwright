import { test, expect, chromium, Page } from '@playwright/test'

test(" multiple Tabs", async ({ page: Page }) => {

    const browser = await chromium.launch({ headless: false });

    //opne incognitive 
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://demoqa.com/");
    await page.getByText("Alerts, Frame & Windows").click();
    await page.locator("//span[text()='Browser Windows']").click();

    await page.waitForTimeout(5000);

    const [newTab] = await Promise.all([
        page.waitForEvent("popup"),
        await page.locator("//button[@id='tabButton']").click()

    ])

    await newTab.waitForLoadState();
    console.log("New Tab url" + newTab.url);
    console.log("title" +page.getByText)
    await page.waitForTimeout(5000);
    await newTab.close();


    

});

test.only(" multiple window", async ({ page: Page }) => {

    const browser = await chromium.launch({ headless: false });

    //opne incognitive 
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://demoqa.com/");
    await page.getByText("Alerts, Frame & Windows").click();
    await page.locator("//span[text()='Browser Windows']").click();

    const [newWindow] = await Promise.all([
        context.waitForEvent("page"),
        await page.locator("//button[@id='windowButton']").click()

    ])

    await newWindow.waitForLoadState();
    console.log("New window url" + newWindow.url);
    await page.waitForTimeout(5000);
    await newWindow.close();
});