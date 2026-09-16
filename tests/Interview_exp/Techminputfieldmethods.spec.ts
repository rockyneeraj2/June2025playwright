// what are the method we have for input field text boxes

/*

In Playwright, for **input fields / text boxes**, you mainly use a few important methods. For a Senior
 SDET interview, focus especially on `fill()`, `pressSequentially()`, `clear()`, `press()`, and assertions.

## 1. `fill()` — Most commonly used

Enters the complete value into an input field.

```ts
const username = page.getByLabel('Username');

await username.fill('neeraj');
```

To replace existing text:

```ts
await username.fill('newvalue');
```

**Best choice for normal text fields.**

---

## 2. `pressSequentially()` — Type character by character

```ts
await page.getByLabel('Username')
  .pressSequentially('neeraj');
```

With delay:

```ts
await page.getByLabel('Username')
  .pressSequentially('neeraj', { delay: 100 });
```

Useful when the application depends on **individual keyboard events**, such as autocomplete/search fields.

### Difference

```text
fill()
  ↓
Sets complete value

pressSequentially()
  ↓
Types N → E → E → R → A → J
```

---

## 3. `clear()` — Clear existing text

```ts
await page.getByLabel('Username').clear();
```

Example:

```ts
const username = page.getByLabel('Username');

await username.fill('neeraj');

await username.clear();

await expect(username).toHaveValue('');
```

---

## 4. `press()` — Press a keyboard key

```ts
await page.getByLabel('Username').press('Enter');
```

Other examples:

```ts
await username.press('Tab');

await username.press('Escape');

await username.press('Control+A');

await username.press('Backspace');
```

Very useful after entering text.

Example:

```ts
await page.getByPlaceholder('Search').fill('India');

await page.getByPlaceholder('Search').press('Enter');
```

---

## 5. `click()` — Focus the textbox

```ts
await page.getByLabel('Username').click();
```

You can then perform keyboard actions:

```ts
await username.click();
await username.pressSequentially('neeraj');
```

Normally `fill()` handles the necessary interaction itself, so you don't need `click()` before every `fill()`.

---

## 6. `type()` — Important interview point

You may see older Playwright code using:

```ts
await username.type('neeraj');
```

But for modern Playwright, **prefer `fill()` or `pressSequentially()`** depending on the requirement.

For character-by-character typing, `pressSequentially()` is the better current approach.

---

# 7. `inputValue()` — Read the entered value

```ts
const value = await username.inputValue();

console.log(value);
```

Example:

```ts
await username.fill('neeraj');

const value = await username.inputValue();

console.log(value);
```

Output:

```text
neeraj
```

---

# 8. `toHaveValue()` — Verify the text

This is extremely important for automation.

```ts
await username.fill('neeraj');

await expect(username).toHaveValue('neeraj');
```

This is better than:

```ts
const value = await username.inputValue();
expect(value).toBe('neeraj');
```

because `toHaveValue()` is a **web-first assertion** and automatically waits for the expected value.

---

# 9. `focus()`

You can explicitly focus an input:

```ts
await username.focus();
```

Example:

```ts
await username.focus();
await username.pressSequentially('neeraj');
```

Useful when testing keyboard/focus behavior.

---

# 10. `blur()`

Remove focus from the textbox:

```ts
await username.blur();
```

Example:

```ts
await username.fill('neeraj');
await username.blur();
```

This can be useful when validation happens only after the field loses focus.

For example:

```text
Username
[ neeraj          ]
        ↓
       blur
        ↓
Validation message appears
```

---

# 11. Get textbox using different locators

### By label — preferred

```ts
await page.getByLabel('Username').fill('neeraj');
```

### By placeholder

```ts
await page.getByPlaceholder('Enter username').fill('neeraj');
```

### By role

```ts
await page.getByRole('textbox').fill('neeraj');
```

### By test ID

```ts
await page.getByTestId('username').fill('neeraj');
```

### CSS

```ts
await page.locator('#username').fill('neeraj');
```

### XPath

```ts
await page.locator('//input[@id="username"]').fill('neeraj');
```

For a Senior SDET interview, say:

> "I prefer accessible and stable locators such as `getByLabel`, `getByRole`, or `getByTestId` instead of
  brittle XPath."

---

# Most important methods to remember

| Method                | Purpose                     |
| --------------------- | --------------------------- |
| `fill()`              | Enter/replace complete text |
| `pressSequentially()` | Type character by character |
| `clear()`             | Clear textbox               |
| `press()`             | Keyboard actions            |
| `click()`             | Focus/click field           |
| `focus()`             | Set focus                   |
| `blur()`              | Remove focus                |
| `inputValue()`        | Read current value          |
| `toHaveValue()`       | Verify input value          |

### Interview scenario

**Interviewer:** "When would you use `fill()` vs `pressSequentially()`?"

**Answer:**

> "For normal text entry, I use `fill()` because it is simple and reliable. If the application has behavior
  that depends on individual keyboard events, such as autocomplete, live search, or custom key handlers, I
   use `pressSequentially()`. After entering the value, I verify it using `toHaveValue()`."

```ts
// Normal textbox
await username.fill('neeraj');

// Character-by-character typing
await username.pressSequentially('neeraj', { delay: 100 });

// Verify
await expect(username).toHaveValue('neeraj');
```

This is the **core textbox API set** you should know for a Senior SDET Playwright interview.


*/