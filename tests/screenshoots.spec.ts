import { test, expect, Locator, Page, } from '@playwright/test';
import { promises } from 'node:dns';


test('Screenshot handle: ', async ({ page }) => {

    await page.goto("https://www.orangehrm.com/en/contact-sales/");

    await page.screenshot({ path: 'one.png' });
    await page.screenshot({ path: 'full.png', fullPage: true });
    await page.screenshot({ path: './screenshots/three.png' });

    await page.screenshot({
        path: 'random.png',
        clip: { x: 0, y: 0, width: 800, height: 600 }
    });

    const logo = page.locator('img[alt="OrangeHRM Logo"]').first();
    await logo.screenshot({ path: "logo.png" });


    //Change format and quality:
    // By default, Playwright saves in .png.
    // You can also save in JPEG with compression:
    await page.screenshot({
        path: "page.jpg",
        type: "jpeg",
        quality: 30, // 0–100
        fullPage: false
    });


    // Capture and use as Buffer (no file saved)
    // You can store the image in memory instead of writing to disk:
    const buffer = await page.screenshot();
    console.log(buffer.length); // you can attach to report, upload, etc.

});