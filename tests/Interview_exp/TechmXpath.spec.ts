import { test, expect, Page, Locator } from '@playwright/test';

test('xpath spaces', async ({ page }) => {

    await page.goto("http://seleniumpractise.blogspot.com/2021/08/webtable-in-html.html");
    const xpath = await page.locator("//a[normalize-space()='Selenium Practise']").click();

    await page.waitForTimeout(3000);

});

/*
For a **Senior SDET interview**, don't learn XPath as a list of syntax rules. Understand **how to locate the correct element when the UI is dynamic**.

# XPath — Complete Interview Guide

## 1. What is XPath?

XPath is a locator/query language used to navigate an HTML/XML DOM and identify elements.

Example HTML:

```html
<input id="username" name="user" type="text">
```

XPath:

```xpath
//input[@id='username']
```

In Playwright:

```javascript
await page.locator("//input[@id='username']").fill("Neeraj");
```

### Interview answer

> “XPath is useful when I need to locate elements based on attributes, text, relationships, or dynamic DOM structures. In Playwright, I generally prefer role, label, text, or test-id locators first, and use XPath when those options are not practical.”

---

# 2. Absolute XPath vs Relative XPath

## Absolute XPath ❌

```xpath
/html/body/div[2]/div[1]/form/input[1]
```

Problem:

If one `div` is added, the XPath can break.

---

## Relative XPath ✅

```xpath
//input[@id='username']
```

This starts from anywhere in the DOM.

### Senior approach

Prefer:

```xpath
//input[@name='username']
```

over:

```xpath
/html/body/div[2]/div/form/div/input
```

---

# 3. XPath by ID

HTML:

```html
<input id="username" type="text">
```

XPath:

```xpath
//input[@id='username']
```

Playwright:

```javascript
await page.locator("//input[@id='username']").fill("Neeraj");
```

---

# 4. XPath by Attribute

HTML:

```html
<input name="email" type="text">
```

```xpath
//input[@name='email']
```

Multiple attributes:

```xpath
//input[@name='email' and @type='text']
```

OR:

```xpath
//input[@name='email' or @id='email']
```

### Difference

```xpath
//input[@name='email' and @type='text']
```

means **both conditions must match**.

```xpath
//input[@name='email' or @id='email']
```

means **at least one condition must match**.

---

# 5. XPath by Text ⭐

HTML:

```html
<button>Login</button>
```

XPath:

```xpath
//button[text()='Login']
```

Playwright:

```javascript
await page.locator("//button[text()='Login']").click();
```

But in Playwright, I would normally prefer:

```javascript
await page.getByRole('button', { name: 'Login' }).click();
```

---

# 6. `contains()` ⭐⭐⭐

Very important for dynamic elements.

HTML:

```html
<button id="loginButton_12345">Login</button>
```

Instead of:

```xpath
//button[@id='loginButton_12345']
```

Use:

```xpath
//button[contains(@id,'loginButton')]
```

Playwright:

```javascript
await page.locator("//button[contains(@id,'loginButton')]").click();
```

### Real-world example

Dynamic ID:

```text
customer_12345_edit
customer_98765_edit
customer_54321_edit
```

XPath:

```xpath
//button[contains(@id,'_edit')]
```

---

# 7. `starts-with()`

HTML:

```html
<input id="customer_12345">
```

XPath:

```xpath
//input[starts-with(@id,'customer_')]
```

Useful when the beginning of an attribute is stable.

---

# 8. `text()` vs `contains(text())`

Exact text:

```xpath
//button[text()='Save']
```

Partial text:

```xpath
//button[contains(text(),'Save')]
```

For:

```html
<button>Save Changes</button>
```

This works:

```xpath
//button[contains(text(),'Save')]
```

---

# 9. `normalize-space()` ⭐

Very useful when the UI contains extra spaces.

HTML:

```html
<button>
    Save
</button>
```

Use:

```xpath
//button[normalize-space()='Save']
```

It handles surrounding/extra whitespace better than exact text matching.

---

# 10. AND / OR conditions

### AND

```xpath
//input[@type='text' and @name='username']
```

### OR

```xpath
//input[@name='username' or @name='user']
```

Real example:

```javascript
const username = page.locator(
  "//input[@type='text' and (@name='username' or @id='username')]"
);
```

---

# 11. Parent

HTML:

```html
<div class="login">
    <input id="username">
</div>
```

Input → parent:

```xpath
//input[@id='username']/parent::div
```

Short form:

```xpath
//input[@id='username']/..
```

---

# 12. Child

HTML:

```html
<div class="login">
    <input id="username">
</div>
```

```xpath
//div[@class='login']/input
```

Or:

```xpath
//div[@class='login']//input
```

### Difference

`/input`

means direct child.

`//input`

means descendant at any level.

---

# 13. Descendant

HTML:

```html
<div class="login">
    <div>
        <form>
            <input id="username">
        </form>
    </div>
</div>
```

Use:

```xpath
//div[@class='login']//input
```

It finds the input anywhere inside that section.

---

# 14. Ancestor ⭐

Sometimes you start from the element and move upward.

HTML:

```html
<div class="customer">
    <div class="details">
        <span>Neeraj</span>
    </div>
</div>
```

XPath:

```xpath
//span[text()='Neeraj']/ancestor::div[@class='customer']
```

This finds the customer's parent container.

---

# 15. Following-sibling ⭐

HTML:

```html
<div>
    <label>Username</label>
    <input id="username">
</div>
```

Starting from label:

```xpath
//label[text()='Username']/following-sibling::input
```

This means:

> Find the input that comes after the Username label.

---

# 16. Preceding-sibling

HTML:

```html
<div>
    <label>Username</label>
    <input id="username">
</div>
```

Starting from input:

```xpath
//input[@id='username']/preceding-sibling::label
```

This finds the label before the input.

---

# 17. `following`

This is broader than `following-sibling`.

```xpath
//label[text()='Username']/following::input
```

It can find an input later in the document, not necessarily the same parent.

---

# 18. `preceding`

```xpath
//input[@id='username']/preceding::label
```

Finds matching labels earlier in the DOM.

---

# 19. XPath indexing ⭐

Suppose there are three buttons:

```html
<button>Edit</button>
<button>Edit</button>
<button>Edit</button>
```

You can use:

```xpath
(//button[text()='Edit'])[1]
```

Second:

```xpath
(//button[text()='Edit'])[2]
```

Third:

```xpath
(//button[text()='Edit'])[3]
```

### But senior answer:

Don't blindly use:

```xpath
//button[text()='Edit'][2]
```

or:

```javascript
page.locator("button").nth(1)
```

First try to make the locator unique using its **business context**.

---

# 20. Real Table Example ⭐⭐⭐

Suppose your application has:

| Customer | Subscription | Action |
| -------- | ------------ | ------ |
| Neeraj   | Basic        | Edit   |
| Rahul    | Pro          | Edit   |
| Amit     | Premium      | Edit   |

HTML might look like:

```html
<tr>
    <td>Neeraj</td>
    <td>Basic</td>
    <td><button>Edit</button></td>
</tr>
```

Bad:

```javascript
await page.getByRole('button', {name: 'Edit'}).first().click();
```

Why?

Because you don't know which customer you're editing.

### Better XPath

```xpath
//tr[.//td[normalize-space()='Neeraj']]//button[text()='Edit']
```

Playwright:

```javascript
await page.locator(
  "//tr[.//td[normalize-space()='Neeraj']]//button[text()='Edit']"
).click();
```

### Senior approach

Even better, use Playwright's locator chaining:

```javascript
const row = page.locator('tr').filter({ hasText: 'Neeraj' });

await row.getByRole('button', { name: 'Edit' }).click();
```

This is usually easier to maintain.

---

# 21. Real Subscription Example

Suppose:

```text
Neeraj | Basic | Edit
```

Click Edit:

```javascript
const row = page.locator('tr').filter({ hasText: 'Neeraj' });

await row.getByRole('button', { name: 'Edit' }).click();
```

Popup appears:

```text
Subscription
[ Basic ▼ ]

[ Save ]
```

Then:

```javascript
const dialog = page.getByRole('dialog');

await dialog.getByRole('combobox').selectOption('pro');

await dialog.getByRole('button', { name: 'Save' }).click();
```

The important concept isn't the XPath syntax.

It's:

```text
Find business entity
       ↓
Scope to its container
       ↓
Find action inside container
       ↓
Perform action
       ↓
Verify result
```

---

# 22. XPath with multiple attributes

HTML:

```html
<input
  type="text"
  name="username"
  placeholder="Enter username">
```

XPath:

```xpath
//input[@type='text' and @name='username']
```

Or:

```xpath
//input[@name='username' and @placeholder='Enter username']
```

---

# 23. XPath with class

HTML:

```html
<button class="btn btn-primary">Save</button>
```

Don't blindly use:

```xpath
//button[@class='btn btn-primary']
```

because classes may change.

Better:

```xpath
//button[contains(@class,'btn-primary')]
```

But if there is a stable accessible name:

```javascript
page.getByRole('button', {name: 'Save'})
```

is preferable.

---

# 24. Dynamic IDs ⭐⭐⭐

Suppose:

```html
<input id="input_839292">
```

Tomorrow:

```html
<input id="input_928371">
```

Don't use:

```xpath
//input[@id='input_839292']
```

Use:

```xpath
//input[starts-with(@id,'input_')]
```

or:

```xpath
//input[contains(@id,'input_')]
```

provided the matching pattern is actually stable.

---

# 25. XPath axes ⭐⭐⭐

These are important for senior interviews.

| Axis                | Meaning                      |
| ------------------- | ---------------------------- |
| `parent`            | Direct parent                |
| `child`             | Direct child                 |
| `ancestor`          | Any parent above             |
| `descendant`        | Elements below               |
| `following-sibling` | Siblings after               |
| `preceding-sibling` | Siblings before              |
| `following`         | Elements later in document   |
| `preceding`         | Elements earlier in document |

Example:

```xpath
//label[text()='Email']/following-sibling::input
```

Think:

```text
Label
  ↓
following-sibling
  ↓
Input
```

---

# 26. Real Form Example

HTML:

```html
<div class="form-group">
    <label>Email</label>
    <input type="email">
</div>
```

XPath:

```xpath
//label[text()='Email']/following-sibling::input
```

Playwright:

```javascript
await page.locator(
  "//label[text()='Email']/following-sibling::input"
).fill("neeraj@test.com");
```

But if the application has proper labels:

```javascript
await page.getByLabel('Email').fill('neeraj@test.com');
```

is preferable.

---

# 27. XPath for checkbox

HTML:

```html
<label>
  <input type="checkbox">
  Accept Terms
</label>
```

Possible XPath:

```xpath
//label[contains(.,'Accept Terms')]//input[@type='checkbox']
```

Playwright preferred:

```javascript
await page.getByLabel('Accept Terms').check();
```

---

# 28. XPath for radio button

```html
<label>
  <input type="radio" value="male">
  Male
</label>
```

XPath:

```xpath
//label[normalize-space()='Male']//input[@type='radio']
```

Playwright:

```javascript
await page.getByLabel('Male').check();
```

---

# 29. XPath for links

HTML:

```html
<a href="/customers/123">Customer Details</a>
```

XPath:

```xpath
//a[text()='Customer Details']
```

Dynamic text:

```xpath
//a[contains(text(),'Customer')]
```

Playwright:

```javascript
await page.getByRole('link', { name: 'Customer Details' }).click();
```

---

# 30. XPath for a button containing an icon

HTML:

```html
<button>
    <span class="icon"></span>
    Edit
</button>
```

Instead of trying to locate the icon:

```xpath
//button[.//span[contains(@class,'icon')]]
```

If the button has accessible name:

```javascript
page.getByRole('button', { name: 'Edit' })
```

is better.

---

# 31. XPath using `.`

This is a useful advanced concept.

Suppose:

```html
<tr>
    <td>Neeraj</td>
    <td>Basic</td>
</tr>
```

You can use:

```xpath
//tr[.//td[text()='Neeraj']]
```

The `.` means:

> Search within the current `tr`.

This is extremely useful for tables.

---

# 32. XPath `last()`

Suppose multiple matching elements exist:

```xpath
(//button[text()='Edit'])[last()]
```

Gets the last matching button.

Example:

```javascript
await page.locator("(//button[text()='Edit'])[last()]").click();
```

Again, use this only when "last" has actual business meaning.

---

# 33. XPath `position()`

```xpath
//tr[position()=2]
```

Gets the second row.

But in real automation, avoid depending on row position if the table can reorder.

---

# 34. XPath with `not()`

Suppose:

```html
<button>Delete</button>
<button disabled>Delete</button>
```

You could use:

```xpath
//button[text()='Delete' and not(@disabled)]
```

---

# 35. XPath for disabled elements

```xpath
//button[@disabled]
```

Enabled:

```xpath
//button[not(@disabled)]
```

But Playwright assertions are usually cleaner:

```javascript
await expect(
  page.getByRole('button', {name: 'Save'})
).toBeEnabled();
```

---

# 36. XPath inside a modal ⭐

Suppose multiple `Save` buttons exist on the page.

Don't do:

```javascript
await page.getByRole('button', {name: 'Save'}).last().click();
```

Instead:

```javascript
const dialog = page.getByRole('dialog');

await dialog.getByRole('button', {name: 'Save'}).click();
```

Or XPath:

```xpath
//div[@role='dialog']//button[normalize-space()='Save']
```

The senior concept is **scoping**.

---

# 37. XPath in iframe

If the element is inside an iframe, normal page XPath may not work.

Use:

```javascript
const frame = page.frameLocator('#payment-frame');

await frame.getByLabel('Card Number').fill('4111111111111111');
```

If you need XPath:

```javascript
await frame.locator("//input[@name='cardNumber']").fill("4111...");
```

---

# 38. XPath with `@href`

HTML:

```html
<a href="/customer/12345">Customer</a>
```

XPath:

```xpath
//a[@href='/customer/12345']
```

Dynamic:

```xpath
//a[contains(@href,'/customer/')]
```

This is useful when the ID portion changes.

---

# 39. XPath for partial attribute

```xpath
//input[contains(@placeholder,'username')]
```

For:

```html
placeholder="Enter your username"
```

it matches.

---

# 40. XPath functions you should know

For interviews:

```text
text()
contains()
starts-with()
normalize-space()
last()
position()
not()
```

Most commonly used:

```text
contains()
text()
normalize-space()
```

---

# 41. XPath vs Playwright locators ⭐⭐⭐

This is a very important **Senior SDET question**.

### Interviewer:

> "Do you prefer XPath in Playwright?"

Good answer:

> “I use XPath when it solves a relationship or dynamic DOM problem, but I don't make XPath the default locator strategy. In Playwright I first prefer user-facing locators such as `getByRole`, `getByLabel`, `getByText`, or stable `getByTestId`. If I need to traverse a complex DOM relationship, such as finding an Edit button within a specific customer row, XPath can be useful.”

---

# 42. Locator priority I would use

In a real Playwright framework:

```text
1. getByRole()
       ↓
2. getByLabel()
       ↓
3. getByTestId()
       ↓
4. getByPlaceholder()
       ↓
5. getByText()
       ↓
6. CSS
       ↓
7. XPath
```

This isn't an absolute rule. The important point is **stability and user-facing meaning**, not "never use XPath."

---

# 43. Real interview scenario

### Interviewer:

> "There are 100 customers. Each row has an Edit button. How will you click Edit only for Neeraj?"

### Weak answer ❌

```javascript
await page.locator('button').nth(5).click();
```

Why?

Because it depends on position.

### Better answer ✅

```javascript
const row = page.locator('tr').filter({ hasText: 'Neeraj' });

await row.getByRole('button', { name: 'Edit' }).click();
```

### XPath alternative:

```javascript
await page.locator(
  "//tr[.//td[normalize-space()='Neeraj']]//button[normalize-space()='Edit']"
).click();
```

### Senior explanation:

> “I first identify the customer row and then scope the Edit action to that row. This prevents accidentally clicking another customer's Edit button and makes the test independent of table ordering.”

---

# 44. Dynamic dropdown example

Suppose:

```text
Customer: Neeraj
Subscription: Basic
Action: Edit
```

After Edit:

```text
Subscription
[ Basic ▼ ]
```

Select Pro.

XPath:

```xpath
//div[@role='dialog']//button[contains(@class,'dropdown')]
```

Then:

```javascript
await page.locator(
  "//div[@role='dialog']//button[contains(@class,'dropdown')]"
).click();

await page.getByText('Pro', { exact: true }).click();
```

Verify:

```javascript
await expect(
  page.getByRole('dialog').getByText('Pro')
).toBeVisible();
```

---

# 45. Common XPath mistakes ❌

### Mistake 1 — Absolute XPath

```xpath
/html/body/div[2]/div[3]/button
```

Too fragile.

---

### Mistake 2 — Using indexes everywhere

```xpath
(//button)[7]
```

UI changes can break it.

---

### Mistake 3 — Dynamic attributes

```xpath
//input[@id='input_827362']
```

If the ID changes, test breaks.

---

### Mistake 4 — Very long XPath

```xpath
/html/body/div[2]/div/div[1]/section/div/form/div[3]/input
```

Hard to maintain.

---

### Mistake 5 — Ignoring Playwright's built-in locators

Instead of:

```xpath
//button[text()='Login']
```

consider:

```javascript
page.getByRole('button', { name: 'Login' })
```

---

# 46. The most important mental model 🧠

When an interviewer gives you a difficult XPath problem, don't immediately start writing syntax.

Think:

```text
What element?
      ↓
What makes it unique?
      ↓
Is there a stable attribute?
      ↓
Can I identify it by role/name?
      ↓
If not, what is its relationship?
      ↓
Parent / child / sibling / ancestor?
      ↓
Scope to the correct component
      ↓
Perform action
      ↓
Verify result
```

---

# 47. Senior SDET interview answer

If they ask:

> **"How do you handle dynamic XPath in Playwright?"**

Say:

> “First I identify which part of the DOM is stable. I avoid absolute XPath and hardcoded indexes. For dynamic attributes, I use functions such as `contains()`, `starts-with()`, and `normalize-space()`. For complex relationships, I use parent, ancestor, child, or sibling axes. In Playwright, I also scope locators to the relevant row, dialog, or component rather than using a global locator. Whenever possible, I prefer Playwright's role, label, or test-id locators because they are generally more maintainable.”

### One line to remember:

**Stable element → stable relationship → scoped locator → action → assertion.**

*/