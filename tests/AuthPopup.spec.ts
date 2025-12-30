import { test, expect, BrowserContext, BrowserContextOptions, chromium } from '@playwright/test';

test('basic auth', async () => {
    // simple way:
    //     let usename = 'admin';
    //     let password = 'admin';
    //    await page.goto(`https://${usename}:${password}@the-internet.herokuapp.com/basic_auth`);

    const browser = await chromium.launch();
    const context = await browser.newContext({
        httpCredentials: {
            username: 'admin',
            password: 'admin'
        }
    });
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/basic_auth');
    // Optionally, add assertions here
    await browser.close();
});