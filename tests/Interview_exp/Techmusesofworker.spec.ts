// if we have given worker 4 we want to execute only 2 how we can do in playwright
//"I have configured 4 workers in Playwright, but I want to execute with only 2 workers. How will you do it?"

//You can answer:

//"If 4 workers are configured in playwright.config.ts, I can override the worker count from the command line 
// using npx playwright test --workers=2. The command-line value takes precedence for that execution. In a 
// CI/CD framework, I can also make the worker count configurable using an environment variable so that local, 
// QA, and CI executions can use different levels of parallelism."

/*
Yes. This is a very common **Senior SDET interview scenario**.

### Scenario

Suppose your `playwright.config.ts` has:

```ts
workers: 4
```

That means Playwright is allowed to run **4 workers in parallel**.

But if you want a particular execution to use only **2 workers**, you can override it from the command line.

### 1. Config has 4 workers

```ts
// playwright.config.ts

import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: 4,
  fullyParallel: true,
});
```

Normally:

```bash
npx playwright test
```

➡️ Maximum **4 workers**.

---

### 2. Run only 2 workers

Use:

```bash
npx playwright test --workers=2
```

Now Playwright will use **maximum 2 workers**, even though the config says 4.

Think of it like:

```text
Configuration
     |
     v
workers: 4
     |
     | command-line override
     v
--workers=2
     |
     v
Actual execution = 2 workers
```

### 3. Example with 8 test files

Suppose you have:

```text
tests/
 ├── login.spec.ts
 ├── search.spec.ts
 ├── cart.spec.ts
 ├── payment.spec.ts
 ├── profile.spec.ts
 ├── orders.spec.ts
 ├── logout.spec.ts
 └── address.spec.ts
```

With:

```bash
npx playwright test --workers=2
```

Playwright can execute approximately:

```text
Worker 1              Worker 2
---------              ---------
login.spec.ts          search.spec.ts
cart.spec.ts           payment.spec.ts
profile.spec.ts        orders.spec.ts
logout.spec.ts         address.spec.ts
```

The important point is that **workers are a maximum level of parallelism**, not a guarantee that exactly 2 
workers will always be busy.

---

## 4. Different environments

A very practical framework approach is to control workers using an environment variable.

### `playwright.config.ts`

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: process.env.WORKERS
    ? Number(process.env.WORKERS)
    : 4,
});
```

Now:

### Local execution

```bash
npx playwright test
```

Uses:

```text
4 workers
```

### Run with 2 workers

```bash
WORKERS=2 npx playwright test
```

On Windows CMD:

```cmd
set WORKERS=2 && npx playwright test
```

PowerShell:

```powershell
$env:WORKERS="2"; npx playwright test
```

---

## 5. Interview answer

If interviewer asks:

> **"I have configured 4 workers in Playwright, but I want to execute with only 2 workers. How will you do it?"**

You can answer:

> "If 4 workers are configured in `playwright.config.ts`, I can override the worker count from the command line
  using `npx playwright test --workers=2`. The command-line value takes precedence for that execution. In a 
  CI/CD framework, I can also make the worker count configurable using an environment variable so that local,
   QA, and CI executions can use different levels of parallelism."

### One important distinction

Don't confuse:

```ts
workers: 4
```

with:

```ts
fullyParallel: true
```

**Workers = how many parallel worker processes Playwright can use.**

**fullyParallel = how Playwright distributes tests among those workers.**

So if interviewer asks:

> "I have 4 workers but I want only 2."

Your first answer should be:

```bash
npx playwright test --workers=2
```

That's the simplest and most practical solution.

*/