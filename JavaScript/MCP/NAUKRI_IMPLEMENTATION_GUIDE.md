# 🎯 Naukri Automation - Complete Implementation Guide

## 📦 What You Have

Complete Naukri.com automation that can be run in **3 different ways**:

---

## 🚀 Way 1: Playwright Test UI (Recommended for Learning)

### Command
```bash
npm run test:naukri:ui
```

### What Happens
- Opens Playwright Test UI
- Shows interactive test interface
- You can click and run tests visually
- Watch browser and console in real-time
- Step through execution

### Best For
- Learning how automation works
- Debugging issues
- Seeing visual feedback
- Understanding each step

### Example
```bash
$ npm run test:naukri:ui

# Opens browser with Playwright Test UI
# Shows naukri-automation.spec.js tests
# Click "Complete Naukri..." to run
# Watch browser automate everything
```

---

## 🎬 Way 2: Headed Mode (See the Browser)

### Command
```bash
npm run test:naukri
```

### What Happens
- Opens browser window
- Automation runs in real browser
- You see everything happening
- Console logs in terminal
- Fast execution

### Best For
- Seeing actual browser automation
- Verifying behavior
- Getting comfortable with automation
- Demonstrations

### Example
```bash
$ npm run test:naukri

# Browser opens
# Automation runs visibly
# Terminal shows logs:
# [STEP 1] Navigating to login...
# ✓ Email entered
# ✓ Login clicked
# etc.
```

---

## 🐛 Way 3: Debug Mode (Step Through Code)

### Command
```bash
npm run test:naukri:debug
```

### What Happens
- Launches Playwright Inspector
- Step through code line by line
- Inspect variables
- Set breakpoints
- Debug complex issues

### Best For
- Fixing bugs
- Understanding code flow
- Advanced debugging
- Troubleshooting

### Example
```bash
$ npm run test:naukri:debug

# Playwright Inspector opens
# You can step through code
# Step over/into/out functions
# Hover to see variable values
```

---

## ⏱️ Way 4: Command Line (Fast)

### Command
```bash
npx playwright test tests/naukri-automation.spec.js
```

### What Happens
- Runs in headless mode (no browser window)
- Fastest execution
- Console shows logs
- Results in test-results folder

### Best For
- CI/CD pipelines
- Batch testing
- Fastest execution
- Automated runs

### Example
```bash
$ npx playwright test tests/naukri-automation.spec.js

# Runs in background
# Terminal shows results:
# 1 passed

# HTML report in playwright-report/
```

---

## 📝 Way 5: Simple Script (Direct Execution)

### Command
```bash
node src/naukri-simple-automation.js
```

### What Happens
- Runs standalone Node.js script
- Opens browser directly
- Simple, straightforward execution
- Great for learning

### Best For
- Learning basic Playwright
- Simple automation
- Understanding the flow
- Quick scripts

### Example
```bash
$ node src/naukri-simple-automation.js

# Output:
# ============================================================
# NAUKRI.COM AUTOMATION SCRIPT
# ============================================================
#
# [1] Launching browser...
# ✓ Browser launched
#
# [2] Navigating to Naukri login page...
# ✓ Login page loaded
#    URL: https://www.naukri.com/nlogin/login
#
# [3] Entering email credentials...
# ✓ Email entered: neerajkr7766@gmail.com
# ... etc
```

---

## 🎯 Quick Decision Guide

| Use Case | Command | Best For |
|----------|---------|----------|
| **Learning** | `npm run test:naukri:ui` | Understanding automation |
| **Seeing it work** | `npm run test:naukri` | Visual verification |
| **Fixing bugs** | `npm run test:naukri:debug` | Debugging |
| **CI/CD Pipelines** | `npx playwright test tests/naukri-automation.spec.js` | Automated runs |
| **Quick Script** | `node src/naukri-simple-automation.js` | Simple execution |

---

## 📊 Expected Results for Each Method

### UI Mode Results
```
Visual Interface:
- Test list showing naukri tests
- Click button to run
- Browser window shows automation
- Console panel shows logs in real-time
- Can step through execution
```

### Headed Mode Results
```
Terminal:
$ npm run test:naukri
[STEP 1] Navigating to Naukri login page...
✓ Login page loaded
[STEP 2] Entering email credentials...
✓ Email entered: neerajkr7766@gmail.com
... (all steps with ✓)
[SUCCESS] Workflow completed!

Browser Window:
- Opens automatically
- Navigates through steps
- Closes automatically after completion
```

### Debug Mode Results
```
Playwright Inspector:
- Opens with code/browser split view
- Step through each line
- Variables panel on right
- Can pause and inspect
- Debugger controls available
```

### CLI Results
```
Terminal:
$ npx playwright test tests/naukri-automation.spec.js
1 passed (5s)

test-results/
├── naukri-resume-uploaded.png (screenshot)
└── ...

playwright-report/
└── index.html (detailed HTML report)
```

### Simple Script Results
```
Terminal:
$ node src/naukri-simple-automation.js
============================================================
NAUKRI.COM AUTOMATION SCRIPT
============================================================

[1] Launching browser...
✓ Browser launched

[2] Navigating to Naukri login page...
✓ Login page loaded
   URL: https://www.naukri.com/nlogin/login

[3] Entering email credentials...
✓ Email entered: neerajkr7766@gmail.com

[4] Entering password...
✓ Password entered

[5] Clicking login button...
✓ Login button clicked
   Waiting for page to load...
✓ Login complete
   Current URL: https://www.naukri.com/

[6] Finding View Profile link...
✓ View Profile link found
✓ Clicked View Profile
   Waiting for profile page...
✓ Profile page loaded
   Current URL: ...

[7] Finding upload resume button...
✓ Upload Resume button found
✓ Clicked Upload Resume button

[8] Uploading resume file...
   File path: C:\Users\neera\Downloads\Neeraj_Kumar_SDET_Resume (2).pdf
✓ File input found
✓ File selected: C:\Users\neera\Downloads\Neeraj_Kumar_SDET_Resume (2).pdf
✓ Submit button found
✓ Upload submitted
   Waiting for upload to complete...
✓ Upload complete

[9] Verifying completion...
✓ Screenshot saved: naukri-automation-result.png
   Final URL: https://www.naukri.com/resumeUpload

============================================================
✓ AUTOMATION COMPLETE!
============================================================

The browser will stay open for 5 more seconds.
Close it manually or it will auto-close.

Browser closed.
```

---

## 🎓 Learning Path by Method

### Beginner
1. Start with: `npm run test:naukri:ui` (visual learning)
2. Read console output to understand each step
3. Watch browser perform actions
4. Move to headed mode when comfortable

### Intermediate
1. Use headed mode: `npm run test:naukri`
2. Understand the full workflow
3. Check console logs for any errors
4. Try customizing credentials/paths

### Advanced
1. Use debug mode: `npm run test:naukri:debug`
2. Step through code line by line
3. Understand Playwright internals
4. Optimize for your use case

---

## 🛠️ Files Reference

| File | Purpose | Run With |
|------|---------|----------|
| `tests/naukri-automation.spec.js` | Main test file (4 tests) | `npm run test:naukri` |
| `src/naukri-simple-automation.js` | Standalone script | `node src/naukri-simple-automation.js` |
| `tests/NAUKRI_GUIDE.md` | Full documentation | Read for reference |
| `NAUKRI_QUICK_START.md` | Quick start guide | Read first |

---

## 🔧 Customization for Each Method

### Customize in Test File
Edit `tests/naukri-automation.spec.js`:
```javascript
const CREDENTIALS = {
  email: 'your-email@gmail.com',      // Change
  password: 'your-password',           // Change
};
const RESUME_PATH = 'path/to/resume.pdf';  // Change
```

### Customize in Script
Edit `src/naukri-simple-automation.js`:
```javascript
const EMAIL = 'your-email@gmail.com';
const PASSWORD = 'your-password';
const RESUME_PATH = 'C:\\path\\to\\resume.pdf';
```

Both changes work the same way!

---

## 💡 Pro Tips

### Tip 1: Start with UI Mode
```bash
npm run test:naukri:ui
```
Best for understanding what's happening.

### Tip 2: Use Headed for Demos
```bash
npm run test:naukri
```
Show someone how automation works.

### Tip 3: Use Debug for Issues
```bash
npm run test:naukri:debug
```
When something's not working.

### Tip 4: CLI for Automation
```bash
npx playwright test tests/naukri-automation.spec.js
```
When running automatically (scripts, CI/CD).

### Tip 5: Simple Script for Learning
```bash
node src/naukri-simple-automation.js
```
When learning basic Playwright.

---

## 📋 Troubleshooting by Method

### UI Mode Issues
- If UI doesn't open: Check Playwright version
- If tests don't show: Verify test file exists
- If execution hangs: Close and restart

### Headed Mode Issues
- If browser doesn't open: Check headless setting
- If too fast to see: Add `page.waitForTimeout(3000)` in script
- If stuck: Check console for errors

### Debug Mode Issues
- If debugger doesn't open: Restart VS Code
- If can't step: Try different breakpoint
- If slow: Normal - debugging is slower

### CLI Issues
- If tests fail: Check credentials
- If timeout: Increase `timeout: 60000` in playwright.config.js
- If no report: Check `playwright-report/` folder

### Script Issues
- If not executable: Try `node src/naukri-simple-automation.js`
- If path errors: Use forward slashes or double backslashes
- If stuck: Close browser manually

---

## 🚀 Next Steps

### Pick Your Method and Start!

**I want to see it work visually:**
```bash
npm run test:naukri:ui
```

**I want to see the actual browser:**
```bash
npm run test:naukri
```

**I need to fix something:**
```bash
npm run test:naukri:debug
```

**I want a simple example:**
```bash
node src/naukri-simple-automation.js
```

---

## 📞 Quick Commands Reference

```bash
# Visual UI (recommended for learning)
npm run test:naukri:ui

# See the browser
npm run test:naukri

# Debug mode
npm run test:naukri:debug

# Command line
npx playwright test tests/naukri-automation.spec.js

# Simple script
node src/naukri-simple-automation.js

# View test report
npm run test:report

# Run all tests
npm test
```

---

## ✅ Success Checklist

When your automation works, you'll see:
- ✅ Login successful
- ✅ Profile page loads
- ✅ Upload button found
- ✅ File uploaded
- ✅ Screenshot saved
- ✅ Console shows ✓ marks
- ✅ No errors

---

**Pick a method above and start testing!** 🎉

The simplest way to get started is:
```bash
npm run test:naukri:ui
```

This opens the visual interface where everything is clear and interactive.
