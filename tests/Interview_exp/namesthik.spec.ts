import { test, expect } from '@playwright/test';

test('Update cab subscription from Basic to Pro', async ({ page }) => {

  await page.goto('https://example.com/subscriptions');

  // Find the row containing "cab"
  const row = page.locator('tr').filter({ hasText: 'cab' });

  // Click Edit inside the cab row
  await row.getByRole('button', { name: 'Edit' }).click();

  // Verify popup is displayed
  const popup = page.getByRole('dialog');
  await expect(popup).toBeVisible();

  // Select subscription = Pro
  await popup.getByRole('combobox', { name: /subscription/i })
              .selectOption({ label: 'Pro' });

  // Click Save
  await popup.getByRole('button', { name: 'Save' }).click();

  // Verify popup closed
  await expect(popup).not.toBeVisible();

  // Verify cab subscription is updated to Pro
  await expect(row).toContainText('Pro');
});

/*

Below is a **real-time Playwright JavaScript example** for your table scenario:

**Requirement:** Find the `cab` row → click its **Edit** button → popup opens → change subscription from **Basic → Pro** → click **Save** → verify `cab` is updated to **Pro**.

```javascript
import { test, expect } from '@playwright/test';

test('Update cab subscription from Basic to Pro', async ({ page }) => {

  await page.goto('https://example.com/subscriptions');

  // Find the row containing "cab"
  const row = page.locator('tr').filter({ hasText: 'cab' });

  // Click Edit inside the cab row
  await row.getByRole('button', { name: 'Edit' }).click();

  // Verify popup is displayed
  const popup = page.getByRole('dialog');
  await expect(popup).toBeVisible();

  // Select subscription = Pro
  await popup.getByRole('combobox', { name: /subscription/i })
              .selectOption({ label: 'Pro' });

  // Click Save
  await popup.getByRole('button', { name: 'Save' }).click();

  // Verify popup closed
  await expect(popup).not.toBeVisible();

  // Verify cab subscription is updated to Pro
  await expect(row).toContainText('Pro');
});
```

### If the subscription is a custom dropdown

If it is not a `<select>` element and clicking the dropdown shows options:

```javascript
const row = page.locator('tr').filter({ hasText: 'cab' });

await row.getByRole('button', { name: 'Edit' }).click();

const popup = page.getByRole('dialog');

await popup.getByText('Basic').click();

await page.getByRole('option', { name: 'Pro' }).click();

await popup.getByRole('button', { name: 'Save' }).click();

await expect(row).toContainText('Pro');
```

### Interview explanation

You can explain it like this:

> "I first locate the table row based on the unique subscription name `cab`. Then I scope my locator to that row
  and click its Edit button. Once the dialog opens, I select `Pro` from the subscription dropdown, click Save,
   and finally verify that the `cab` row contains `Pro`. I prefer row-level locators because they prevent 
   accidentally clicking the Edit button belonging to another row."

**Key point:** Don't do this:

```javascript
await page.getByRole('button', { name: 'Edit' }).nth(1).click();
```

Instead, use the row:

```javascript
const row = page.locator('tr').filter({ hasText: 'cab' });
await row.getByRole('button', { name: 'Edit' }).click();
```

That makes the test **data-driven and much less brittle**.

*/