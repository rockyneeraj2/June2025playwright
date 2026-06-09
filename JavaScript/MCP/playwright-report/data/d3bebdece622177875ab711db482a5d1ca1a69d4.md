# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: naukri-automation.spec.js >> Naukri.com Resume Upload Workflow >> Complete Naukri login and resume upload workflow
- Location: tests\naukri-automation.spec.js:32:3

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected pattern: /Naukri|Login/i
Received string:  "Access Denied"
Timeout: 5000ms

Call log:
  - Expect "toHaveTitle" with timeout 5000ms
    9 × unexpected value "Access Denied"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - heading "Access Denied" [level=1] [ref=e2]
  - text: You don't have permission to access "http://www.naukri.com/nlogin/login" on this server.
  - paragraph [ref=e3]: "Reference #18.55882c31.1777740988.9937764c"
  - paragraph [ref=e4]: https://errors.edgesuite.net/18.55882c31.1777740988.9937764c
```

# Test source

```ts
  1   | // tests/naukri-automation.spec.js
  2   | /**
  3   |  * Naukri.com Automation Script
  4   |  * 
  5   |  * Workflow:
  6   |  * 1. Login to Naukri with credentials
  7   |  * 2. Navigate to profile
  8   |  * 3. Upload resume from local file
  9   |  */
  10  | 
  11  | const { test, expect } = require('@playwright/test');
  12  | const path = require('path');
  13  | 
  14  | test.describe('Naukri.com Resume Upload Workflow', () => {
  15  |   
  16  |   const CREDENTIALS = {
  17  |     email: 'neerajkr7766@gmail.com',
  18  |     password: 'bodhgaya#123',
  19  |   };
  20  |   
  21  |   const RESUME_PATH = 'C:\\Users\\neera\\Downloads\\Neeraj_Kumar_SDET_Resume (2).pdf';
  22  |   
  23  |   test.beforeEach(async ({ page }) => {
  24  |     console.log('\n[SETUP] Initializing test environment');
  25  |     // Set a longer timeout for Naukri as it can be slow
  26  |     page.setDefaultTimeout(60000);
  27  |   });
  28  | 
  29  |   // ============================================
  30  |   // MAIN WORKFLOW TEST
  31  |   // ============================================
  32  |   test('Complete Naukri login and resume upload workflow', async ({ page }) => {
  33  |     console.log('\n=== NAUKRI.COM AUTOMATION WORKFLOW ===');
  34  |     
  35  |     // STEP 1: NAVIGATE TO LOGIN PAGE
  36  |     console.log('\n[STEP 1] Navigating to Naukri login page');
  37  |     await page.goto('https://www.naukri.com/nlogin/login');
  38  |     console.log('[AGENT] Page loaded:', page.url());
  39  |     
  40  |     // Verify we're on the login page
> 41  |     await expect(page).toHaveTitle(/Naukri|Login/i);
      |                        ^ Error: expect(page).toHaveTitle(expected) failed
  42  |     console.log('[VERIFICATION] ✓ On login page');
  43  |     
  44  |     // STEP 2: ENTER EMAIL
  45  |     console.log('\n[STEP 2] Entering email credentials');
  46  |     const emailField = page.locator('input[placeholder*="email" i], input[id*="email" i], input[name*="email" i]').first();
  47  |     
  48  |     if (await emailField.isVisible()) {
  49  |       await emailField.fill(CREDENTIALS.email);
  50  |       console.log('[AGENT] ✓ Email entered:', CREDENTIALS.email);
  51  |     } else {
  52  |       console.log('[ERROR] Email field not found - trying alternative selectors');
  53  |       // Try alternative selectors
  54  |       const allInputs = await page.locator('input[type="text"]').count();
  55  |       console.log('[INFO] Found', allInputs, 'text input fields');
  56  |       
  57  |       // Usually first text input is email
  58  |       await page.locator('input[type="text"]').first().fill(CREDENTIALS.email);
  59  |       console.log('[AGENT] ✓ Email entered (alternative selector)');
  60  |     }
  61  |     
  62  |     // Wait a moment for field to register
  63  |     await page.waitForTimeout(500);
  64  |     
  65  |     // STEP 3: ENTER PASSWORD
  66  |     console.log('\n[STEP 3] Entering password');
  67  |     const passwordField = page.locator('input[type="password"]');
  68  |     
  69  |     if (await passwordField.isVisible()) {
  70  |       await passwordField.fill(CREDENTIALS.password);
  71  |       console.log('[AGENT] ✓ Password entered');
  72  |     } else {
  73  |       console.log('[ERROR] Password field not found');
  74  |     }
  75  |     
  76  |     await page.waitForTimeout(500);
  77  |     
  78  |     // STEP 4: CLICK LOGIN BUTTON
  79  |     console.log('\n[STEP 4] Clicking login button');
  80  |     const loginButton = page.locator('button:has-text("Login"), button:has-text("Sign in"), button[type="submit"]').first();
  81  |     
  82  |     if (await loginButton.isVisible()) {
  83  |       console.log('[AGENT] Found login button - clicking');
  84  |       await loginButton.click();
  85  |     } else {
  86  |       console.log('[ERROR] Login button not found');
  87  |       // Try pressing Enter as alternative
  88  |       console.log('[AGENT] Trying Enter key as alternative');
  89  |       await page.press('input[type="password"]', 'Enter');
  90  |     }
  91  |     
  92  |     // Wait for login to complete
  93  |     console.log('[AGENT] Waiting for login to complete...');
  94  |     await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {
  95  |       console.log('[INFO] Network idle timeout - continuing anyway');
  96  |     });
  97  |     
  98  |     await page.waitForTimeout(2000);
  99  |     
  100 |     console.log('[VERIFICATION] After login, current URL:', page.url());
  101 |     
  102 |     // STEP 5: NAVIGATE TO VIEW PROFILE
  103 |     console.log('\n[STEP 5] Navigating to view profile');
  104 |     
  105 |     // Wait for profile menu or link to appear
  106 |     const profileLink = page.locator(
  107 |       'a:has-text("View Profile"), ' +
  108 |       'text=View Profile, ' +
  109 |       'button:has-text("Profile"), ' +
  110 |       'a[href*="profile"]'
  111 |     ).first();
  112 |     
  113 |     if (await profileLink.isVisible({ timeout: 10000 }).catch(() => false)) {
  114 |       console.log('[AGENT] Found View Profile link - clicking');
  115 |       await profileLink.click();
  116 |       await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
  117 |       console.log('[AGENT] ✓ Navigated to profile');
  118 |     } else {
  119 |       console.log('[INFO] View Profile link not immediately visible');
  120 |       console.log('[INFO] Current URL:', page.url());
  121 |       
  122 |       // Try to find profile using URL or header navigation
  123 |       const profileHeader = page.locator('[class*="profile"], [class*="userProfile"]').first();
  124 |       if (await profileHeader.isVisible().catch(() => false)) {
  125 |         console.log('[AGENT] Found profile section');
  126 |         await profileHeader.click().catch(() => {});
  127 |       }
  128 |     }
  129 |     
  130 |     // STEP 6: FIND AND CLICK UPLOAD RESUME
  131 |     console.log('\n[STEP 6] Finding upload resume button');
  132 |     
  133 |     // Look for upload resume button
  134 |     const uploadButton = page.locator(
  135 |       'button:has-text("Upload Resume"), ' +
  136 |       'button:has-text("upload"), ' +
  137 |       'a:has-text("Upload Resume"), ' +
  138 |       'text=Upload Resume, ' +
  139 |       'text=upload'
  140 |     ).first();
  141 |     
```