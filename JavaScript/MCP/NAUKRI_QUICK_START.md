# 🚀 Quick Start - Naukri Automation Test

## 30-Second Setup

Everything is ready! Just run one command:

```bash
npm run test:naukri:ui
```

This opens the interactive test UI where you can watch the Naukri automation execute in real-time.

---

## 📋 What the Test Does

The script will automatically:

1. ✅ Navigate to https://www.naukri.com/nlogin/login
2. ✅ Enter email: neerajkr7766@gmail.com
3. ✅ Enter password: bodhgaya#123
4. ✅ Click Login button
5. ✅ Click View Profile
6. ✅ Click Upload Resume
7. ✅ Upload file: `C:\Users\neera\Downloads\Neeraj_Kumar_SDET_Resume (2).pdf`
8. ✅ Verify successful upload

---

## 📊 Run Options

### Visual UI Mode (Recommended)
```bash
npm run test:naukri:ui
```
- Watch the test in visual interface
- Step through execution
- See all console logs
- **Best for learning**

### Headed Mode (See Browser)
```bash
npm run test:naukri
```
- Runs in full browser
- You can see everything happening
- Console logs in terminal

### Debug Mode (Step Through)
```bash
npm run test:naukri:debug
```
- Step through line by line
- Inspect variables
- Advanced debugging

### Command Line
```bash
npx playwright test tests/naukri-automation.spec.js
```
- Runs in headless mode
- Fastest execution

---

## 🎬 How to Run the UI Version

```bash
# Run this command
npm run test:naukri:ui

# This will:
# 1. Open Playwright Test UI
# 2. Show naukri-automation.spec.js tests
# 3. Click "Complete Naukri login..." to run
# 4. Watch browser automation in action
# 5. Read console logs showing each step
```

---

## ✅ What to Expect

**Terminal Output:**
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

[STEP 5] Navigating to view profile
[AGENT] Found View Profile link - clicking
[AGENT] ✓ Navigated to profile

[STEP 6] Finding upload resume button
[AGENT] ✓ Found upload resume button

[STEP 7] Uploading resume file
[AGENT] ✓ File set: C:\Users\neera\Downloads\Neeraj_Kumar_SDET_Resume (2).pdf
[AGENT] ✓ Resume upload submitted

[STEP 8] Verifying upload success
[INFO] Screenshot saved: naukri-resume-uploaded.png
[SUCCESS] Workflow completed!
```

**Browser:**
- You'll see the browser navigate through each step
- Form fields being filled automatically
- Buttons being clicked
- Profile page loading
- Resume upload completing

**Screenshot:**
- A file named `naukri-resume-uploaded.png` is saved showing the final state

---

## 🎯 3-Step Workflow

### Step 1: Run the Test
```bash
npm run test:naukri:ui
```

### Step 2: Watch It Execute
- Playwright Test UI opens
- Click the naukri test
- Watch browser do everything automatically
- Read console logs

### Step 3: Verify Success
- Check for success message in console
- Check browser shows Naukri profile
- Check screenshot saved in project folder

---

## 🔧 Customization

### Change Credentials
Edit `tests/naukri-automation.spec.js`:
```javascript
const CREDENTIALS = {
  email: 'your-email@gmail.com',      // Change this
  password: 'your-password',            // Change this
};
```

### Change Resume Path
Edit the same file:
```javascript
const RESUME_PATH = 'C:\\path\\to\\your\\resume.pdf';  // Change this
```

### Add More Steps
The script includes 4 different tests (see NAUKRI_GUIDE.md for details):
- Complete workflow (all steps)
- Login only
- View Profile
- Upload Resume

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Test times out | Increase timeout in playwright.config.js |
| Selectors not found | Naukri may have changed HTML - use debug mode to inspect |
| File not found | Verify resume file path is correct |
| Login fails | Check credentials, verify manual login works |
| Can't see browser | Run `npm run test:naukri` instead of UI mode |

---

## 📄 Full Documentation

For complete guide with troubleshooting and advanced usage:

👉 See: [NAUKRI_GUIDE.md](./NAUKRI_GUIDE.md)

---

## 💡 Key Concepts

### Why This Works
- **Playwright** automates browser interactions
- **Page objects** find elements using selectors
- **Waits** ensure elements are ready before interacting
- **Logging** shows exactly what's happening
- **Fallbacks** try alternative selectors if one fails

### How It Handles Issues
- Looks for multiple selector patterns
- Falls back to different strategies if one fails
- Includes explicit waits for slow pages
- Takes screenshots for verification
- Logs every step for debugging

---

## 🚀 Ready?

Run this now:
```bash
npm run test:naukri:ui
```

Then watch your Naukri automation in action! ✨

---

## 📋 Checklist

Before running, verify:
- [ ] Resume file exists at: `C:\Users\neera\Downloads\Neeraj_Kumar_SDET_Resume (2).pdf`
- [ ] Have stable internet connection
- [ ] Playwright is installed (`npm install` already done)
- [ ] Credentials are correct (email and password)
- [ ] Not using VPN/Proxy that might block

---

## Next Steps

1. **Run the test:** `npm run test:naukri:ui`
2. **Watch execution** in the Playwright UI
3. **Read console logs** to understand each step
4. **Check screenshot** for final state
5. **Customize if needed** (credentials, paths, selectors)

---

Happy automating! 🎉
