import { test, expect, Page, Locator, chromium } from '@playwright/test';

test('Browser', async ({ page, browser }) => {

    //Browser represents the actual browser process, such as Chromium, Firefox, or WebKit.
    const browser1 = await chromium.launch();

    //Think:
    // Browser = Chrome application
    // One browser can contain multiple isolated contexts.

    //Browser
    // ├── Context 1
    //├── Context 2
    //└── Context 3

    //Real use
    // You may launch one Chromium browser and create multiple independent users:


    const adminContext = await browser1.newContext();
    const userContext = await browser1.newContext();

});

test('Browser Context', async ({ page, browser }) => {

    //BrowserContext is like an incognito profile/session inside the browser.
    //Each context has its own:
    //Cookies
    // Local storage
    // Session storage
    // Authentication state
    // Permissions
    // Cache/session-related state
    const browser1 = await chromium.launch();
    const adminContext = await browser1.newContext();
    const userContext = await browser1.newContext();

    /*
    These two contexts are isolated.

Browser
│
├── Admin Context
│    ├── cookies
│    ├── localStorage
│    └── authentication
│
└── User Context
     ├── cookies
     ├── localStorage
     └── authentication

Admin login doesn't automatically log the user into the application.
    */

});

test('page', async ({ page, browser, context }) => {
    //Page represents a single browser tab/window.
    const page1 = await context.newPage();

    //Think:
    // Page = Chrome tab
    // One context can contain multiple pages.

    /*
Browser
   ↓
Context
   ├── Page 1 → Login
   ├── Page 2 → Dashboard
   └── Page 3 → Reports
    */

   //For example, when clicking a link that opens a new tab:
   const newPagePromise = context.waitForEvent('page');

    await page.getByText('Open Report').click();

    const newPage = await newPagePromise;

    await newPage.waitForLoadState();
});

/*
4. Real-world analogy

Imagine you're testing an online banking application.

Browser

Your Chrome application.

Chrome
BrowserContext

Different independent customers.

Chrome
│
├── Customer A session
│
└── Customer B session
Page

Tabs opened by each customer.

Customer A
 ├── Account tab
 └── Transaction tab

Customer B
 └── Account tab
5. Complete code example
import { chromium, test } from '@playwright/test';

test('Browser Context Page example', async () => {

  // Browser
  const browser = await chromium.launch();

  // Context
  const context = await browser.newContext();

  // Page
  const page = await context.newPage();

  await page.goto('https://example.com');

  console.log(await page.title());

  await browser.close();
});

Flow:

chromium.launch()
       ↓
    Browser
       ↓
browser.newContext()
       ↓
 BrowserContext
       ↓
context.newPage()
       ↓
     Page
       ↓
   page.goto()
6. Why BrowserContext is powerful

Suppose you want to test:

Admin user approves an order and normal user verifies the order.

You can create two isolated contexts.

const browser = await chromium.launch();

const adminContext = await browser.newContext();
const userContext = await browser.newContext();

const adminPage = await adminContext.newPage();
const userPage = await userContext.newPage();

Now:

Same Browser
      │
      ├──────── Admin Context
      │             ↓
      │         Admin Page
      │
      └──────── User Context
                    ↓
                User Page

Admin and user have separate cookies/authentication.

This is extremely useful for multi-user testing.

7. BrowserContext + storageState

A common real project example is authentication.

You can save an authenticated state:

await context.storageState({
  path: 'auth.json'
});

Then create a context using that state:

const context = await browser.newContext({
  storageState: 'auth.json'
});

Now the page starts with the saved authentication state.

This is commonly used to avoid logging in through the UI for every test.

8. Browser vs BrowserContext vs Page
Object	Think of it as	Main responsibility
Browser	Chrome application	Browser process
BrowserContext	Incognito/user session	Isolation, cookies, auth, permissions
Page	Browser tab	Interacting with web application
Relationship
Browser
   │
   ├── BrowserContext
   │       ├── Page
   │       ├── Page
   │       └── Page
   │
   └── BrowserContext
           ├── Page
           └── Page
9. Very common interview question
Interviewer:

"Can one BrowserContext have multiple pages?"

Answer:

Yes. A BrowserContext can contain multiple pages, where each page represents a browser tab or window. 
All pages within the same context share the context's cookies and authentication state.

For example:

const context = await browser.newContext();

const page1 = await context.newPage();
const page2 = await context.newPage();

Both belong to the same context.

10. Another interview question
"Can two BrowserContexts share cookies?"

Normally, no. Browser contexts are designed to provide isolated sessions.

const context1 = await browser.newContext();
const context2 = await browser.newContext();

They have independent storage/authentication state unless you explicitly provide or copy state.

⭐ Senior SDET interview answer

If they ask:

"Explain Browser, BrowserContext and Page in Playwright."

Say:

"Browser represents the actual browser instance. Inside the browser, I can create multiple BrowserContexts, 
and each context represents an isolated user session with its own cookies, local storage and authentication 
state. Within a context, I can create one or more Pages, where each page represents a browser tab or window.
 In my framework, I mainly work with the Page object for UI interactions, while BrowserContext is very useful
  for authentication, session isolation and multi-user scenarios. For example, I can create separate admin
   and normal-user contexts in the same browser and test their interactions independently."

Easy memory trick
Browser       = Chrome
Context       = User session
Page          = Tab

And for interviews, remember the hierarchy:

🌐 Browser
      ↓
👤 BrowserContext
      ↓
📑 Page
      ↓
🔍 Locator
      ↓
🖱️ Action

*/

