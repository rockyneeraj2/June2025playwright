import { test, expect, Page, Locator } from '@playwright/test';

/*
                    REAL FAILURE
                         ↓
                  WHY DID IT FAIL?
                         ↓
                WHAT IS HAPPENING?
                         ↓
                  WHAT SHOULD I
                     CONTROL?
                         ↓
                 PLAYWRIGHT FEATURE
                         ↓
                     CODE FIX
                         ↓
                  REAL PROJECT USE
*/
test('1. Flaky tests — test passes locally but fails sometimes', async ({ page }) => {
});

       /*

 1. Flaky tests — test passes locally but fails sometimes
You have:

await page.click('#login');
await expect(page.locator('.dashboard')).toBeVisible();

Sometimes the test fails because the application is still loading the dashboard.

Why?

The problem may be:

Click Login
    ↓
API request
    ↓
Backend processing
    ↓
UI rendering
    ↓
Dashboard available

Your test may be faster than the application.


✅ Better solution

Use Playwright's locator-based auto-waiting:

await page.getByRole('button', { name: 'Login' }).click();

await expect(
  page.getByRole('heading', { name: 'Dashboard' })
).toBeVisible();

Or wait for a meaningful application event:

await page.waitForResponse(
  response =>
    response.url().includes('/api/login') &&
    response.status() === 200
);

await expect(page.getByText('Dashboard')).toBeVisible();
Senior-level answer

"I don't solve flakiness by adding arbitrary sleeps. First I identify whether the problem is locator instability, synchronization, test-data dependency, network dependency, or application behavior. Then I synchronize against a meaningful UI state, API response, or application event."

/*
Absolutely. Since you are preparing for a **Senior SDET / Playwright interview**, I’ll structure the answers so you can **speak them naturally in an interview**, not just memorize definitions.

I’ll cover the **200+ questions above in sections**, with:

* **Simple answer**
* **Senior-level explanation**
* **Code where required**
* **Real-world scenario**
* **Interview-ready answer**

## Part 1 — Playwright Fundamentals

### 1. What is Playwright?

**Answer:**

> Playwright is an open-source end-to-end automation framework developed by Microsoft. It supports Chromium, Firefox, and WebKit and allows us to automate web applications using JavaScript, TypeScript, Java, Python, and .NET. It provides built-in features such as auto-waiting, browser contexts, parallel execution, API testing, network interception, screenshots, videos, and trace-based debugging.

**Senior SDET point:**

> I particularly use Playwright for its reliable auto-waiting, isolated browser contexts, parallel execution, cross-browser support, and strong debugging capabilities.

---

### 2. Why Playwright over Selenium?

| Playwright              | Selenium                                |
| ----------------------- | --------------------------------------- |
| Auto-waiting built in   | Explicit waits often required           |
| Browser contexts        | WebDriver sessions                      |
| Chromium/Firefox/WebKit | Broad browser ecosystem                 |
| Network interception    | Requires additional approach/tools      |
| Trace Viewer            | No equivalent built-in trace experience |
| API testing             | Built-in API request support            |
| Easy parallel execution | Usually framework/grid dependent        |
| Multiple tabs/pages     | Strong built-in support                 |
| Modern web apps         | Excellent support                       |

**Interview answer:**

> “I wouldn't say Playwright completely replaces Selenium. Both are good tools. For modern applications, I prefer Playwright because it provides auto-waiting, browser-context isolation, network interception, built-in tracing, API support, and easier parallelization. Selenium remains useful where broad browser/device ecosystem compatibility or an existing Selenium investment is important.”

---

### 3. What browsers does Playwright support?

Playwright supports:

* Chromium
* Firefox
* WebKit

It can also test branded Chromium-based browsers such as Chrome and Edge through configuration.

Example:

```javascript
import { test } from '@playwright/test';

test('cross browser test', async ({ page }) => {
    await page.goto('https://example.com');
});
```

---

### 4. What is Browser, BrowserContext and Page?

Remember:

> **Browser = browser instance**
> **Context = isolated session**
> **Page = tab**

```text
Browser
   |
   +-- Context 1
   |      |
   |      +-- Page 1
   |      +-- Page 2
   |
   +-- Context 2
          |
          +-- Page 1
```

Example:

```javascript
const context = await browser.newContext();
const page = await context.newPage();
```

---

### 5. How do you launch a browser?

Using Playwright library:

```javascript
import { chromium } from 'playwright';

const browser = await chromium.launch({
    headless: true
});

const page = await browser.newPage();

await page.goto('https://example.com');

await browser.close();
```

In Playwright Test, the framework manages browser lifecycle automatically.

---

### 6. Headless vs Headed?

**Headless:**

Browser UI is not displayed.

```javascript
const browser = await chromium.launch({
    headless: true
});
```

**Headed:**

Browser UI is visible.

```javascript
const browser = await chromium.launch({
    headless: false
});
```

CLI:

```bash
npx playwright test --headed
```

**Interview answer:**

> “I normally use headless mode in CI/CD and headed mode when debugging locally.”

---

### 7. What is Playwright Test?

> Playwright Test is the official test runner provided by Playwright. It provides test execution, fixtures, assertions, retries, parallel execution, projects, hooks, reporting, and configuration.

Example:

```javascript
import { test, expect } from '@playwright/test';

test('login test', async ({ page }) => {

    await page.goto('/login');

    await expect(page).toHaveTitle(/Login/);
});
```

---

### 8. What is `playwright.config.js`?

It is the central configuration file for the Playwright framework.

Example:

```javascript
import { defineConfig } from '@playwright/test';

export default defineConfig({

    testDir: './tests',

    timeout: 30000,

    retries: process.env.CI ? 2 : 0,

    workers: process.env.CI ? 4 : undefined,

    reporter: [
        ['html'],
        ['list']
    ],

    use: {
        baseURL: 'https://example.com',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry'
    }
});
```

---

### 9. What is `test()`?

`test()` defines an individual test case.

```javascript
test('User should login successfully', async ({ page }) => {

    await page.goto('/login');

});
```

---

### 10. What is `expect()`?

`expect()` is used for assertions.

```javascript
await expect(page).toHaveTitle('Dashboard');

await expect(page.getByText('Welcome')).toBeVisible();
```

Playwright assertions are generally **web-first**, meaning they wait for the expected condition instead of checking only once.

---

# Part 2 — Locators

## 11. What are Playwright locators?

Common locator methods:

```javascript
page.getByRole()
page.getByText()
page.getByLabel()
page.getByPlaceholder()
page.getByAltText()
page.getByTitle()
page.getByTestId()
page.locator()
```

---

## 12. Which locator do you prefer?

My preference is:

```text
getByRole()
   ↓
getByLabel()
   ↓
getByTestId()
   ↓
getByText()
   ↓
locator()
```

The exact choice depends on the application's DOM.

Example:

```javascript
await page.getByRole('button', {
    name: 'Login'
}).click();
```

---

## 13. Why `getByRole()`?

> `getByRole()` identifies elements based on their accessible role and name. It generally produces resilient, user-focused locators and encourages accessibility-friendly automation.

Example:

```javascript
await page.getByRole('button', {
    name: 'Submit'
}).click();
```

---

## 14. `locator()` vs `page.$()`?

### Locator

```javascript
const button = page.locator('#login');
await button.click();
```

### `$`

```javascript
const button = await page.$('#login');
```

**Important difference:**

`locator()` creates a locator that Playwright can use with its auto-waiting and retry behavior.

`page.$()` returns an `ElementHandle` and is generally less preferred for normal user-facing interactions.

**Interview answer:**

> “I prefer Locator APIs because they provide Playwright's auto-waiting and retryability and are better aligned with the framework's recommended interaction model.”

---

## 15. How do you handle dynamic elements?

Avoid dynamic attributes where possible.

Bad:

```javascript
page.locator('#button_123456')
```

Better:

```javascript
page.getByRole('button', { name: 'Submit' })
```

or:

```javascript
page.getByTestId('submit-button')
```

or:

```javascript
page.locator('[data-testid="submit-button"]')
```

---

## 16. How do you handle multiple matching elements?

```javascript
const buttons = page.getByRole('button');

console.log(await buttons.count());
```

Specific element:

```javascript
await buttons.nth(1).click();
```

But don't blindly use `nth()` if a more stable locator is available.

---

## 17. How do you filter locators?

Example:

```javascript
const product = page
    .getByRole('listitem')
    .filter({ hasText: 'Laptop' });

await product.getByRole('button', {
    name: 'Add to cart'
}).click();
```

This is useful for dynamic tables and lists.

---

# Part 3 — Auto-Waiting

## 18. What is auto-waiting?

> Playwright automatically waits for elements to become actionable before performing actions such as click, fill, and check.

For example:

```javascript
await page.getByRole('button', {
    name: 'Submit'
}).click();
```

Playwright waits for relevant actionability conditions instead of requiring us to manually add sleeps.

---

## 19. Why avoid `waitForTimeout()`?

Avoid:

```javascript
await page.waitForTimeout(5000);
```

It unnecessarily waits even if the application is ready earlier.

Prefer:

```javascript
await expect(
    page.getByText('Success')
).toBeVisible();
```

or:

```javascript
```

---

## 20. How do you handle dynamic loading?

Use appropriate synchronization:

```javascript
await expect(
    page.getByText('Order Created')
).toBeVisible();
```

For an API:

```javascript
await page.waitForResponse(response =>
    response.url().includes('/orders') &&
    response.status() === 200
);
```

---

# Part 4 — POM

## 21. What is Page Object Model?

> POM is a design pattern where page-specific locators and actions are encapsulated in separate classes, while tests focus on business scenarios.

Example:

```javascript
export class LoginPage {

    constructor(page) {
        this.page = page;

        this.username =
            page.getByLabel('Username');

        this.password =
            page.getByLabel('Password');

        this.loginButton =
            page.getByRole('button', {
                name: 'Login'
            });
    }

    async login(username, password) {

        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}
```

Test:

```javascript
test('Login test', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.login(
        'user',
        'password'
    );
});
```

---

## 22. Why POM?

Main advantages:

* Reusability
* Maintainability
* Reduced duplication
* Cleaner tests
* Centralized locators
* Easier UI changes

**Senior answer:**

> “I use POM to encapsulate UI implementation details and keep test cases focused on business behavior.”

---

# Part 5 — Fixtures

## 23. What are fixtures?

> Fixtures provide reusable setup and teardown functionality and dependencies to tests.

Built-in fixtures include:

```text
page
context
browser
request
browserName
```

Example:

```javascript
test('test', async ({ page }) => {
    await page.goto('/');
});
```

---

## 24. What is a custom fixture?

```javascript
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export const test = base.extend({

    loginPage: async ({ page }, use) => {

        await use(new LoginPage(page));

    }

});
```

Then:

```javascript
test('Login', async ({ loginPage }) => {

    await loginPage.login(
        'user',
        'password'
    );

});
```

---

## 25. Fixture vs beforeEach?

**beforeEach:**

Used for setup around tests.

```javascript
test.beforeEach(async ({ page }) => {
    await page.goto('/login');
});
```

**Fixture:**

Used to create reusable dependencies/setup with lifecycle management.

**Senior answer:**

> “I use `beforeEach` for simple test-level setup. For reusable framework dependencies such as Page Objects, authenticated sessions, API clients, or test data, I prefer custom fixtures.”

---

# Part 6 — Authentication

## 26. How do you handle authentication?

One common approach is `storageState`.

Generate authentication state once, then reuse it.

Configuration:

```javascript
use: {
    storageState: 'playwright/.auth/user.json'
}
```

This avoids logging in through the UI before every test.

---

## 27. What is storageState?

> `storageState` stores browser authentication-related state such as cookies and local storage so it can be reused in other tests.

Useful for:

```text
500 tests
    ↓
Login once
    ↓
Save authentication
    ↓
Reuse state
```

---

## 28. How do you handle multiple roles?

For example:

```text
admin.json
manager.json
user.json
```

Then configure separate projects or contexts according to the test requirement.

---

# Part 7 — Tabs and Windows

## 29. How do you handle a new tab?

```javascript
const newPagePromise =
    context.waitForEvent('page');

await page.getByText('Open Report').click();

const newPage = await newPagePromise;

await newPage.waitForLoadState();

console.log(await newPage.title());
```

---

## 30. How do you handle a popup?

```javascript
const popupPromise =
    page.waitForEvent('popup');

await page.getByRole('button', {
    name: 'Open'
}).click();

const popup = await popupPromise;

await popup.waitForLoadState();
```

---

## 31. How do you switch back to parent?

In Playwright, you normally **don't use Selenium-style window switching**.

You retain references:

```javascript
const parentPage = page;

const popupPromise =
    page.waitForEvent('popup');

await page.getByText('Open').click();

const childPage = await popupPromise;

// Work on child
await childPage.close();

// Back to parent
await parentPage.bringToFront();
```

---

# Part 8 — Alerts

## 32. How do you handle alerts?

```javascript
page.on('dialog', async dialog => {

    console.log(dialog.message());

    await dialog.accept();

});
```

For confirm:

```javascript
await dialog.accept();
```

For cancel:

```javascript
await dialog.dismiss();
```

For prompt:

```javascript
await dialog.accept('Neeraj');
```

**Important:** Register the handler before triggering the dialog.

---

# Part 9 — Frames

## 33. How do you handle an iframe?

```javascript
const frame = page.frameLocator('iframe');

await frame
    .getByLabel('Card Number')
    .fill('4111111111111111');
```

### Interview answer:

> “For normal iframe interaction, I prefer `frameLocator()` because it allows me to directly locate elements inside the frame.”

---

# Part 10 — Dropdown

## 34. How do you handle a dropdown?

Native select:

```javascript
await page
    .locator('#country')
    .selectOption('IN');
```

By label:

```javascript
await page
    .locator('#country')
    .selectOption({
        label: 'India'
    });
```

Custom dropdown:

```javascript
await page.getByRole('combobox').click();

await page.getByRole('option', {
    name: 'India'
}).click();
```

---

# Part 11 — Shadow DOM

## 35. How do you handle Shadow DOM?

Playwright supports open Shadow DOM selectors automatically.

Example:

```javascript
await page.locator('my-component')
    .getByRole('button', {
        name: 'Submit'
    })
    .click();
```

You generally don't need to manually pierce an open shadow root like Selenium's `getShadowRoot()` approach.

**Senior answer:**

> “Playwright's locator engine automatically pierces open Shadow DOM in normal cases, which simplifies automation compared with Selenium. Closed Shadow DOM cannot simply be accessed through normal selectors.”

---

# Part 12 — Parallel Execution

## 36. What are workers?

Workers are separate processes used to execute tests concurrently.

Configuration:

```javascript
workers: 4
```

CLI:

```bash
npx playwright test --workers=4
```

Conceptually:

```text
Worker 1 → Test A
Worker 2 → Test B
Worker 3 → Test C
Worker 4 → Test D
```

---

## 37. What is parallel execution?

> Parallel execution means independent tests run concurrently rather than sequentially, reducing overall execution time.

---

## 38. What is serial execution?

```javascript
test.describe.configure({
    mode: 'serial'
});
```

Use it only when tests genuinely depend on shared sequence/state.

**Senior point:**

> “I prefer independent tests over serial dependencies because independent tests scale better in CI.”

---

## 39. What is sharding?

Sharding distributes tests across multiple CI machines.

```bash
npx playwright test --shard=1/4
```

```text
CI Machine 1 → 25%
CI Machine 2 → 25%
CI Machine 3 → 25%
CI Machine 4 → 25%
```

---

# Part 13 — Test Data

## 40. How do you manage test data?

I use:

* JSON
* CSV
* Environment variables
* API-generated data
* Database setup where appropriate
* Dynamic data generators
* Fixtures

Example:

```javascript
import testData from '../test-data/users.json';

await page.getByLabel('Username')
    .fill(testData.validUser.username);
```

For passwords:

```javascript
const password = process.env.TEST_PASSWORD;
```

**Senior answer:**

> “I avoid hardcoding sensitive or shared mutable data. For large parallel suites, I prefer isolated data and API-based setup.”

---

# Part 14 — API Testing

## 41. How do you perform API testing in Playwright?

Use the `request` fixture.

```javascript
test('Get users', async ({ request }) => {

    const response =
        await request.get('/api/users');

    expect(response.status()).toBe(200);

    const body = await response.json();

    console.log(body);
});
```

---

## 42. POST request?

```javascript
const response = await request.post('/api/users', {
    data: {
        name: 'Neeraj',
        role: 'QA'
    }
});

expect(response.status()).toBe(201);
```

---

## 43. PUT request?

```javascript
const response = await request.put('/api/users/1', {
    data: {
        name: 'Updated User'
    }
});
```

---

## 44. PATCH request?

```javascript
const response = await request.patch('/api/users/1', {
    data: {
        role: 'Admin'
    }
});
```

---

## 45. DELETE request?

```javascript
const response =
    await request.delete('/api/users/1');

expect(response.status()).toBe(204);
```

---

# Part 15 — Network Interception

## 46. How do you capture network requests?

```javascript
page.on('request', request => {

    console.log(request.method());
    console.log(request.url());

});
```

Response:

```javascript
page.on('response', response => {

    console.log(response.status());
    console.log(response.url());

});
```

---

## 47. How do you mock API responses?

Use `page.route()`:

```javascript
await page.route('/api/users', async route => {

    await route.fulfill({

        status: 200,

        contentType: 'application/json',

        body: JSON.stringify({
            users: [
                {
                    id: 1,
                    name: 'Test User'
                }
            ]
        })
    });
});
```

---

## 48. Why mock APIs?

Useful when:

* Backend is unavailable
* Testing error scenarios
* Testing rare edge cases
* Reducing dependency on external systems
* Making UI tests faster
* Testing deterministic responses

---

# Part 16 — Screenshot, Video, Trace

## 49. Screenshot?

```javascript
await page.screenshot({
    path: 'screenshots/home.png'
});
```

Full page:

```javascript
await page.screenshot({
    path: 'home.png',
    fullPage: true
});
```

---

## 50. Video?

Configure:

```javascript
use: {
    video: 'retain-on-failure'
}
```

---

## 51. What is Trace Viewer?

> Trace Viewer is Playwright's debugging tool that provides detailed information about test execution, including actions, screenshots, DOM snapshots, network activity, console messages, and timing.

Configuration:

```javascript
use: {
    trace: 'on-first-retry'
}
```

Open:

```bash
npx playwright show-trace trace.zip
```

---

# Part 17 — Retries and Flaky Tests

## 52. How do you configure retries?

```javascript
retries: process.env.CI ? 2 : 0
```

This means:

```text
Local → no retry
CI → 2 retries
```

---

## 53. What is a flaky test?

> A flaky test is a test that produces inconsistent results without a corresponding application-code change.

Example:

```text
Run 1 → PASS
Run 2 → FAIL
Run 3 → PASS
Run 4 → PASS
```

---

## 54. How do you debug flaky tests?

I investigate:

```text
Timing
↓
Locators
↓
Test data
↓
Parallel execution
↓
Network
↓
Environment
↓
Authentication
↓
Application defects
```

Then use:

* Trace
* Screenshot
* Video
* Console logs
* Network logs
* CI logs

**Important:**

> “I don't consider adding retries as fixing a flaky test. Retry is a mitigation; I investigate and fix the root cause.”

---

# Part 18 — Jenkins Failures

## 55. Test passes locally but fails Jenkins. Why?

Possible reasons:

1. Different browser version
2. Different Node version
3. Environment differences
4. Missing environment variables
5. Network issues
6. Authentication/session problems
7. Headless differences
8. Resource constraints
9. Test-data conflicts
10. Parallel execution
11. Timing issues
12. Application/environment instability

### Strong answer:

> “I first reproduce the failure in the same CI configuration locally if possible, then inspect the trace, screenshot, video, console, network and Jenkins logs. I compare environment versions, credentials, test data, browser mode, workers, and resource availability. I focus on identifying the root cause instead of simply increasing the timeout or retry count.”

---

# Part 19 — CI/CD

## 56. How do you integrate Playwright with Jenkins?

Typical pipeline:

```text
Developer
   ↓
Git
   ↓
Jenkins
   ↓
npm install
   ↓
Playwright install
   ↓
Run tests
   ↓
Generate report
   ↓
Publish artifacts
```

Example:

```bash
npm ci
npx playwright install --with-deps
npx playwright test
```

---

# Part 20 — Regression Optimization

## 57. Regression takes 2 hours. How do you reduce it to 30 minutes?

This is a **very important Senior SDET question**.

I would:

1. Analyze slow tests
2. Enable workers
3. Use CI sharding
4. Remove unnecessary waits
5. Reuse authentication
6. Create data through APIs
7. Remove redundant tests
8. Separate smoke/regression suites
9. Run independent tests in parallel
10. Optimize expensive setup

Example:

```text
2 Hours
   ↓
Analyze bottlenecks
   ↓
Workers
   ↓
Sharding
   ↓
API test data
   ↓
storageState
   ↓
Remove unnecessary waits
   ↓
~30-40 min target
```

**Senior answer:**

> “I don't simply increase workers. I first identify the bottleneck and verify that tests are isolated and the CI environment has enough CPU and memory.”

---

# Part 21 — Selenium to Playwright Migration

## 58. What is your approach for Selenium → Playwright migration?

I would use an **incremental migration**, not rewrite everything at once.

### Step 1

Assess:

```text
Existing tests
POM
Utilities
Test data
CI/CD
Reports
Dependencies
```

### Step 2

Create the Playwright framework foundation.

### Step 3

Migrate high-value/high-maintenance tests first.

### Step 4

Convert:

```text
WebDriver → Page
WebDriverWait → Auto-wait/Web-first assertions
PageFactory → Locator-based POM
Selenium Grid → Playwright workers/sharding
```

### Step 5

Run Selenium and Playwright in parallel during transition.

### Step 6

Compare coverage and stability.

### Step 7

Retire Selenium tests once equivalent Playwright coverage is proven.

---

# Part 22 — JavaScript

## 59. Why is async/await used in Playwright?

Playwright operations such as:

```javascript
page.goto()
page.click()
page.fill()
page.waitForResponse()
```

are asynchronous.

Therefore:

```javascript
await page.goto('/login');
await page.getByRole('button').click();
```

`await` ensures the next operation executes after the current Promise completes.

### Interview answer:

> “Playwright APIs are asynchronous because browser operations involve communication with the browser process. `async/await` allows us to write asynchronous code in a readable sequential style and ensures we wait for operations to complete before continuing.”

---

# Part 23 — Real Senior SDET Scenarios

## 60. How would you design a Playwright framework from scratch?

I would use:

```text
                    Playwright Framework
                           |
        ---------------------------------------
        |          |          |       |       |
      Tests      Pages     Fixtures   API    Utils
        |          |          |       |       |
        ---------------------------------------
                           |
                    Config / Test Data
                           |
                         CI/CD
```

Example:

```text
tests/
pages/
fixtures/
api/
utils/
test-data/
config/
reports/
```

I would include:

* POM
* Fixtures
* API helpers
* Authentication
* Environment configuration
* Test-data strategy
* Parallel execution
* Reporting
* Trace/video/screenshots
* CI/CD
* Retry strategy

---

# 61. What if tests are flaky?

My approach:

```text
Identify flaky test
       ↓
Run repeatedly
       ↓
Collect trace
       ↓
Check timing
       ↓
Check locator
       ↓
Check test data
       ↓
Check network
       ↓
Check parallelism
       ↓
Identify root cause
       ↓
Fix
       ↓
Run regression
```

---

# 62. What challenges have you faced with Playwright?

A strong answer should be **specific**, rather than saying “Playwright has many challenges.”

Example:

> **“One challenge I faced was flaky behavior in parallel execution because multiple tests were using shared test data. I analyzed the failures using Playwright traces and found that tests were modifying the same records. I changed the framework to generate isolated test data through API setup and added cleanup through fixtures. This improved parallel stability and reduced false failures.”**

Other examples:

* Dynamic locators
* Authentication expiration
* Third-party dependencies
* CI resource constraints
* Parallel test-data conflicts
* Cross-browser differences
* Slow external APIs

---

# 63. How do you make your Playwright framework maintainable?

I focus on:

```text
Stable locators
POM
Fixtures
Reusable utilities
API helpers
Environment configuration
Test-data isolation
Clear naming
Code reviews
Linting
CI/CD
Reporting
```

I avoid:

```text
Hard-coded waits
Duplicate locators
Duplicate login
Shared mutable test data
Large monolithic Page Objects
Unnecessary retries
```

---

# 64. How do you use GitHub Copilot with Playwright?

I use Copilot as a **developer productivity assistant**, not as a replacement for QA reasoning.

For example, I can ask it to:

> “Create a Playwright Page Object for the login page using role-based locators, async/await, and reusable methods.”

I can also use it to:

* Generate test skeletons
* Suggest locators
* Generate Page Objects
* Refactor code
* Generate negative scenarios
* Create API test templates
* Explain existing code
* Generate utilities
* Suggest edge cases

But I manually validate:

* Locator stability
* Assertions
* Business logic
* Security
* Test-data strategy
* Generated code correctness

---

# 65. How do you use AI in your SDET framework?

A strong Senior SDET answer:

> **“I use AI tools to accelerate test creation, code generation, test-data generation, debugging, and code review. For example, Copilot can generate Playwright test skeletons and Page Objects based on application requirements. I still validate the generated code for locator stability, assertions, synchronization, security, and business correctness. My approach is AI-assisted automation rather than blindly accepting AI-generated code.”**

---

# 🔥 10 Questions You MUST Master

If you have limited time before the interview, prioritize these:

### 1. Playwright vs Selenium

### 2. Browser vs Context vs Page

### 3. Locators + dynamic elements

### 4. Auto-waiting

### 5. POM

### 6. Fixtures

### 7. Authentication + storageState

### 8. Parallel execution + workers + sharding

### 9. API + network mocking

### 10. Flaky tests + Jenkins failures + Trace Viewer

---

## 🎯 Your Senior SDET Interview Formula

For almost every scenario question, answer using this structure:

**Problem → Analysis → Approach → Implementation → Validation → Result**

For example:

> **“The regression suite was taking 2 hours. I first analyzed execution time and identified redundant UI setup and sequential tests as the major bottlenecks. I introduced Playwright workers, CI sharding, API-based test-data setup, and authentication reuse through storageState. I also removed unnecessary hard waits and isolated test data for parallel execution. After the changes, I compared execution time and failure rates to ensure that the speed improvement didn't compromise stability.”**

That style makes your answer sound like a **Senior SDET who has actually designed and maintained automation frameworks**, rather than someone who has only studied Playwright concepts.

***/
