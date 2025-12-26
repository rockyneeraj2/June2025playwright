// 1. with Test() block():

import { test, expect } from '@playwright/test';

test('check page title', async ({ page }) => {
  await page.goto('https://www.google.com')
  let title = await page.title()
  console.log('page title: ' + title)
  expect(title).toBe('Google')

})