import { test } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

//how to read the data from josn how i can access the file

test('Read test data from CSV', async ({ page }) => {

    const csvData = fs.readFileSync(
        './testdata.csv',
        'utf-8'
    );

    const records = parse(csvData, {
        columns: true,
        skip_empty_lines: true,
        delimiter: ';'
    });

    console.log(records);

    console.log('Name:', records[0].name);
    console.log('Age:', records[0].age);
});

/*

Yes. For a **Senior SDET Playwright interview**, when they ask **“How do you read test data in your
 framework?”**, don't give only one method. Explain how you handle **JSON, CSV/Excel, environment 
 variables, and data-driven tests**.

The most common and clean approach is **JSON + TypeScript**, especially for Playwright.

---

## 1. Real framework structure

```text
Playwright Framework
│
├── tests/
│   └── login.spec.ts
│
├── test-data/
│   └── users.json
│
├── pages/
│   └── LoginPage.ts
│
├── fixtures/
│
├── utils/
│
└── playwright.config.ts
```

Suppose `users.json` contains:

```json
{
  "validUser": {
    "username": "neeraj@test.com",
    "password": "Password123"
  },
  "invalidUser": {
    "username": "wrong@test.com",
    "password": "Wrong123"
  }
}
```

---

# 2. Read JSON test data

In your test:

```ts
import { test, expect } from '@playwright/test';
import users from '../test-data/users.json';

test('valid login', async ({ page }) => {

  await page.goto('/login');

  await page.getByLabel('Username').fill(
    users.validUser.username
  );

  await page.getByLabel('Password').fill(
    users.validUser.password
  );

  await page.getByRole('button', {
    name: 'Login'
  }).click();

  await expect(
    page.getByText('Dashboard')
  ).toBeVisible();
});
```

The flow is:

```text
users.json
    ↓
import users
    ↓
users.validUser.username
    ↓
Playwright test
```

---

# 3. If interviewer gives this data

Suppose the file is:

```json
{
  "name": "Neeraj",
  "role": "SDET",
  "experience": 7.7
}
```

You can read it:

```ts
import testData from '../test-data/testdata.json';

console.log(testData.name);
console.log(testData.role);
console.log(testData.experience);
```

Output:

```text
Neeraj
SDET
7.7
```

---

# 4. Multiple test data — Data-driven testing

This is more important for a Senior SDET.

Suppose:

```json
[
  {
    "username": "user1@test.com",
    "password": "Password1"
  },
  {
    "username": "user2@test.com",
    "password": "Password2"
  },
  {
    "username": "user3@test.com",
    "password": "Password3"
  }
]
```

Read it:

```ts
import { test } from '@playwright/test';
import users from '../test-data/users.json';

for (const user of users) {

  test(`Login test for ${user.username}`, async ({ page }) => {

    await page.goto('/login');

    await page.getByLabel('Username')
      .fill(user.username);

    await page.getByLabel('Password')
      .fill(user.password);

    await page.getByRole('button', {
      name: 'Login'
    }).click();
  });
}
```

Now Playwright generates:

```text
Login test for user1@test.com
Login test for user2@test.com
Login test for user3@test.com
```

This is **data-driven testing**.

---

# 5. Better framework approach — separate test data from test logic

Don't do this:

```ts
test('login', async ({ page }) => {

  await page.getByLabel('Username')
    .fill('neeraj@test.com');

  await page.getByLabel('Password')
    .fill('Password123');

});
```

Because your test data is hardcoded.

Instead:

```text
Test
 ↓
Test Data
 ↓
Page Object
 ↓
Application
```

Example:

```text
test-data/
   users.json

pages/
   LoginPage.ts

tests/
   login.spec.ts
```

---

# 6. Using POM with test data

### `LoginPage.ts`

```ts
import { Page } from '@playwright/test';

export class LoginPage {

  constructor(private page: Page) {}

  async login(username: string, password: string) {

    await this.page
      .getByLabel('Username')
      .fill(username);

    await this.page
      .getByLabel('Password')
      .fill(password);

    await this.page
      .getByRole('button', { name: 'Login' })
      .click();
  }
}
```

### `login.spec.ts`

```ts
import { test, expect } from '@playwright/test';
import users from '../test-data/users.json';
import { LoginPage } from '../pages/LoginPage';

test('valid login', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await page.goto('/login');

  await loginPage.login(
    users.validUser.username,
    users.validUser.password
  );

  await expect(
    page.getByText('Dashboard')
  ).toBeVisible();
});
```

Now responsibilities are clean:

```text
users.json
     ↓
Test Data

login.spec.ts
     ↓
Test Scenario

LoginPage.ts
     ↓
UI Actions
```

---

# 7. Reading environment variables

Don't store sensitive credentials like passwords in Git.

Instead:

```text
.env
```

Example:

```text
USERNAME=neeraj@test.com
PASSWORD=Password123
```

Then:

```ts
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
```

Use:

```ts
await page.getByLabel('Username').fill(username!);
await page.getByLabel('Password').fill(password!);
```

For CI/CD:

```text
Jenkins / Azure DevOps
        ↓
Environment variables / secrets
        ↓
Playwright
```

### Senior SDET point

> "I keep non-sensitive test data in JSON/CSV files, while credentials and secrets are injected through
  environment variables or CI/CD secret management rather than storing them in source control."

---

# 8. Reading CSV data

If your organization provides test cases in CSV:

```text
test-data/users.csv
```

Example:

```text
username,password,expected
user1@test.com,Password1,success
user2@test.com,Password2,failure
```

You can use a CSV parsing library.

Conceptually:

```text
CSV
 ↓
CSV parser
 ↓
JavaScript objects
 ↓
Playwright tests
```

For example, after parsing:

```ts
[
  {
    username: 'user1@test.com',
    password: 'Password1',
    expected: 'success'
  },
  {
    username: 'user2@test.com',
    password: 'Password2',
    expected: 'failure'
  }
]
```

Then:

```ts
for (const data of testData) {

  test(`Login - ${data.username}`, async ({ page }) => {

    await page.goto('/login');

    await page.getByLabel('Username')
      .fill(data.username);

    await page.getByLabel('Password')
      .fill(data.password);

  });
}
```

---

# 9. Excel test data

This is also frequently asked in enterprise projects.

Suppose:

```text
TestData.xlsx
       ↓
Sheet: Login
       ↓
Username | Password | Expected
```

You can use a Node.js Excel library such as `xlsx` to read the spreadsheet and convert rows into objects.

Then:

```text
Excel
 ↓
xlsx library
 ↓
JSON / objects
 ↓
Playwright
```

The important interview point isn't memorizing the library API.

Say:

> "For Excel-based test data, I use an Excel parsing library to convert worksheet rows into JavaScript 
 objects and then feed those objects into data-driven Playwright tests."

---

# 10. API test data

In a real framework, test data isn't always static.

For example, you need a customer ID.

You call:

```text
POST /customers
```

Response:

```json
{
  "id": 101,
  "name": "Neeraj"
}
```

Then extract:

```ts
const response = await request.post('/customers', {
  data: {
    name: 'Neeraj'
  }
});

const customer = await response.json();

const customerId = customer.id;
```

Now use it in UI/API testing:

```ts
await page.goto(`/customers/${customerId}`);
```

This is **dynamic test data generation**.

---

# 11. Static vs dynamic test data

This distinction sounds very good in a Senior SDET interview.

### Static data

```text
users.json
products.json
config.json
```

Example:

```json
{
  "username": "neeraj@test.com"
}
```

### Dynamic data

Generated during execution:

```ts
const email =
  `user_${Date.now()}@test.com`;
```

Or:

```text
POST customer
      ↓
customerId = 101
      ↓
PUT customer/101
      ↓
GET customer/101
```

---

# 12. Real-time interview scenario

### Interviewer:

> "You have 1,000 Playwright tests. How will you manage test data?"

Don't say:

> "I'll put everything in one JSON file."

Instead:

> "I would separate test data based on its purpose. Stable non-sensitive data can be maintained in JSON or
  similar files. Environment-specific values can come from configuration or environment variables. Credentials 
  should come from secure CI/CD secrets. For data that needs to be unique, especially during parallel execution,
   I would generate it dynamically or create it through API setup. I would also isolate test data per worker or
    test where necessary to prevent parallel tests from modifying the same records."

That's a **Senior SDET answer**.

---

# 13. Another real scenario: parallel execution

Suppose:

```text
workers: 4
```

and all tests use:

```json
{
  "email": "test@test.com"
}
```

You may get:

```text
Worker 1 → Create test@test.com
Worker 2 → Create test@test.com ❌
Worker 3 → Create test@test.com ❌
Worker 4 → Create test@test.com ❌
```

Instead generate unique data:

```ts
const email =
  `test_${test.info().workerIndex}_${Date.now()}@test.com`;
```

Example:

```text
Worker 0 → test_0_1726300000@test.com
Worker 1 → test_1_1726300000@test.com
Worker 2 → test_2_1726300000@test.com
Worker 3 → test_3_1726300000@test.com
```

Now your test data is much safer for parallel execution.

---

# 14. Best interview answer

If they simply ask:

> **"How do you read test data in Playwright?"**

Answer:

> **"In my Playwright framework, I separate test data from test logic. For commonly used static data, I use
  JSON files and import them directly into the TypeScript tests. For data-driven scenarios, I maintain an
   array of test-data objects and iterate over them to generate tests. For Excel or CSV-based data, I use
    a parser to convert the data into JavaScript objects. Sensitive information such as passwords and tokens 
    is not stored in the test-data files; I inject it through environment variables or CI/CD secrets. For 
    dynamic scenarios, I generate unique data or create the required test data through API calls. This 
    approach keeps the framework maintainable and supports parallel execution."**

### Remember the architecture, not the syntax:

```text
                 TEST DATA
                     |
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
     JSON          CSV/Excel      API
       |             |             |
       └─────────────┼─────────────┘
                     ↓
             JavaScript Objects
                     ↓
              Playwright Test
                     ↓
                  POM
                     ↓
                Application
```

**This is the answer I'd expect from a Senior SDET rather than simply saying “I use JSON.”**


*/