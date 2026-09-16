/*

## Auto-waiting in Playwright — understand it, don't memorize it

The easiest way to understand Playwright auto-waiting is:

> **You tell Playwright what you want to do, and Playwright waits for the element to become actionable before 
 performing the action.**

For example:

```ts
await page.getByRole('button', { name: 'Login' }).click();
```

Playwright doesn't blindly click immediately. It waits for the button to satisfy the required **actionability
 checks**.

---

## 1. Real-time example

Imagine your login page behaves like this:

```text
Open Login Page
      ↓
Loading...
      ↓
Username appears
      ↓
Password appears
      ↓
Login button becomes enabled
```

Your test:

```ts
import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {

  await page.goto('https://example.com/login');

  await page.getByLabel('Username').fill('neeraj');

  await page.getByLabel('Password').fill('Password123');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Dashboard')).toBeVisible();
});
```

You **don't need**:

```ts
await page.waitForTimeout(5000);
```

before every action.

Playwright automatically waits for the elements to become usable.

---

# 2. What does Playwright actually wait for?

For an action like:

```ts
await button.click();
```

Playwright checks things such as:

```text
Button locator
      ↓
Does element exist?
      ↓
Is it visible?
      ↓
Is it stable?
      ↓
Is it enabled?
      ↓
Can it receive pointer events?
      ↓
CLICK
```

This is called **actionability**.

For example, if a button is temporarily disabled:

```html
<button disabled>Login</button>
```

and later becomes:

```html
<button>Login</button>
```

Playwright can wait for it to become actionable before clicking.

---

# 3. Auto-wait vs hard wait

### ❌ Bad approach

```ts
await page.waitForTimeout(5000);

await page.getByRole('button', { name: 'Login' }).click();
```

You're saying:

> "Wait exactly 5 seconds whether the application needs it or not."

If the application is ready after 500 ms, you unnecessarily waste time.

If the application takes 7 seconds, 5 seconds isn't enough.

---

### ✅ Better approach

```ts
await page.getByRole('button', { name: 'Login' }).click();
```

Playwright waits according to the configured timeout until the action can happen.

---

# 4. Auto-wait for dynamic element

Imagine an **Add Customer** button appears after an API call.

```text
Page opens
    ↓
API call
    ↓
Customer data loads
    ↓
Add Customer button appears
```

You can simply do:

```ts
await page.getByRole('button', {
  name: 'Add Customer'
}).click();
```

You don't need:

```ts
await page.waitForTimeout(3000);
```

---

# 5. Auto-wait with assertions

This is extremely important for interviews.

Suppose after clicking Login, the dashboard takes time to load.

```ts
await page.getByRole('button', { name: 'Login' }).click();

await expect(
  page.getByRole('heading', { name: 'Dashboard' })
).toBeVisible();
```

`toBeVisible()` automatically waits for the expected condition.

So:

```text
click Login
     ↓
Application processes login
     ↓
Dashboard loads
     ↓
Playwright waits
     ↓
Dashboard visible
     ↓
Assertion passes
```

This is called a **web-first assertion**.

---

# 6. Auto-wait does NOT mean "wait for everything"

This is a very important Senior SDET interview point.

Suppose you do:

```ts
await page.waitForTimeout(5000);
```

That's a hard wait.

Playwright's auto-wait is primarily associated with **actions and assertions**. It doesn't mean Playwright
 automatically understands every business condition in your application.

For example:

```text
API completed
but
Business processing still running
```

You may need to wait for a meaningful application state:

```ts
await expect(
  page.getByText('Order completed')
).toBeVisible();
```

rather than:

```ts
await page.waitForTimeout(5000);
```

---

# 7. Example: Dynamic table

Suppose your application loads a customer table dynamically.

```ts
const row = page.locator('tr').filter({
  hasText: 'Neeraj'
});

await expect(row).toBeVisible();

await row.getByRole('button', { name: 'Edit' }).click();
```

Here:

```ts
await expect(row).toBeVisible();
```

waits until the row becomes visible.

Then:

```ts
await row.getByRole('button', { name: 'Edit' }).click();
```

uses Playwright's actionability waiting for the button.

---

# 8. Example: Button initially disabled

Imagine:

```text
Username     [             ]
Password     [             ]

Login [disabled]
```

After entering valid credentials:

```text
Login [enabled]
```

You can write:

```ts
await page.getByLabel('Username').fill('neeraj');

await page.getByLabel('Password').fill('Password123');

await page.getByRole('button', {
  name: 'Login'
}).click();
```

Playwright waits for the button to become actionable.

You generally don't need:

```ts
await page.waitForTimeout(2000);
```

---

# 9. Auto-wait vs explicit wait

This distinction is frequently asked.

### Auto-wait

Built into Playwright actions:

```ts
await page.getByRole('button', { name: 'Submit' }).click();
```

### Explicit/condition-based wait

You explicitly wait for a known condition:

```ts
await page.waitForSelector('#result');
```

or preferably:

```ts
await expect(page.locator('#result')).toBeVisible();
```

### Hard wait

```ts
await page.waitForTimeout(5000);
```

This is simply a fixed delay and should generally be avoided for synchronization.

---

# 10. Real project example for interview

Suppose you're testing a **healthcare claim application**.

Flow:

```text
Login
 ↓
Search Member
 ↓
Member API call
 ↓
Member details displayed
 ↓
Create Claim button enabled
 ↓
Submit Claim
 ↓
Claim processing
 ↓
Claim status = Submitted
```

Your Playwright test might look like:

```ts
await page.getByLabel('Member ID').fill('MEM1001');

await page.getByRole('button', {
  name: 'Search'
}).click();

await expect(
  page.getByText('Member Details')
).toBeVisible();

await page.getByRole('button', {
  name: 'Create Claim'
}).click();

await page.getByLabel('Claim Amount').fill('5000');

await page.getByRole('button', {
  name: 'Submit Claim'
}).click();

await expect(
  page.getByText('Claim Submitted')
).toBeVisible();
```

Notice there are **no arbitrary sleeps**.

---

# 11. What happens when auto-wait times out?

Suppose:

```ts
await page.getByRole('button', {
  name: 'Submit'
}).click();
```

but the button never becomes actionable.

Eventually Playwright throws a timeout error.

Then you investigate:

```text
Timeout
  ↓
Is locator correct?
  ↓
Element exists?
  ↓
Visible?
  ↓
Enabled?
  ↓
Overlay blocking it?
  ↓
Iframe?
  ↓
Application defect?
```

This is exactly how you should troubleshoot it as an SDET.

---

# ⭐ Senior SDET interview answer

If the interviewer asks:

**"What is auto-waiting in Playwright?"**

Say:

> **"Playwright has built-in auto-waiting for actions and assertions. Before performing an action such as click 
 or fill, Playwright waits for the element to satisfy the required actionability conditions, such as being 
 available, visible, stable and enabled where applicable. Similarly, web-first assertions such as
  `toBeVisible()` wait until the expected condition is met. Because of this, I generally avoid hard-coded 
  `waitForTimeout()` calls. In my framework, I use locators, auto-waiting and meaningful assertions based on 
  application state, which makes tests more reliable and less flaky."**

### Remember this flow:

```text
            PLAYWRIGHT TEST
                  ↓
              LOCATOR
                  ↓
        ┌───────────────────┐
        │   Auto Waiting    │
        │                   │
        │ Visible           │
        │ Stable            │
        │ Enabled           │
        │ Receives events   │
        └───────────────────┘
                  ↓
               ACTION
                  ↓
          WEB-FIRST ASSERTION
                  ↓
               RESULT
```

**The key Senior SDET point:** Auto-waiting reduces synchronization problems, but it **doesn't replace proper 
application-state waits**. You still need to wait for meaningful business conditions when the UI depends on
 API calls, background processing, or other application state.


*/