// what is the main purpose of fixture
/*

A fixture is a reusable piece of test setup that provides something a test needs, such as a browser page, 
logged-in user, API client, test data, or Page Object. It helps us centralize setup and cleanup instead of
repeating the same code in every test.

Test
 ↓
Needs something
 ↓
Fixture prepares it
 ↓
Test uses it
 ↓
Fixture cleans it up

Playwright already provides built-in fixtures such as:

page
browser
context
request

1. Why do we need fixtures?

Suppose you have 100 tests.

Without fixtures:


*/


import { expect, test } from '@playwright/test';


test('Test 1', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.google.com/");
  // test
});

test('Test 2', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.google.com/");
  // test
});

test('Test 3', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.google.com/");
  // test
});

//You are repeating setup everywhere.

//With a fixture:

/*
test('Test 11', async ({ loggedInPage }) => {
   // test
});

test('Test 21', async ({ loggedInPage }) => {
   // test
});

test('Test 31', async ({ loggedInPage }) => {
   // test
});

//The setup is centralized.

/*

2. Built-in Playwright fixtures

Playwright gives us fixtures automatically.

For example:

test('Login test', async ({ page }) => {

  await page.goto('https://example.com');

});

Here:

{ page }
   ↓
Playwright Fixture
   ↓
Provides browser page

You don't manually create the browser/page.

Similarly:

test('API test', async ({ request }) => {

  const response = await request.get('/users');

});

request is a built-in fixture for API testing.

3. Real framework use — Login fixture

This is where fixtures become very useful in a real framework.

Suppose your application requires login for almost every test.

Without fixture:

test('Create claim', async ({ page }) => {

  await page.goto('/login');

  await page.getByLabel('Username').fill('neeraj');
  await page.getByLabel('Password').fill('Password123');

  await page.getByRole('button', { name: 'Login' }).click();

  // Now test claim
});

Every test repeats login.

Instead, create a custom fixture.

fixtures.ts
import { test as base } from '@playwright/test';

type MyFixtures = {
  loggedInPage: any;
};

export const test = base.extend<MyFixtures>({

  loggedInPage: async ({ page }, use) => {

    await page.goto('/login');

    await page.getByLabel('Username').fill('neeraj');
    await page.getByLabel('Password').fill('Password123');

    await page.getByRole('button', { name: 'Login' }).click();

    await use(page);
  }
});

export { expect } from '@playwright/test';

Now the test becomes:

import { test, expect } from '../fixtures';

test('Create claim', async ({ loggedInPage }) => {

  await loggedInPage.goto('/claims');

  await loggedInPage.getByLabel('Policy Number')
    .fill('POL1001');

  await loggedInPage.getByRole('button', {
    name: 'Submit'
  }).click();

});
What happened?
Test
 ↓
loggedInPage fixture
 ↓
Open login
 ↓
Enter credentials
 ↓
Login
 ↓
Give authenticated page to test
 ↓
Test starts

The test doesn't care how login happens.

That's a major framework benefit.

4. Fixture + Page Object Model

This is a very common enterprise framework design.

Suppose you have:

pages/
   LoginPage.ts
   ClaimPage.ts
   DashboardPage.ts

fixtures/
   testFixtures.ts

tests/
   claim.spec.ts
LoginPage.ts
import { Page } from '@playwright/test';

export class LoginPage {

  constructor(private page: Page) {}

  username = this.page.getByLabel('Username');
  password = this.page.getByLabel('Password');
  loginButton = this.page.getByRole('button', {
    name: 'Login'
  });

  async login(username: string, password: string) {

    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
Fixture
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type Fixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<Fixtures>({

  loginPage: async ({ page }, use) => {

    const loginPage = new LoginPage(page);

    await use(loginPage);
  }
});

export { expect } from '@playwright/test';

Test:

import { test } from '../fixtures/testFixtures';

test('Login test', async ({ loginPage }) => {

  await loginPage.login(
    'neeraj',
    'Password123'
  );

});
5. Fixture for multiple Page Objects

This is even more realistic.

You might have:

LoginPage
DashboardPage
ClaimPage
PolicyPage

Instead of creating them repeatedly:

type Fixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  claimPage: ClaimPage;
};

Fixture:

export const test = base.extend<Fixtures>({

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  claimPage: async ({ page }, use) => {
    await use(new ClaimPage(page));
  }

});

Now:

test('Submit claim', async ({
  loginPage,
  dashboardPage,
  claimPage
}) => {

  await loginPage.login(
    'neeraj',
    'Password123'
  );

  await dashboardPage.openClaims();

  await claimPage.submitClaim();

});

This makes the test very readable.

6. Fixture for test data

Fixtures aren't only for pages.

Suppose every test needs customer data.

type Fixtures = {
  customerData: {
    name: string;
    email: string;
  };
};

Fixture:

export const test = base.extend<Fixtures>({

  customerData: async ({}, use) => {

    const data = {
      name: 'Neeraj',
      email: 'neeraj@test.com'
    };

    await use(data);
  }

});

Test:

test('Create customer', async ({ customerData }) => {

  console.log(customerData.name);
  console.log(customerData.email);

});

/*
7. Very important: API fixture for test data

This is a Senior SDET-level real-world use.

Suppose your UI test needs an existing customer.

Instead of creating the customer through UI:

UI
 ↓
Create customer
 ↓
Navigate
 ↓
Create claim

That makes the test slow.

Instead:

API
 ↓
Create customer
 ↓
Get customer ID
 ↓
UI
 ↓
Create claim

Fixture can handle this setup.

Conceptually:

*/
/*
customer: async ({ request }, use) => {

  const response = await request.post('/customers', {
    data: {
      name: 'Neeraj',
      email: `neeraj-${Date.now()}@test.com`
    }
  });

  const customer = await response.json();

  await use(customer);
}

Then:

test('Create claim', async ({
//  customer,
  page
}) => {

  await page.goto('/claims');

  await page.getByLabel('Customer ID')
  //  .fill(customer.id);

});

/*
This is a very practical reason to use fixtures.

8. Fixture for authentication

Another common enterprise scenario:

Login
 ↓
Authentication token/cookies
 ↓
Many tests

Instead of logging in through UI for every test, you can prepare authentication state and provide it through your framework.

For example, Playwright's storageState can preserve authenticated browser state.

*/
/*
const context = await browser.newContext({
  storageState: 'auth.json'
});

//Then tests start already authenticated.
// This can significantly reduce unnecessary login execution.
// 9. Fixture for cleanup
// Fixtures can also manage cleanup.


customer: async ({ request }, use) => {

  // Setup
  const response = await request.post('/customers', {
    data: {
      name: 'Neeraj'
    }
  });

  const customer = await response.json();

  await use(customer);

  // Cleanup
  await request.delete(`/customers/${customer.id}`);
}

/*

Think:

Before test
   ↓
Create customer
   ↓
use(customer)
   ↓
Test executes
   ↓
Delete customer

This is called setup + teardown.

10. Fixture scope

Playwright fixtures can have different scopes.

Common concept:

Scope	Meaning	Example
Test	Created for each test	Test data
Worker	Shared within a worker	Expensive setup
Auto fixture	Runs automatically	Logging/setup

For example:

{
  scope: 'worker'
}

means the fixture is created once for that worker rather than once per test.

You need to be careful with worker-scoped mutable data because parallel tests can interfere with each other.

11. Hooks vs Fixtures

This is a very common interview question.

Hooks
test.beforeEach(async ({ page }) => {
  await page.goto('/login');
});

Hooks are good for simple setup/teardown.

Fixture
test('Create claim', async ({ loggedInPage }) => {
   // ...
});

/*

Fixtures are better when the setup itself is a reusable dependency that tests explicitly request.

Easy difference
Hook
 ↓
"Do this before my test"

Fixture
 ↓
"Give my test this prepared thing"

For example:

Hook:

beforeEach → open application

Fixture:

loggedInPage → give me an authenticated page
12. Fixture in your complete framework

A good Senior SDET framework could look like:

Playwright Framework
│
├── tests/
│   ├── login.spec.ts
│   ├── claim.spec.ts
│   └── policy.spec.ts
│
├── pages/
│   ├── LoginPage.ts
│   ├── ClaimPage.ts
│   └── PolicyPage.ts
│
├── fixtures/
│   └── testFixtures.ts
│
├── test-data/
│   ├── users.json
│   └── claims.json
│
├── utils/
│   ├── apiUtils.ts
│   └── dataUtils.ts
│
└── playwright.config.ts

Flow:

                   Fixture
                      ↓
       ┌──────────────┼──────────────┐
       ↓              ↓              ↓
   LoginPage      Test Data       API Data
       ↓              ↓              ↓
       └─────────── Test ────────────┘
                       ↓
                  Playwright
                       ↓
                    Report
13. Interview answer — speak this

“In Playwright, a fixture is a reusable setup mechanism that provides dependencies to tests. Playwright already provides built-in fixtures like page, context, browser and request, and we can create custom fixtures using test.extend().

In my framework, I use custom fixtures for common requirements such as authenticated sessions, Page Objects, API-generated test data and cleanup. For example, instead of performing login in every test, I create a loggedInPage fixture that handles authentication and provides the authenticated page to the test. I also use API-based fixtures to create test data before the UI test and clean it up afterward.

This keeps test cases focused on business scenarios, reduces duplicate setup code, improves maintainability, and makes the framework easier to scale.”

One line to remember

POM tells me how to interact with the page.
Fixture tells my test what prepared dependency it can use.

*/

