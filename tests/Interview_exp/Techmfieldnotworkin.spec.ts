// if we are entering the text but text field in not entering in textfield what we can do

/*

Yes. This is a **very common real-time Playwright interview scenario**.

If Playwright finds the text field but `fill()` is not entering the value, I would troubleshoot it
 systematically rather than immediately adding a wait.

## 1. First check: Is the element actually editable?

```ts
const username = page.getByLabel('Username');

await expect(username).toBeVisible();
await expect(username).toBeEnabled();
await expect(username).toBeEditable();

await username.fill('neeraj');
```

If `toBeEditable()` fails, investigate why the field is disabled, readonly, covered, or not the actual input.

---

# 2. Common reasons and solutions

| Reason                             | How to identify                    | Solution                               |
| ---------------------------------- | ---------------------------------- | -------------------------------------- |
| Element not visible                | `toBeVisible()` fails              | Wait for correct UI state              |
| Disabled field                     | `toBeEnabled()` fails              | Check application condition            |
| Readonly                           | `toBeEditable()` fails             | Check `readonly` attribute             |
| Wrong locator                      | Playwright targets another element | Improve locator                        |
| Multiple matching elements         | Locator resolves unexpectedly      | Use unique locator                     |
| Element covered by another element | Click/fill actionability issue     | Find overlay/popup issue               |
| iframe                             | Element is inside iframe           | Use `frameLocator()`                   |
| Shadow DOM                         | Element inside component           | Use appropriate locator                |
| React/Angular controlled field     | Value changes then disappears      | Use normal `fill()` + trigger app flow |
| Custom input                       | Visible textbox isn't actual input | Inspect DOM                            |
| Page still loading/rendering       | Element exists but isn't ready     | Wait for meaningful UI state           |
| Input has event requirements       | App expects keyboard events        | Try `pressSequentially()`              |
| Focus issue                        | Input loses focus                  | Check overlays/events                  |
| Test data issue                    | Value is undefined/empty           | Log the value                          |

---

# 3. Check your locator first

Suppose you wrote:

```ts
await page.locator('#username').fill('neeraj');
```

But there are actually multiple elements with `id="username"` or the element isn't the real input.

Check:

```ts
const username = page.locator('#username');

console.log('Count:', await username.count());
```

Ideally:

```text
Count: 1
```

Then:

```ts
await expect(username).toBeVisible();
await expect(username).toBeEnabled();
await expect(username).toBeEditable();
```

---

# 4. Very common issue: field is inside iframe

If the textbox is inside an iframe:

```ts
const frame = page.frameLocator('#loginFrame');

await frame.getByLabel('Username').fill('neeraj');
```

Instead of:

```ts
await page.getByLabel('Username').fill('neeraj');
```

### Interview answer

> "If the element is inside an iframe, the page locator cannot directly interact with it. I first identify 
 the iframe and use `frameLocator()` to locate the textbox inside that frame."

---

# 5. Field is readonly or disabled

HTML could be:

```html
<input id="username" readonly>
```

or:

```html
<input id="username" disabled>
```

Check:

```ts
console.log(
  await page.locator('#username').getAttribute('readonly')
);

console.log(
  await page.locator('#username').getAttribute('disabled')
);
```

If it's disabled because the application has not completed some previous action, don't force it.

For example:

```text
Select Country
      ↓
Application loads states
      ↓
State field becomes enabled
      ↓
Enter state
```

Your test should perform the prerequisite action first.

---

# 6. Very common issue: overlay covering the field

Example:

```text
Loading...
████████████████
     ↓
Username field
```

The input exists, but a loading spinner/modal/overlay is covering it.

You can wait for the application-specific overlay to disappear:

```ts
await expect(page.locator('.loading-overlay')).toBeHidden();

await page.getByLabel('Username').fill('neeraj');
```

Don't blindly do:

```ts
await page.waitForTimeout(5000);
```

That's usually a poor solution because the required loading time can vary.

---

# 7. React/Angular application issue

Sometimes you see the value briefly and then it disappears.

For example:

```ts
await page.getByRole('textbox').fill('neeraj');
```

You see:

```text
neeraj
```

Then:

```text
[empty]
```

This can happen when the application re-renders the component or some application logic resets the field.

First verify:

```ts
const input = page.getByRole('textbox');

await input.fill('neeraj');

await expect(input).toHaveValue('neeraj');
```

If it fails, investigate the application behavior rather than using force.

---

# 8. When `fill()` doesn't work as expected, try `pressSequentially()`

`fill()` sets the input value efficiently.

For applications where individual keyboard events matter, you can use:

```ts
await page.getByLabel('Username').pressSequentially('neeraj');
```

You can even slow it down:

```ts
await page.getByLabel('Username').pressSequentially('neeraj', {
  delay: 100
});
```

This is useful for things like:

* autocomplete
* search suggestions
* custom JavaScript input handling
* applications reacting to individual key events

But **don't make `pressSequentially()` your default replacement for `fill()`**. First understand why
 `fill()` isn't working.

---

# 9. Custom autocomplete field

Suppose:

```text
Enter City
     ↓
Bengaluru
     ↓
[ Bengaluru, Karnataka ]
```

You shouldn't just fill and immediately continue.

```ts
const city = page.getByPlaceholder('Enter city');

await city.fill('Bengaluru');

await page.getByRole('option', {
  name: 'Bengaluru, Karnataka'
}).click();
```

The problem isn't necessarily that the text wasn't entered. The application may require selecting the 
suggestion.

---

# 10. Check whether your test data is actually coming

This is another common framework problem.

You might have:

```ts
const username = testData.username;

console.log(username);

await page.getByLabel('Username').fill(username);
```

If output is:

```text
undefined
```

then Playwright isn't the problem.

Check your JSON:

```json
{
  "username": "neeraj",
  "password": "Password123"
}
```

And access it correctly:

```ts
await page.getByLabel('Username').fill(testData.username);
```

---

# 11. A good debugging method

When a field doesn't accept text, I use this sequence:

```ts
const username = page.getByLabel('Username');

// 1. Does locator find it?
console.log('Count:', await username.count());

// 2. Is it visible?
await expect(username).toBeVisible();

// 3. Is it enabled?
await expect(username).toBeEnabled();

// 4. Is it editable?
await expect(username).toBeEditable();

// 5. Enter value
await username.fill('neeraj');

// 6. Verify
await expect(username).toHaveValue('neeraj');
```

This gives you a very clear failure point.

---

# 12. What NOT to do immediately

A common junior approach is:

```ts
await page.waitForTimeout(5000);

await page.locator('#username').fill('neeraj');
```

If that doesn't work:

```ts
await page.locator('#username').click({ force: true });
await page.locator('#username').fill('neeraj');
```

And then:

```ts
await page.evaluate(() => {
   // directly modify DOM
});
```

I wouldn't start with these.

**First understand the actual reason.**

---

# Senior SDET interview answer

If the interviewer asks:

**"You are using `fill()` but the text is not getting entered. What will you do?"**

You can answer:

> "First, I won't immediately add a hard wait or use force. I'll verify whether my locator is pointing to the
  correct element and whether it is visible, enabled and editable. Then I'll check if the element is inside
   an iframe, shadow DOM, or covered by an overlay. I'll also inspect whether the application is re-rendering
    or resetting the value, especially in React or Angular applications. I'll verify my test data isn't 
    undefined and finally assert the value using `toHaveValue()`. If the application depends on individual
     keyboard events, I may use `pressSequentially()` instead of `fill()`. I prefer fixing the root cause
      rather than masking the issue with waits or JavaScript."

### Remember this troubleshooting flow

```text
Text not entering
       ↓
Is locator correct?
       ↓
Visible?
       ↓
Enabled?
       ↓
Editable?
       ↓
Inside iframe?
       ↓
Overlay covering?
       ↓
App re-rendering/resetting?
       ↓
Test data valid?
       ↓
Need keyboard events?
       ↓
Verify with toHaveValue()
```

That's a **strong Senior SDET way** to answer this scenario because you're demonstrating **debugging and 
root-cause analysis**, not just knowing Playwright syntax.


*/