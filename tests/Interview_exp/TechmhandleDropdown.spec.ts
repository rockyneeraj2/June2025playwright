/*

Absolutely. For a **Senior SDET Playwright interview**, don't memorize “dropdown methods.” First identify **what kind of dropdown the application is using**. The implementation determines how you automate it.

# Playwright Dropdown Handling — All Real Scenarios

## 1. Native HTML `<select>` dropdown

### Real application example

Imagine a subscription page:

```text
Subscription:
[ Basic ▼ ]

Basic
Pro
Premium
```

HTML:

```html
<select id="subscription">
  <option value="basic">Basic</option>
  <option value="pro">Pro</option>
  <option value="premium">Premium</option>
</select>
```

### Playwright

```ts
await page.locator('#subscription').selectOption('pro');
```

You can select by:

### Value

```ts
await page.locator('#subscription').selectOption('pro');
```

### Visible text

```ts
await page.locator('#subscription')
  .selectOption({ label: 'Pro' });
```

### Index

```ts
await page.locator('#subscription')
  .selectOption({ index: 1 });
```

### Verify

```ts
await expect(
  page.locator('#subscription')
).toHaveValue('pro');
```

### Interview answer

> “If it's a native HTML select element, I use Playwright's `selectOption()` and can select by value, label, or index.”

---

# 2. Custom dropdown

This is **very common in real applications**.

It may look like a dropdown:

```text
Subscription
┌──────────────┐
│ Basic     ▼  │
└──────────────┘
```

But HTML may actually be:

```html
<div role="combobox">
  Basic
</div>
```

There is no `<select>`.

Therefore:

❌ Don't use:

```ts
selectOption()
```

Instead:

```ts
await page.getByRole('combobox').click();

await page.getByRole('option', {
  name: 'Pro'
}).click();
```

### Think like this

```text
Click dropdown
      ↓
Options appear
      ↓
Find required option
      ↓
Click option
```

---

# 3. Dropdown with `div` elements

Another real-world implementation:

```html
<div class="dropdown">
  <div class="selected">Basic</div>

  <div class="options">
    <div>Basic</div>
    <div>Pro</div>
    <div>Premium</div>
  </div>
</div>
```

Playwright:

```ts
await page.locator('.selected').click();

await page.getByText('Pro', { exact: true }).click();
```

Better if the application has accessible roles:

```ts
await page.getByRole('combobox').click();
await page.getByText('Pro', { exact: true }).click();
```

---

# 4. Dropdown where options are generated after clicking

Example:

```text
Country
[ Select Country ▼ ]

Click

India
United States
Japan
Canada
```

The options don't exist in the DOM until the dropdown opens.

Use:

```ts
await page.getByRole('combobox', {
  name: 'Country'
}).click();

await page.getByRole('option', {
  name: 'India'
}).click();
```

### Important interview concept

You don't need to add a manual wait just because the options appear dynamically.

Playwright waits for the locator/action when possible.

---

# 5. Searchable dropdown

This is extremely common.

Example:

```text
Country
[ Type country... ]

Type:
Ind

India
Indonesia
```

Automation:

```ts
await page.getByRole('combobox', {
  name: 'Country'
}).fill('Ind');

await page.getByText('India', {
  exact: true
}).click();
```

Or if the component requires clicking first:

```ts
await page.getByRole('combobox').click();

await page.getByRole('combobox').fill('Ind');

await page.getByRole('option', {
  name: 'India'
}).click();
```

---

# 6. Auto-suggest dropdown

Real example:

```text
Search customer
[ Nee ]

Suggestions:
Neeraj Kumar
Neeraj Sharma
Neelam Singh
```

Code:

```ts
await page.getByPlaceholder('Search customer').fill('Nee');

await page.getByText('Neeraj Kumar', {
  exact: true
}).click();
```

### Interview explanation

> “For autocomplete controls, I enter the partial value, wait for the suggestion list through a locator, and select the exact matching option.”

---

# 7. Multiple-select dropdown

Example:

```text
Roles
[ Select roles ▼ ]

☑ Admin
☑ Manager
☐ Tester
```

If it's a native multi-select:

```ts
await page.locator('#roles').selectOption([
  'admin',
  'manager'
]);
```

Verify:

```ts
await expect(
  page.locator('#roles')
).toHaveValues(['admin', 'manager']);
```

For a custom component:

```ts
await page.getByRole('combobox', {
  name: 'Roles'
}).click();

await page.getByText('Admin').click();
await page.getByText('Manager').click();
```

Then close the dropdown if required.

---

# 8. Dropdown inside a table row

This is a **very good Senior SDET interview scenario**.

Imagine:

```text
Customer       Subscription     Action
------------------------------------------
Neeraj         Basic             Edit
Rahul          Pro               Edit
Amit           Basic             Edit
```

Requirement:

> Change **Neeraj's** subscription from Basic to Pro.

Don't do:

```ts
await page.getByRole('button', {
  name: 'Edit'
}).first().click();
```

Because you're assuming row order.

Instead:

```ts
const row = page.locator('tr').filter({
  hasText: 'Neeraj'
});

await row.getByRole('button', {
  name: 'Edit'
}).click();
```

Then:

```ts
const dialog = page.getByRole('dialog');

await dialog.getByRole('combobox')
  .selectOption('pro');

await dialog.getByRole('button', {
  name: 'Save'
}).click();
```

### Why this is senior-level

You're using:

```text
Customer
   ↓
Specific row
   ↓
Edit
   ↓
Specific popup
   ↓
Specific dropdown
   ↓
Pro
```

instead of relying on `.first()` or `.nth()`.

---

# 9. Dropdown inside a popup/modal

Example:

```text
┌─────────────────────────────┐
│ Edit Customer               │
│                             │
│ Country     [India ▼]       │
│ Subscription [Basic ▼]      │
│                             │
│              Save           │
└─────────────────────────────┘
```

Use the dialog as a scope:

```ts
const dialog = page.getByRole('dialog');

await dialog
  .getByRole('combobox', {
    name: 'Subscription'
  })
  .click();

await dialog
  .getByRole('option', {
    name: 'Pro'
  })
  .click();
```

### Why scope it?

The page might have several comboboxes.

```text
Page
 ├── Country dropdown
 ├── Search dropdown
 ├── Profile dropdown
 └── Edit dialog
       └── Subscription dropdown
```

Scoping prevents ambiguity.

---

# 10. Dropdown inside an iframe

Suppose a third-party payment/application component is inside:

```html
<iframe>
```

First locate the frame:

```ts
const frame = page.frameLocator('#payment-frame');
```

Then interact:

```ts
await frame
  .getByRole('combobox', {
    name: 'Country'
  })
  .click();

await frame
  .getByRole('option', {
    name: 'India'
  })
  .click();
```

### Interview answer

> “If the dropdown is inside an iframe, I first switch to the iframe using `frameLocator()` and then interact with the elements inside that frame.”

---

# 11. Shadow DOM dropdown

Modern applications sometimes use Web Components.

Playwright generally handles **open Shadow DOM** through locators.

For example:

```ts
await page.getByRole('combobox').click();
```

or:

```ts
await page.locator('my-dropdown')
  .getByRole('option', { name: 'Pro' })
  .click();
```

### Interview point

> “I don't automatically use JavaScript to penetrate Shadow DOM. I first try Playwright's locator support, because Playwright can work with open Shadow DOM.”

---

# 12. Dropdown with duplicate options

Imagine the page contains:

```text
Customer 1 → Pro
Customer 2 → Pro
Customer 3 → Pro
```

This:

```ts
await page.getByText('Pro').click();
```

could match multiple elements.

Instead:

```ts
const row = page.locator('tr').filter({
  hasText: 'Neeraj'
});

await row.getByRole('combobox').click();

await page.getByRole('option', {
  name: 'Pro'
}).click();
```

Or scope the options to the component/dialog if appropriate.

### Principle

> **Make the locator unique before interacting.**

---

# 13. Select option and verify

Interviewers often ask:

> “How do you verify that the dropdown value was selected?”

Native select:

```ts
await page.locator('#subscription')
  .selectOption('pro');

await expect(
  page.locator('#subscription')
).toHaveValue('pro');
```

Custom dropdown:

```ts
await page.getByRole('combobox').click();

await page.getByRole('option', {
  name: 'Pro'
}).click();

await expect(
  page.getByRole('combobox')
).toHaveText('Pro');
```

The exact assertion depends on how the component represents its selected state.

---

# 14. Select dropdown value based on test data

Suppose your test data says:

```json
{
  "customer": "Neeraj",
  "subscription": "Pro"
}
```

Then:

```ts
const data = {
  customer: 'Neeraj',
  subscription: 'pro'
};

await page
  .locator('#subscription')
  .selectOption(data.subscription);
```

This makes the test data-driven.

---

# 15. Verify all dropdown options

Interviewer:

> “How would you verify that all expected values are available?”

Example:

```ts
const expected = ['Basic', 'Pro', 'Premium'];

await page.getByRole('combobox').click();

const options = page.getByRole('option');

await expect(options).toHaveText(expected);
```

For more complex situations, retrieve the option texts:

```ts
const actual = await page
  .getByRole('option')
  .allTextContents();

expect(actual).toEqual(expected);
```

---

# 16. Handle dropdown with API-loaded options

Real scenario:

```text
Click Country
       ↓
GET /api/countries
       ↓
India
USA
Japan
       ↓
Options displayed
```

You can synchronize with the API:

```ts
const responsePromise = page.waitForResponse(
  response => response.url().includes('/api/countries')
);

await page.getByRole('combobox', {
  name: 'Country'
}).click();

const response = await responsePromise;

expect(response.status()).toBe(200);

await page.getByRole('option', {
  name: 'India'
}).click();
```

This is useful when dropdown options are loaded asynchronously.

---

# 17. Keyboard handling

Sometimes the component is easier to use through keyboard.

Example:

```ts
const dropdown = page.getByRole('combobox');

await dropdown.focus();

await dropdown.press('ArrowDown');
await dropdown.press('Enter');
```

For a searchable dropdown:

```ts
await dropdown.fill('India');
await dropdown.press('Enter');
```

Use keyboard interaction when it represents the real user interaction or the component requires it.

---

# 18. Disabled dropdown

Interviewer:

> “How do you verify that a dropdown is disabled?”

```ts
await expect(
  page.getByRole('combobox', {
    name: 'State'
  })
).toBeDisabled();
```

Then select Country:

```ts
await page.getByRole('combobox', {
  name: 'Country'
}).selectOption('India');
```

And verify State becomes enabled:

```ts
await expect(
  page.getByRole('combobox', {
    name: 'State'
  })
).toBeEnabled();
```

---

# 19. Dependent dropdown

This is a **very common real-world scenario**.

```text
Country
[ India ▼ ]

        ↓

State
[ Karnataka ▼ ]

        ↓

City
[ Bangalore ▼ ]
```

The State dropdown depends on Country.

```ts
await page.getByRole('combobox', {
  name: 'Country'
}).selectOption('india');

await expect(
  page.getByRole('combobox', {
    name: 'State'
  })
).toBeEnabled();

await page.getByRole('combobox', {
  name: 'State'
}).selectOption('karnataka');
```

Then:

```ts
await expect(
  page.getByRole('combobox', {
    name: 'City'
  })
).toBeEnabled();

await page.getByRole('combobox', {
  name: 'City'
}).selectOption('bangalore');
```

### The important thought

Don't just test:

```text
India selected
```

Test the **business dependency**:

```text
India
 ↓
Karnataka available
 ↓
Karnataka selected
 ↓
Bangalore available
```

---

# 20. Most important interview question

### Interviewer:

> **“How do you handle dropdowns in Playwright?”**

### Short Senior SDET answer:

> “First I identify whether it is a native HTML select or a custom dropdown. For a native select, I use `selectOption()` with value or label. For custom dropdowns, I click the dropdown and select the required option using role-based or stable locators. For searchable dropdowns, I enter the search value and select the matching suggestion. If the dropdown is inside a table, modal or iframe, I scope the locator to that component first. For dynamic options, I synchronize with the actual UI or API condition rather than using hardcoded waits, and I always verify the selected value.”

---

# 🔥 The decision tree you should understand

Don't memorize 20 methods. Remember this:

```text
              DROPDOWN
                  │
          What type is it?
                  │
        ┌─────────┴─────────┐
        ↓                   ↓
   HTML <select>        Custom UI
        │                   │
        ↓                   ↓
  selectOption()       Click dropdown
                            │
                            ↓
                      Options appear
                            │
                  ┌─────────┴─────────┐
                  ↓                   ↓
              Searchable          Normal
                  │                   │
                  ↓                   ↓
             Type value          Click option
                  │
                  ↓
             Select option
```

And then ask:

```text
Is it inside...
    ↓
Table? → Scope to row
Modal? → Scope to dialog
Iframe? → frameLocator()
Shadow DOM? → Use supported locators
Dynamic? → Wait for real condition
Multiple? → Make locator unique
Dependent? → Validate state transition
```

## ⭐ One real interview scenario

> **“You have 100 customers in a table. Every customer has an Edit button. You need to change only Neeraj's subscription from Basic to Pro. How will you automate it?”**

Your thought process should immediately be:

```text
Find Neeraj's row
      ↓
Scope to that row
      ↓
Click Edit
      ↓
Scope to dialog
      ↓
Find Subscription dropdown
      ↓
Select Pro
      ↓
Save
      ↓
Verify Pro
```

That is the kind of **real framework thinking** interviewers look for in a Senior SDET.


*/