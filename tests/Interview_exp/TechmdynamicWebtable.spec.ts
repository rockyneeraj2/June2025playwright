// what is dynamic webtable and handle


/*
For a **Senior SDET interview**, explain dynamic web tables as: **don’t depend on row numbers or hard-coded
 XPath. Find the row using unique business data, then locate the required cell/action inside that row.**

### 1. Real-time example

Suppose the table changes dynamically:

| ID  | Customer | Status  | Amount | Action |
| --- | -------- | ------- | -----: | ------ |
| 101 | Rahul    | Active  |  ₹5000 | Edit   |
| 102 | Neeraj   | Pending |  ₹7000 | Edit   |
| 103 | Amit     | Active  |  ₹3000 | Edit   |

You want to click **Edit for Neeraj**.

### 2. Best Playwright approach

```ts
import { test, expect } from '@playwright/test';

test('handle dynamic web table', async ({ page }) => {

  await page.goto('https://example.com/customers');

  // Find the row containing Neeraj
  const row = page.locator('table tbody tr').filter({
    hasText: 'Neeraj'
  });

  // Verify the row exists
  await expect(row).toBeVisible();

  // Get Status from the same row
  const status = row.locator('td').nth(2);
  await expect(status).toHaveText('Pending');

  // Click Edit only inside Neeraj's row
  await row.getByRole('button', { name: 'Edit' }).click();
});
```

### Why this is better

❌ Avoid:

```ts
await page.locator('table tbody tr:nth-child(2) td:nth-child(5)').click();
```

Because tomorrow the table could become:

```text
Rahul
Amit
Neeraj
```

Now `nth(2)` points to Amit.

Instead:

```ts
const row = page.locator('tr').filter({ hasText: 'Neeraj' });
```

The **business value identifies the row**, so the test survives row reordering.

---

## 3. If you need to read all rows

```ts
const rows = page.locator('table tbody tr');

const count = await rows.count();

for (let i = 0; i < count; i++) {

  const row = rows.nth(i);

  const cells = row.locator('td');

  const customer = await cells.nth(1).innerText();
  const status = await cells.nth(2).innerText();

  console.log(customer, status);
}
```

Output:

```text
Rahul Active
Neeraj Pending
Amit Active
```

---

## 4. Find a row based on multiple conditions

This is very common in real projects.

**Requirement:** Find customer `Neeraj` whose status is `Pending`, then click Delete.

```ts
const row = page.locator('table tbody tr').filter({
  hasText: 'Neeraj'
}).filter({
  hasText: 'Pending'
});

await expect(row).toBeVisible();

await row.getByRole('button', { name: 'Delete' }).click();
```

This is much safer than relying on row position.

---

## 5. Dynamic table with column names

Suppose you don't know that **Status is column 3**.

Table:

```text
Customer | Email | Status | Amount | Action
```

You can identify the column from the header.

```ts
const headers = page.locator('table thead th');

const headerCount = await headers.count();

let statusColumn = -1;

for (let i = 0; i < headerCount; i++) {

  const text = (await headers.nth(i).innerText()).trim();

  if (text === 'Status') {
    statusColumn = i;
    break;
  }
}

console.log('Status column:', statusColumn);
```

Then:

```ts
const row = page.locator('table tbody tr').filter({
  hasText: 'Neeraj'
});

const status = row.locator('td').nth(statusColumn);

console.log(await status.innerText());
```

This is useful when the application changes column order.

---

# 6. Pagination in dynamic tables

Suppose there are 100 customers but only 10 are displayed per page.

Requirement:

> Find customer `Neeraj` anywhere in the table.

```ts
while (true) {

  const row = page.locator('table tbody tr').filter({
    hasText: 'Neeraj'
  });

  if (await row.count() > 0) {

    console.log('Neeraj found');

    await row.getByRole('button', { name: 'Edit' }).click();
    break;
  }

  const nextButton = page.getByRole('button', { name: 'Next' });

  if (await nextButton.isDisabled()) {

    console.log('Customer not found');
    break;
  }

  await nextButton.click();
}
```

### Interview point

Don't just say:

> "I use `nth()` to handle tables."

Say:

> **"For dynamic tables, I avoid depending on row indexes. I identify the row using a unique business value
  such as customer ID, order number, or email, and then perform the required action within that row. For
   pagination, I iterate through pages until I find the target row or reach the last page."**

---

# 7. Best approach when the table has `data-testid`

If your application provides stable test IDs, use them.

```html
<tr data-testid="customer-row-102">
```

Playwright:

```ts
const row = page.getByTestId('customer-row-102');

await expect(row).toBeVisible();

await row.getByRole('button', { name: 'Edit' }).click();
```

For Senior SDET interviews, I would rank locator strategies roughly like:

```text
Stable data-testid
       ↓
Role + accessible name
       ↓
Unique business text / attributes
       ↓
CSS
       ↓
XPath
       ↓
nth() / positional XPath  ❌
```

---

## 8. Real interview scenario

**Interviewer:**
"You have 2,000 records in a web table. The rows are dynamically loaded and their order changes every refresh.
 You need to click Approve for order `ORD-10567`. How will you automate it?"

### Strong Senior SDET answer

> "I would not use a fixed row index because the table is dynamic. I would locate the row using the unique order
  ID `ORD-10567`. Once I identify that row, I scope the locator to that row and click the Approve action inside
   it. If the table uses pagination or lazy loading, I would handle pagination or scrolling until the record is
    found. I would also validate the expected status after the action using a web-first assertion."

```ts
const row = page.locator('table tbody tr').filter({
  hasText: 'ORD-10567'
});

await expect(row).toBeVisible();

await row.getByRole('button', { name: 'Approve' }).click();

await expect(row).toContainText('Approved');
```

### The key concept to remember

```text
Dynamic Table
     ↓
Find unique row
     ↓
Scope locator to row
     ↓
Find required cell/button
     ↓
Perform action
     ↓
Validate result
```

**This "find row → scope inside row → action → verify" pattern is one of the most important Playwright web-table
 patterns for Senior SDET interviews.**

*/