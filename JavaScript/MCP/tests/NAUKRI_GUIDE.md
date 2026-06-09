# Naukri.com Automation Script - Complete Guide

## 📋 Overview

This Playwright automation script performs a complete workflow on Naukri.com:

```
1. Navigate to login page
2. Enter email credentials
3. Enter password
4. Click login button
5. Navigate to view profile
6. Click upload resume button
7. Upload resume file from local system
8. Verify successful upload
```

---

## 🚀 Quick Start

### Run the Complete Workflow
```bash
npx playwright test tests/naukri-automation.spec.js
```

### Run in Visual UI Mode (Recommended)
```bash
npx playwright test tests/naukri-automation.spec.js --ui
```

### Run in Headed Mode (See Browser)
```bash
npx playwright test tests/naukri-automation.spec.js --headed
```

### Debug Mode (Step Through)
```bash
npx playwright test tests/naukri-automation.spec.js --debug
```

---

## 📝 Script Details

### Credentials Used
- **Email:** neerajkr7766@gmail.com
- **Password:** bodhgaya#123

### Resume File Path
- **Location:** `C:\Users\neera\Downloads\Neeraj_Kumar_SDET_Resume (2).pdf`

### Key Features

✅ **Step-by-step logging** - See exactly what the script is doing
✅ **Error handling** - Falls back to alternative selectors if needed
✅ **Wait strategies** - Proper waits for page loads and elements
✅ **Screenshot capture** - Saves screenshot of final state
✅ **Modular approach** - Can run individual steps for debugging

---

## 🧪 Test Files

### tests/naukri-automation.spec.js

Contains 4 different tests:

#### Test 1: Complete Workflow (Recommended)
**Name:** "Complete Naukri login and resume upload workflow"

Runs all steps in sequence:
1. Navigate to login
2. Enter credentials
3. Login
4. Navigate to profile
5. Upload resume
6. Verify success

**Run with:**
```bash
npx playwright test tests/naukri-automation.spec.js -g "Complete Naukri"
```

#### Test 2: Login Only
**Name:** "Step 1: Login to Naukri"

Tests only the login functionality.

**Run with:**
```bash
npx playwright test tests/naukri-automation.spec.js -g "Step 1"
```

#### Test 3: View Profile
**Name:** "Step 2: Navigate to View Profile"

Tests navigation to profile after login.

**Run with:**
```bash
npx playwright test tests/naukri-automation.spec.js -g "Step 2"
```

#### Test 4: Upload Resume
**Name:** "Step 3: Upload Resume"

Tests resume upload functionality.

**Run with:**
```bash
npx playwright test tests/naukri-automation.spec.js -g "Step 3"
```

---

## 🔧 How It Works

### Step 1: Navigate to Login Page
```javascript
await page.goto('https://www.naukri.com/nlogin/login');
```
- Opens the Naukri login page
- Verifies page title contains "Naukri" or "Login"

### Step 2: Enter Email
```javascript
const emailField = page.locator('input[placeholder*="email" i]').first();
await emailField.fill('neerajkr7766@gmail.com');
```
- Finds email input field
- Fills with provided email
- Falls back to first text input if specific selector fails

### Step 3: Enter Password
```javascript
const passwordField = page.locator('input[type="password"]');
await passwordField.fill('bodhgaya#123');
```
- Finds password input
- Fills with provided password

### Step 4: Click Login
```javascript
const loginButton = page.locator('button:has-text("Login")').first();
await loginButton.click();
```
- Finds login button by text
- Clicks to submit login form
- Falls back to pressing Enter key if button not found

### Step 5: View Profile
```javascript
const profileLink = page.locator('a:has-text("View Profile")').first();
await profileLink.click();
```
- Finds "View Profile" link after successful login
- Clicks to navigate to profile page

### Step 6: Upload Resume
```javascript
const uploadButton = page.locator('button:has-text("Upload Resume")').first();
await uploadButton.click();
```
- Finds upload resume button
- Clicks to open upload dialog or area

### Step 7: Select File
```javascript
const fileInput = page.locator('input[type="file"]');
await fileInput.setInputFiles('C:\\Users\\neera\\Downloads\\Neeraj_Kumar_SDET_Resume (2).pdf');
```
- Finds file input element
- Sets the file path
- Playwright handles file selection without triggering OS dialogs

### Step 8: Verify Success
```javascript
await page.screenshot({ path: 'naukri-resume-uploaded.png' });
```
- Takes screenshot showing final state
- Verifies URL after upload
- Confirms workflow completion

---

## 🛠️ Customization Guide

### Change Credentials
Edit the `CREDENTIALS` object in the test file:

```javascript
const CREDENTIALS = {
  email: 'your-email@example.com',
  password: 'your-password',
};
```

### Change Resume Path
Edit the `RESUME_PATH` variable:

```javascript
const RESUME_PATH = 'C:\\path\\to\\your\\resume.pdf';
```

### Update Selectors
If Naukri changes their HTML, update the selectors:

```javascript
// Example: Change email field selector
const emailField = page.locator('input[id="emailId"]'); // Custom selector
```

Common selector patterns in Naukri:
- By ID: `input[id="login"]`
- By name: `input[name="email"]`
- By placeholder: `input[placeholder="Email"]`
- By type: `input[type="password"]`
- By text: `button:has-text("Login")`

### Add More Steps
To add additional steps, follow the pattern:

```javascript
console.log('\n[STEP N] Description of step');

// Action
await page.click('selector');
console.log('[AGENT] ✓ Action completed');

// Wait if needed
await page.waitForLoadState('networkidle', { timeout: 30000 });

// Verify
console.log('[VERIFICATION] Current URL:', page.url());
```

---

## 🐛 Troubleshooting

### Issue: "Element not found"

**Solution:** The script tries multiple selector patterns. If still not found:

1. Run in debug mode: `npx playwright test tests/naukri-automation.spec.js --debug`
2. Use Inspector to find the correct selector
3. Update the test file with the new selector

### Issue: "Login failed"

**Possible causes:**
- Email or password incorrect
- Naukri has 2FA enabled
- Session timeout
- Changed login flow

**Solutions:**
1. Verify credentials are correct
2. Check if manual login works
3. Look for OTP field in the test
4. Add waits if page is slow

### Issue: "Resume file not found"

**Check:**
1. File path is correct: `C:\Users\neera\Downloads\Neeraj_Kumar_SDET_Resume (2).pdf`
2. File exists on your system
3. File extension is correct (.pdf, .doc, .docx)

### Issue: "Timeout waiting for element"

**Solutions:**
1. Increase timeout: `await page.waitForSelector('selector', { timeout: 60000 })`
2. Check if page structure changed
3. Add explicit waits for network: `await page.waitForLoadState('networkidle')`

### Issue: "Screenshot shows login page"

The script didn't successfully login. Check:
1. Credentials are correct
2. Email field is being populated
3. Password field is being populated
4. Login button is being clicked
5. No unexpected dialogs or popups

---

## 📊 Script Output Example

When you run the script, you'll see logs like:

```
=== NAUKRI.COM AUTOMATION WORKFLOW ===

[STEP 1] Navigating to Naukri login page
[AGENT] Page loaded: https://www.naukri.com/nlogin/login
[VERIFICATION] ✓ On login page

[STEP 2] Entering email credentials
[AGENT] ✓ Email entered: neerajkr7766@gmail.com

[STEP 3] Entering password
[AGENT] ✓ Password entered

[STEP 4] Clicking login button
[AGENT] Found login button - clicking
[AGENT] Waiting for login to complete...
[VERIFICATION] After login, current URL: https://www.naukri.com/

[STEP 5] Navigating to view profile
[AGENT] Found View Profile link - clicking
[AGENT] ✓ Navigated to profile

[STEP 6] Finding upload resume button
[AGENT] ✓ Found upload resume button
[AGENT] ✓ Clicked upload resume

[STEP 7] Uploading resume file
[INFO] Resume path: C:\Users\neera\Downloads\Neeraj_Kumar_SDET_Resume (2).pdf
[INFO] Found 1 file input(s)
[AGENT] Setting file path...
[AGENT] ✓ File set: C:\Users\neera\Downloads\Neeraj_Kumar_SDET_Resume (2).pdf
[AGENT] Found submit button - clicking
[AGENT] ✓ Resume upload submitted
[AGENT] ✓ Upload complete

[STEP 8] Verifying upload success
[INFO] Screenshot saved: naukri-resume-uploaded.png
[VERIFICATION] Final URL: https://www.naukri.com/resumeUpload
[SUCCESS] Workflow completed!
```

---

## ✅ Expected Results

After successful execution, you should see:

1. ✅ Login successful - redirected to home page
2. ✅ Profile accessed - on profile page
3. ✅ Resume uploaded - confirmation message
4. ✅ Screenshot saved - `naukri-resume-uploaded.png`
5. ✅ Console logs - showing each step

---

## 📋 Checklist Before Running

- [ ] Credentials are correct
- [ ] Resume file exists at specified path
- [ ] File has correct format (.pdf, .doc, .docx)
- [ ] Naukri is accessible
- [ ] No VPN/firewall blocking
- [ ] Browser is updated
- [ ] Playwright is installed (`npm install`)

---

## 🎯 Advanced Usage

### Run on Specific Browser
```bash
# Chrome only
npx playwright test tests/naukri-automation.spec.js --project=chromium

# Firefox (if installed)
npx playwright test tests/naukri-automation.spec.js --project=firefox

# Safari (if installed)
npx playwright test tests/naukri-automation.spec.js --project=webkit
```

### Run with Different Timeouts
Edit `playwright.config.js`:
```javascript
{
  timeout: 60000, // 60 seconds instead of 30
}
```

### Generate Trace for Debugging
```bash
npx playwright test tests/naukri-automation.spec.js --trace on
```

---

## 📞 Quick Reference Commands

```bash
# Run test
npx playwright test tests/naukri-automation.spec.js

# Visual UI mode
npx playwright test tests/naukri-automation.spec.js --ui

# See browser
npx playwright test tests/naukri-automation.spec.js --headed

# Debug step-by-step
npx playwright test tests/naukri-automation.spec.js --debug

# View report
npx playwright show-report
```

---

## 🔐 Security Notes

⚠️ **Important:** This script contains credentials in plaintext. For production use:

1. Use environment variables:
   ```javascript
   const CREDENTIALS = {
     email: process.env.NAUKRI_EMAIL,
     password: process.env.NAUKRI_PASSWORD,
   };
   ```

2. Set environment before running:
   ```bash
   $env:NAUKRI_EMAIL = "your-email@gmail.com"
   $env:NAUKRI_PASSWORD = "your-password"
   npx playwright test tests/naukri-automation.spec.js
   ```

3. Never commit credentials to version control
4. Use `.env` files with `.gitignore`

---

## 📞 Support & Next Steps

1. Run the script: `npm run test:ui`
2. Select naukri test from the list
3. Watch execution in real-time
4. Check console logs for status
5. Review screenshot in project folder

Happy testing! 🚀
