// tests/facebook-login.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Facebook.com basic tests', () => {
  test('Homepage loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Facebook/);
    await expect(page.locator('text=Create new account')).toBeVisible();
  });

  // Add more tests as needed, e.g., login, navigation, etc.
});
