// tests/example.spec.js
const { test, expect } = require('@playwright/test');

test('basic MCP server test', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/MCP/); // This will fail unless the server sets a title
});
