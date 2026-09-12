import { test, expect } from '@playwright/test';

/*
"In Playwright, waitForLoadState() waits for a specific page loading state such as domcontentloaded, 
load, or networkidle. I use it mainly around navigation when I need to synchronize with the document 
loading lifecycle. However, I don't use it blindly after every action. Playwright already provides
 auto-waiting, so for application readiness I prefer waiting for a meaningful condition such as
  toBeVisible(), toHaveURL(), or an API response. I also avoid hard-coded waitForTimeout() because 
  it makes tests slower and flaky."
*/

test('Wait for Google page to load', async ({ page }) => {

    await page.goto('https://www.google.com');

    await page.waitForLoadState('domcontentloaded');

    await expect(page).toHaveTitle(/Google/);

});