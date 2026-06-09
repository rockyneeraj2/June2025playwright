# Quick Start Guide - Test Your First Agent

## 5-Minute Quick Start

### Step 1: Install Dependencies (1 min)
```bash
npm install
```

### Step 2: Run Interactive UI (2 min)
```bash
npm run test:ui
```

This opens the Playwright Test UI where you can:
- ▶️ Run individual tests
- 👀 Watch tests execute
- 🔍 Inspect elements
- 📊 See results in real-time

### Step 3: Review Test Output (2 min)
You'll see console logs like:
```
[AGENT] Observed headings: ['Home', 'Products']
[AGENT] Decision: Perform search
[AGENT] Typed search query
[AGENT] Results found: 10
```

---

## Complete Learning Path

### Phase 1: Understanding (15 minutes)
1. Read [AGENT_TESTING_GUIDE.md](AGENT_TESTING_GUIDE.md) - Full concepts
2. Understand the agent loop: **Observe → Decide → Act → Verify**

### Phase 2: Core Patterns (30 minutes)
1. Open [tests/agent-basics.spec.js](tests/agent-basics.spec.js)
2. Run: `npm run test:basics`
3. Study these 6 patterns:
   - Pattern 1: Observation
   - Pattern 2: Decision Making
   - Pattern 3: Action Execution  
   - Pattern 4: Verification
   - Pattern 5: State Tracking
   - Pattern 6: Error Handling

### Phase 3: Advanced Patterns (30 minutes)
1. Open [tests/agent-advanced.spec.js](tests/agent-advanced.spec.js)
2. Run: `npm run test:advanced`
3. Study these 7 advanced patterns:
   - Multi-Step Goal Achievement
   - State Machine Agents
   - Adaptive Behavior
   - Decision Trees
   - Data Extraction
   - Multi-Agent Collaboration
   - Retry Logic

### Phase 4: Practice (varies)
1. Create your own agent test:
```javascript
// Create: tests/my-agent.spec.js

const { test, expect } = require('@playwright/test');

test('my agent test', async ({ page }) => {
  // 1. Setup
  await page.goto('https://example.com');
  
  // 2. Observe
  const buttons = await page.locator('button').count();
  
  // 3. Decide & Act
  if (buttons > 0) {
    await page.click('button');
    await page.waitForLoadState('networkidle');
  }
  
  // 4. Verify
  expect(page.url()).toBeTruthy();
});
```

2. Run it:
```bash
npx playwright test tests/my-agent.spec.js
```

---

## Common Commands

```bash
# Run all tests
npm test

# Run with visual UI (best for learning)
npm run test:ui

# Run basic pattern tests only
npm run test:basics

# Run advanced pattern tests only
npm run test:advanced

# Debug mode (step through with debugger)
npm run test:debug

# View detailed HTML report
npm run test:report

# Run specific test by name
npx playwright test -g "Agent observes"

# Run in headed mode (see browser)
npx playwright test --headed
```

---

## Project Files

| File | Purpose |
|------|---------|
| [AGENT_TESTING_GUIDE.md](AGENT_TESTING_GUIDE.md) | 📚 Complete tutorial and reference |
| [tests/agent-basics.spec.js](tests/agent-basics.spec.js) | 101 Core patterns with explanations |
| [tests/agent-advanced.spec.js](tests/agent-advanced.spec.js) | 201 Advanced patterns |
| [src/agent-test-framework.js](src/agent-test-framework.js) | 🛠️ Reusable utilities |
| [playwright.config.js](playwright.config.js) | ⚙️ Test configuration |

---

## Key Concepts to Remember

### The Agent Loop
```
[OBSERVE] What's on the page?
    ↓
[DECIDE] What should I do?
    ↓
[ACT] Do the action
    ↓
[VERIFY] Did it work?
    ↓
[REPEAT] Until goal achieved
```

### Playwright Selectors

Agent observation uses selectors:
```javascript
// Find by tag
page.locator('button')

// Find by text
page.locator('text=Click me')

// Find by CSS
page.locator('.my-class')

// Find by ID
page.locator('#my-id')

// Find by attribute
page.locator('[name="username"]')

// Combine multiple
page.locator('button:has-text("Search")')
```

### Common Agent Actions

```javascript
// Observe
await page.locator('selector').count()
await page.locator('selector').isVisible()
await page.locator('selector').allTextContents()

// Act
await page.click('selector')
await page.fill('input', 'text')
await page.press('input', 'Enter')
await page.goto('url')

// Wait
await page.waitForLoadState('networkidle')
await page.waitForSelector('selector')

// Verify
expect(page.url()).toContain('success')
expect(await page.title()).toMatch(/pattern/)
```

---

## Troubleshooting

### Q: Tests are running on example.com and failing
**A:** Update the `baseURL` in `playwright.config.js` to your target site

### Q: I want to test on Facebook
**A:** Change `playwright.config.js`:
```javascript
use: {
  baseURL: 'https://www.facebook.com',
  // ... other settings
}
```

### Q: Tests are timing out
**A:** Increase timeout in `playwright.config.js`:
```javascript
timeout: 60000,  // 60 seconds instead of 30
```

### Q: I want to see the browser while tests run
**A:** Run tests in headed mode:
```bash
npx playwright test --headed
```

### Q: How do I debug a failing test?
**A:** Use debug mode:
```bash
npx playwright test --debug
# This launches debugger where you can step through
```

---

## Next Steps

1. ✅ Installed and ran tests
2. ✅ Understood the agent loop
3. ✅ Learned core patterns
4. ⬜ Explore advanced patterns
5. ⬜ Create your own agent tests
6. ⬜ Test on real applications

Start with `npm run test:ui` and explore!

---

## Need Help?

1. **For concepts**: Read [AGENT_TESTING_GUIDE.md](AGENT_TESTING_GUIDE.md)
2. **For examples**: Check [tests/agent-basics.spec.js](tests/agent-basics.spec.js)
3. **For debugging**: Use `npx playwright test --ui`
4. **For Playwright docs**: Visit https://playwright.dev/docs/intro

Happy testing! 🚀
