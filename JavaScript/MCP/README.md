# Agentic AI Testing with Playwright - Comprehensive Framework

This project demonstrates **step-by-step** how to test Agentic AI applications using Playwright for browser automation.

## 🎯 Project Overview

This framework teaches you how to test AI agents that:
- **Observe** web page state and elements
- **Decide** what actions to take based on goals  
- **Act** by clicking, typing, navigating
- **Verify** outcomes and adapt strategies

## 📋 Project Structure

```
├── AGENT_TESTING_GUIDE.md          # Complete tutorial (START HERE!)
├── src/
│   └── agent-test-framework.js     # Agent testing utilities
├── tests/
│   ├── agent-basics.spec.js        # Core patterns (6 patterns explained)
│   ├── agent-advanced.spec.js      # Advanced patterns (7 patterns)
│   └── agent-facebook.spec.js      # Real-world example (if available)
└── playwright.config.js            # Playwright configuration
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Read the Tutorial
Start with the comprehensive guide:
```bash
# Open in your editor
AGENT_TESTING_GUIDE.md
```

### 3. Run Basic Pattern Tests
```bash
# Run all tests with visual output
npx playwright test --ui

# Or run specific test file
npx playwright test tests/agent-basics.spec.js
```

### 4. Run Advanced Pattern Tests
```bash
npx playwright test tests/agent-advanced.spec.js
```

## 📚 Learning Path

### Level 1: Fundamentals (Start Here)
Study these **6 core patterns** in `tests/agent-basics.spec.js`:

1. **PATTERN 1** - Agent Observation
   - How agents perceive page elements
   - Finding buttons, inputs, links

2. **PATTERN 2** - Decision Making  
   - Conditional logic based on observations
   - Choosing between strategies

3. **PATTERN 3** - Action Execution
   - Performing clicks and interactions
   - Waiting for results

4. **PATTERN 4** - Outcome Verification
   - Checking if goals were achieved
   - Assessing action results

5. **PATTERN 5** - State Tracking
   - Capturing initial/final state
   - Detecting changes

6. **PATTERN 6** - Error Handling
   - Gracefully handling failures
   - Recovery strategies

### Level 2: Advanced Patterns (Next)
Study these **7 advanced patterns** in `tests/agent-advanced.spec.js`:

1. Multi-Step Goal Achievement
2. State Machine (FSM) Agents  
3. Adaptive Agent Behavior
4. Goal-Driven Decision Trees
5. Data Extraction Workflows
6. Multi-Agent Collaboration
7. Retry Logic with Backoff

## 🎓 Key Testing Concepts

### The Agent Loop
```
Observe → Decide → Act → Verify → (Repeat or Complete)
```

### Test Structure Template
```javascript
test('agent accomplishes task', async ({ page }) => {
  // 1. SETUP
  await page.goto('https://example.com');
  
  // 2. OBSERVATION - What does agent see?
  const buttons = await page.locator('button').count();
  
  // 3. DECISION - What should agent do?
  if (buttons > 0) {
    // 4. ACTION - Do it
    await page.click('button');
    
    // Wait for result
    await page.waitForLoadState('networkidle');
  }
  
  // 5. VERIFICATION - Did it work?
  expect(page.url()).toContain('success');
});
```

## 🛠️ Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run with UI Mode (Recommended for Learning)
```bash
npx playwright test --ui
```

### Run Specific Test File
```bash
npx playwright test tests/agent-basics.spec.js
```

### Run Specific Test Pattern
```bash
npx playwright test -g "Agent observes page elements"
```

### Debug Mode (Step Through)
```bash
npx playwright test --debug
```

### View Test Reports
```bash
npx playwright show-report
```

## 📊 Test Output Examples

When you run tests, you'll see console logs like:
```
[AGENT] Observed headings: ['Home', 'Products', 'About']
[AGENT] Observed buttons: 5
[AGENT] Observed input fields: 2
[AGENT GOAL] Search for "example"
[AGENT] Decision: Perform search for "example"
[AGENT] Typed search query
[AGENT] Pressed Enter
[AGENT] Results found: 10
```

## 🔍 Key Playwright Methods for Agent Testing

```javascript
// Observation (Agent perceives)
await page.locator('selector').count()           // Count elements
await page.locator('selector').isVisible()       // Check visibility
await page.locator('selector').allTextContents() // Read text
await page.content()                             // Get full page

// Action (Agent acts)
await page.click('selector')                     // Click
await page.fill('input', 'text')                 // Type
await page.press('input', 'Enter')               // Press key
await page.goto('url')                           // Navigate

// Waiting (Agent waits for results)
await page.waitForLoadState('networkidle')       // Wait for network
await page.waitForSelector('selector')           // Wait for element
await page.waitForURL('url')                     // Wait for navigation

// Verification (Agent checks results)
expect(await page.title()).toContain('text')     // Check title
expect(page.url()).toMatch(/pattern/)            // Check URL
```

## 💡 Testing Tips

### 1. Use Descriptive Names
```javascript
// ✅ Good
test('agent navigates to products and filters by price', ...);

// ❌ Bad
test('navigation test', ...);
```

### 2. Add Debug Logging
```javascript
page.on('console', msg => console.log(`[BROWSER] ${msg.text()}`));
```

### 3. Take Screenshots
```javascript
await page.screenshot({ path: 'agent-step-1.png' });
```

### 4. Isolate Each Test
```javascript
test.beforeEach(async ({ page }) => {
  await page.goto('https://example.com');
});
```

### 5. Test Edge Cases
```javascript
test('agent handles empty results', async ({ page }) => {
  // Test what happens when agent gets unexpected data
});
```

## 📖 Next Steps

1. **Read** [AGENT_TESTING_GUIDE.md](AGENT_TESTING_GUIDE.md) - Full tutorial
2. **Study** [tests/agent-basics.spec.js](tests/agent-basics.spec.js) - Basic patterns
3. **Explore** [tests/agent-advanced.spec.js](tests/agent-advanced.spec.js) - Advanced patterns
4. **Create** Your own agent tests using these patterns
5. **Debug** Using UI mode: `npx playwright test --ui`

## 📝 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-page)
- [Best Practices for Test Automation](https://playwright.dev/docs/best-practices)

## ✨ Features

- ✅ 6 core testing patterns explained
- ✅ 7 advanced patterns with examples
- ✅ Facebook login test template
- ✅ Comprehensive testing guide (AGENT_TESTING_GUIDE.md)
- ✅ Real-world examples
- ✅ Error handling strategies
- ✅ State tracking techniques
- ✅ Retry logic with backoff

## 🤝 Support

For questions about testing Agentic AI with Playwright:
1. Check AGENT_TESTING_GUIDE.md
2. Review example test files
3. Run tests in UI mode for debugging
4. Check Playwright documentation
