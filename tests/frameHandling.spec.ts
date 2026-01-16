import { test, expect, Page, FrameLocator } from '@playwright/test';

test('frame handling', async ({ page }) => {
    await page.goto('https://www.formsite.com/templates/registration-form-templates/vehicle-registration-form/');
    await page.getByTitle('Vehicle-Registration-Forms-and-Examples').click();

    //frame will be loaded:
    let frameLel: FrameLocator = page.frameLocator(`iframe[id*='frame-one']`);
    await frameLel.locator('#RESULT_TextField-1').fill('test automation');

    let header = await page.locator('h3.details__form-preview-title').innerText();
    console.log(header);

    /*

---

# 🔹 How to Handle Frames in Playwright (TypeScript)

## ✅ Key Point (Interview Starter)

> In Playwright, you don’t “switch” to a frame like Selenium.
> You **locate the frame** and interact with elements inside it.

---

## 1️⃣ Using `frameLocator()` (⭐ Recommended Way)

### Example: Interact with element inside iframe

```ts
await page
  .frameLocator('#iframeId')
  .locator('button#submit')
  .click();
```

### Why this is best

✅ Auto-waits for frame
✅ Cleaner syntax
✅ Less flaky
✅ Preferred in Playwright

🎯 **Interview line:**

> I use `frameLocator()` because it automatically waits for the frame and elements.

---

## 2️⃣ Using `page.frame()` (By Name or URL)

### Get frame by name

```ts
const frame = page.frame({ name: 'iframeName' });
await frame?.click('#loginBtn');
```

### Get frame by URL

```ts
const frame = page.frame({ url: /login/ });
await frame?.fill('#username', 'admin');
```

⚠️ Use only when:

* Frame name or URL is fixed
* You need frame reference once

---

## 3️⃣ Using `contentFrame()` (When iframe element is available)

### Example

```ts
const iframeElement = await page.locator('#iframeId');
const frame = await iframeElement.contentFrame();

await frame?.fill('#email', 'test@gmail.com');
```

### Use Case

* Dynamic iframe
* Nested DOM handling

---

## 4️⃣ Handling Nested Frames (iframe inside iframe)

### Example

```ts
const parentFrame = page.frameLocator('#parentFrame');
const childFrame = parentFrame.frameLocator('#childFrame');

await childFrame.locator('#submit').click();
```

---

## 5️⃣ Handling Dynamic Frames (Load after page load)

```ts
await page.waitForSelector('iframe');

await page
  .frameLocator('iframe[src*="payment"]')
  .locator('#payNow')
  .click();
```

---

## 6️⃣ Switching Back to Main Page

✅ No action needed

```ts
await page.click('#mainPageButton');
```

🎯 **Interview Tip:**

> Playwright doesn’t require switching back to default content.

---

## 7️⃣ Real-Time Automation Example (Login inside iframe)

```ts
await page.frameLocator('#loginFrame').locator('#username').fill('admin');
await page.frameLocator('#loginFrame').locator('#password').fill('admin123');
await page.frameLocator('#loginFrame').locator('#loginBtn').click();
```


## 🔁 Selenium vs Playwright (Frames)

| Selenium           | Playwright     |
| ------------------ | -------------- |
| switchTo().frame() | frameLocator() |
| Manual wait        | Auto-wait      |
| More flaky         | More stable    |


> In Playwright, I handle iframes using `frameLocator()` which automatically waits for the frame and allows stable interaction without switching context.

    */

});