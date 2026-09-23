/*

What is playwright.config.ts?

"playwright.config.ts is the central configuration file of my Playwright framework. I use it to
 configure test execution behavior such as the test directory, browser projects, base URL, timeout,
  retries, workers, parallel execution, reporters, screenshots, videos, traces, authentication state,
   and other common settings."

   What is playwright.config.ts?

                 playwright.config.ts
                         |
       ┌─────────────────┼─────────────────┐
       ↓                 ↓                 ↓
   Test execution      Browser           Reporting
       |                 |                 |
   workers            Chromium           HTML
   retries            Firefox            Allure
   timeout            WebKit             JUnit
   parallel

   import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 4 : undefined,

  timeout: 30 * 1000,

  expect: {
    timeout: 5 * 1000
  },

  use: {
    baseURL: 'https://example.com',

    headless: true,

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'retain-on-failure',

    actionTimeout: 15 * 1000,

    navigationTimeout: 30 * 1000
  },

  reporter: [
    ['html'],
    ['list']
  ],

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox']
      }
    }
  ]
});

fullyParallel and workers are not the same thing.

fullyParallel: true
workers: 4

means:

Tests can be distributed for parallel execution, with up to 4 workers.

For a **Senior SDET interview**, explain `playwright.config.ts` as the **central control file for your 
Playwright automation framework**.

The interviewer is usually checking whether you understand **why each setting exists**, not whether you
 can memorize the syntax.

## 1. What is `playwright.config.ts`?

> **"`playwright.config.ts` is the central configuration file of my Playwright framework. I use it to
  configure test execution behavior such as the test directory, browser projects, base URL, timeout, 
  retries, workers, parallel execution, reporters, screenshots, videos, traces, authentication state,
   and other common settings."**

Think of it like:

```text
                 playwright.config.ts
                         |
       ┌─────────────────┼─────────────────┐
       ↓                 ↓                 ↓
   Test execution      Browser           Reporting
       |                 |                 |
   workers            Chromium           HTML
   retries            Firefox            Allure
   timeout            WebKit             JUnit
   parallel
```

---

# 2. Real `playwright.config.ts`

A typical Senior SDET framework might look like:

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 4 : undefined,

  timeout: 30 * 1000,

  expect: {
    timeout: 5 * 1000
  },

  use: {
    baseURL: 'https://example.com',

    headless: true,

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'retain-on-failure',

    actionTimeout: 15 * 1000,

    navigationTimeout: 30 * 1000
  },

  reporter: [
    ['html'],
    ['list']
  ],

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox']
      }
    }
  ]
});
```

Now let's understand this **interview-wise**.

---

# 3. `testDir`

```ts
testDir: './tests'
```

This tells Playwright where your test files are located.

For example:

```text
project
│
├── tests
│   ├── login.spec.ts
│   ├── checkout.spec.ts
│   └── search.spec.ts
│
└── playwright.config.ts
```

Playwright looks inside:

```text
./tests
```

for tests.

### Interview answer

> "`testDir` defines the directory from which Playwright discovers my test files."

---

# 4. `fullyParallel`

```ts
fullyParallel: true
```

This enables Playwright to run tests in parallel.

For example:

```text
Worker 1 → Login tests
Worker 2 → Search tests
Worker 3 → Cart tests
Worker 4 → Payment tests
```

This is useful when you have a large suite.

### Important interview point

`fullyParallel` and `workers` are **not the same thing**.

```ts
fullyParallel: true
workers: 4
```

means:

> Tests can be distributed for parallel execution, with up to 4 workers.

---

# 5. `workers`

```ts
workers: 4
```

This controls the **maximum number of worker processes** Playwright can use.

Suppose you have:

```text
2,000 tests
```

and:

```ts
workers: 4
```

Playwright can execute tests using up to four workers.

### Real scenario

If Jenkins has limited CPU/memory, I might reduce it:

```bash
npx playwright test --workers=2
```

Even if the config says:

```ts
workers: 4
```

the command-line value can override it for that execution.

### Interview answer

> "`workers` controls the maximum parallel worker processes. I tune it based on the CI machine's CPU, memory, test-data isolation, and application capacity."

---

# 6. `retries`

```ts
retries: process.env.CI ? 2 : 0
```

This means:

```text
Local → 0 retries
CI    → 2 retries
```

Suppose a test fails:

```text
Attempt 1 → FAIL
Attempt 2 → FAIL
Attempt 3 → PASS
```

The test is eventually marked as passed, but Playwright reports it as a **flaky test**.

### Senior-level point

Don't use retries to hide defects.

You should investigate why it failed.

### Interview answer

> "I normally keep retries low and mainly enable them in CI to identify transient failures. I don't use retries as a replacement for fixing flaky tests."

---

# 7. `timeout`

```ts
timeout: 30 * 1000
```

This is the maximum time allowed for a test to complete.

Here:

```text
30 × 1000 = 30 seconds
```

So:

```ts
timeout: 30000
```

is equivalent.

---

# 8. `expect.timeout`

```ts
expect: {
  timeout: 5000
}
```

This controls how long Playwright's **web-first assertions** wait.

Example:

```ts
await expect(
  page.getByText('Order Confirmed')
).toBeVisible();
```

Playwright will keep checking for the expected state until the assertion timeout is reached.

### Important difference

```text
test timeout
      ↓
Maximum duration of test

expect timeout
      ↓
Maximum waiting time for assertion
```

---

# 9. `baseURL`

```ts
use: {
  baseURL: 'https://example.com'
}
```

This avoids repeating the URL in every test.

Without `baseURL`:

```ts
await page.goto('https://example.com/login');
```

With `baseURL`:

```ts
await page.goto('/login');
```

Playwright combines them:

```text
baseURL
   +
 /login
   ↓
https://example.com/login
```

This is especially useful for environment-based execution.

For example:

```text
QA  → https://qa.example.com
UAT → https://uat.example.com
PROD → https://example.com
```

---

# 10. `headless`

```ts
headless: true
```

Browser runs without opening the visible browser UI.

### Headless

```text
Test
 ↓
Browser runs in background
```

### Headed

```ts
headless: false
```

You can see the browser.

For debugging:

```bash
npx playwright test --headed
```

---

# 11. `screenshot`

```ts
screenshot: 'only-on-failure'
```

If the test fails, Playwright captures a screenshot.

Possible values include:

```text
'off'
'on'
'only-on-failure'
```

For CI, I commonly prefer:

```ts
screenshot: 'only-on-failure'
```

because capturing screenshots for every test can generate unnecessary artifacts.

---

# 12. `video`

```ts
video: 'retain-on-failure'
```

This records the test and retains the video when the test fails.

Useful for:

```text
CI failure
   ↓
Open video
   ↓
See what happened
```

---

# 13. `trace`

This is **very important for Senior SDET interviews**.

```ts
trace: 'retain-on-failure'
```

Playwright Trace Viewer provides detailed execution information.

You can investigate:

* actions
* locator
* screenshots
* network
* console
* timing
* DOM snapshots

Example:

```bash
npx playwright show-trace trace.zip
```

### Interview answer

> "For CI failures, I enable traces on failure because they give me much more diagnostic information than a screenshot alone."

---

# 14. `actionTimeout`

```ts
actionTimeout: 15000
```

This controls how long Playwright waits for an individual action.

For example:

```ts
await page.getByRole('button', {
  name: 'Submit'
}).click();
```

If the action cannot complete within the configured timeout, it fails.

---

# 15. `navigationTimeout`

```ts
navigationTimeout: 30000
```

This controls navigation-related operations.

For example:

```ts
await page.goto('/login');
```

or navigation triggered by an action.

---

# 16. `reporter`

```ts
reporter: [
  ['html'],
  ['list']
]
```

This determines how test results are reported.

### HTML

```text
Test execution
      ↓
HTML report
      ↓
Open in browser
```

You can also configure reporters based on your organization:

```ts
reporter: [
  ['html'],
  ['junit']
]
```

For enterprise CI/CD, JUnit output can be consumed by CI tools.

---

# 17. `projects`

This is another **very important Senior SDET concept**.

```ts
projects: [
  {
    name: 'chromium',
    use: {
      ...devices['Desktop Chrome']
    }
  },

  {
    name: 'firefox',
    use: {
      ...devices['Desktop Firefox']
    }
  }
]
```

A **project** represents a different test configuration.

You can create projects for:

```text
Chromium
Firefox
WebKit
Mobile Chrome
Mobile Safari
Different environments
Different user roles
```

Example:

```text
                 Playwright
                     |
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
   Chromium        Firefox       WebKit
```

Run only Chromium:

```bash
npx playwright test --project=chromium
```

---

# 18. `use`

Most browser-related common settings go under:

```ts
use: {
   ...
}
```

Example:

```ts
use: {
  baseURL: 'https://example.com',
  headless: true,
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'retain-on-failure'
}
```

Think of `use` as:

> **"What browser/test context settings should my tests use?"**

---

# 19. `storageState`

Very important for your **SSO/authentication scenarios**.

Example:

```ts
use: {
  storageState: 'playwright/.auth/user.json'
}
```

This allows tests to reuse an authenticated browser state.

Instead of:

```text
Test 1 → Login
Test 2 → Login
Test 3 → Login
...
Test 500 → Login
```

you can do:

```text
Authentication setup
        ↓
storageState
        ↓
Tests reuse authentication
```

This is especially valuable for enterprise applications with SSO.

---

# 20. Environment-specific configuration

A real framework shouldn't hardcode everything.

For example:

```ts
const baseURL =
  process.env.ENV === 'uat'
    ? 'https://uat.example.com'
    : 'https://qa.example.com';
```

Then:

```ts
use: {
  baseURL
}
```

Execute:

```bash
ENV=uat npx playwright test
```

On Windows PowerShell:

```powershell
$env:ENV="uat"; npx playwright test
```

This allows the same automation framework to run against different environments.

---

# 21. A real company framework structure

For a large project, I might organize it like:

```text
Playwright Framework
│
├── tests/
│   ├── login/
│   ├── checkout/
│   └── orders/
│
├── pages/
│   ├── LoginPage.ts
│   ├── CheckoutPage.ts
│   └── OrderPage.ts
│
├── fixtures/
│
├── utils/
│
├── test-data/
│
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

And the config becomes the central place for:

```text
Environment
Browser
Workers
Retries
Timeouts
Authentication
Reports
Screenshots
Videos
Traces
Projects
```

---

# 22. Senior SDET interview scenario

### Interviewer:

> **"Your tests pass locally but fail in Jenkins. What will you check in Playwright config?"**

Don't say:

> "I'll increase the timeout."

Instead:

> "First I'll check whether the CI environment differs from local in browser mode, workers, CPU resources, 
 base URL, authentication state, environment variables, and timeout configuration. I'll enable trace and 
 screenshots on failure and analyze the failure before changing the timeout."

That's a much stronger answer.

---

# 23. Another common question

### Interviewer:

> "You have configured 4 workers, but Jenkins only has limited resources. What will you do?"

Answer:

> "I would reduce the worker count based on the CI machine's CPU and memory capacity. For example, I can
  configure 4 workers as the default but run the CI suite with `--workers=2`. I would also verify that 
  test data and shared resources are isolated before increasing parallelism."

---

# 24. `playwright.config.ts` vs `tsconfig.json`

This is **very commonly asked**.

| `playwright.config.ts`   | `tsconfig.json`          |
| ------------------------ | ------------------------ |
| Playwright configuration | TypeScript configuration |
| Controls test execution  | Controls TypeScript      |
| Workers                  | Type checking            |
| Retries                  | Target JS version        |
| Browser                  | Module system            |
| Base URL                 | Type definitions         |
| Timeout                  | Import resolution        |
| Reporter                 | Include/exclude          |
| Screenshot               | Strict mode              |
| Trace/video              | Path aliases             |

### Simple mental model

```text
tsconfig.json
     ↓
"How does TypeScript understand my code?"

playwright.config.ts
     ↓
"How does Playwright execute my tests?"
```

---

# 25. Best 60-second interview answer

If the interviewer says:

> **"Explain your Playwright config file."**

Say this:

> **"In my framework, `playwright.config.ts` is the central configuration file for test execution. I configure 
 the test directory, base URL, timeout, expect timeout, workers, parallel execution, retries, browser projects, 
 authentication state, screenshots, videos, traces, and reporters.**
>
> **For example, I use `baseURL` so tests don't hardcode environment URLs, `workers` and `fullyParallel` for
  parallel execution, retries mainly in CI for transient failures, and trace, screenshot, and video on failure
   for debugging.**
>
> **I use projects when I need cross-browser or different execution configurations. For enterprise applications
  with SSO, I can configure `storageState` so tests reuse authenticated sessions instead of logging in through
   the UI for every test.**
>
> **I also make environment-specific values configurable through environment variables so the same framework 
 can run against QA, UAT, or other environments."**

### The key is to explain it as a **framework decision**, not a list of properties.

```text
             playwright.config.ts
                     |
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
   Execution       Browser       Debugging
       |             |             |
   workers         projects       trace
   retries         chromium       screenshot
   timeout         firefox        video
   parallel        webkit
       |
       ↓
Environment + Authentication + Reporting
```

This is the level of explanation I'd use for a **Senior SDET / Playwright interview**.


*/