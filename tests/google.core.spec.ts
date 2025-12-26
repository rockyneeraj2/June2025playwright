import { Browser, chromium, Locator } from '@playwright/test';

(async () => {
  let browser: Browser = await chromium.launch({ headless: false });
  let page = await browser.newPage();
  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login')

  let title: String = await page.title();
  console.log('page title ' + title)

  let url: String = page.url();
  console.log('page url ' + url)

  let email: Locator = page.locator('#input-email');
  await email.fill('neeraj@123445');

  await page.close()


})();