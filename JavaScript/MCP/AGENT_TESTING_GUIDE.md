# Testing Agentic AI Applications with Playwright - Step by Step Guide

## Table of Contents
1. [Key Concepts](#key-concepts)
2. [Test Structure](#test-structure)
3. [Common Test Scenarios](#common-test-scenarios)
4. [Best Practices](#best-practices)
5. [Debugging Agent Behavior](#debugging-agent-behavior)

---

## Key Concepts

### What is an Agentic AI Application?
An AI agent is autonomous software that:
- **Observes** the environment (web page state, data)
- **Decides** what action to take based on goals
- **Acts** by clicking, typing, navigating
- **Evaluates** results and adapts

### Testing Strategy
When testing AI agents with Playwright, you're testing:
1. **Perception** - Did the agent correctly read the page?
2. **Decision** - Did the agent choose the right action?
3. **Execution** - Did the agent perform the action correctly?
4. **Outcome** - Did the action produce expected results?

---

## Test Structure

### Step 1: Setup Phase
```javascript
test.beforeEach(async ({ page }) => {
  // 1. Navigate to application
  await page.goto('https://example.com/agent-interface');
  
  // 2. Wait for initialization
  await page.waitForLoadState('networkidle');
  
  // 3. Capture initial state for comparison
  const initialState = await page.content();
  return initialState;
});
```

### Step 2: Observation Phase
Agent needs to "see" what's on the page:
```javascript
// Extract visible elements
const buttons = await page.locator('button').count();
const inputFields = await page.locator('input').allTextContents();
```

### Step 3: Decision Phase
Agent decides based on goal and observations:
```javascript
// Simulate agent decision logic
if (goalIsToSearch && searchBoxVisible) {
  await agent.typeInSearchBox('query');
}
```

### Step 4: Action Phase
Agent performs the chosen action:
```javascript
await page.click('.search-button');
await page.waitForLoadState('networkidle');
```

### Step 5: Verification Phase
Verify the action had expected impact:
```javascript
// Check page state changed correctly
const results = await page.locator('.search-results').count();
expect(results).toBeGreaterThan(0);
```

---

## Common Test Scenarios

### Scenario 1: Navigation Task
Agent must navigate from page A to page B
```javascript
test('agent navigates to correct page', async ({ page }) => {
  await page.goto('https://example.com/home');
  
  // Agent observes: sees "Products" link
  const productsLink = page.locator('a:has-text("Products")');
  expect(await productsLink.isVisible()).toBeTruthy();
  
  // Agent decides: click products
  await productsLink.click();
  
  // Verify: agent reached correct page
  await expect(page).toHaveURL(/.*\/products/);
});
```

### Scenario 2: Form Filling Task
Agent must fill and submit a form
```javascript
test('agent fills form correctly', async ({ page }) => {
  await page.goto('https://example.com/contact');
  
  // Agent observes form fields
  const nameField = page.locator('input[name="name"]');
  const emailField = page.locator('input[name="email"]');
  
  // Agent decides to fill form
  await nameField.fill('John Doe');
  await emailField.fill('john@example.com');
  
  // Agent acts: submit
  await page.click('button[type="submit"]');
  
  // Verify: success message appears
  await expect(page.locator('text=Success')).toBeVisible();
});
```

### Scenario 3: Data Extraction Task
Agent must extract information from page
```javascript
test('agent extracts data correctly', async ({ page }) => {
  await page.goto('https://example.com/products');
  
  // Agent observes: product list
  const products = await page.locator('.product-item').count();
  expect(products).toBeGreaterThan(0);
  
  // Agent extracts: product names
  const productNames = await page.locator('.product-name').allTextContents();
  
  // Verify: data is accessible
  expect(productNames.length).toBe(products);
  expect(productNames[0]).toBeTruthy();
});
```

### Scenario 4: Decision Making Task
Agent must make conditional decisions
```javascript
test('agent adapts to different page states', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Agent observes: check if logged in
  const isLoggedIn = await page.locator('.user-menu').isVisible();
  
  if (isLoggedIn) {
    // Agent decides: go to dashboard
    await page.click('.user-menu');
    await page.click('text=Dashboard');
  } else {
    // Agent decides: login first
    await page.click('text=Login');
  }
  
  // Verify: agent took correct path
  expect(page.url()).toContain('dashboard');
});
```

---

## Best Practices

### 1. Use Descriptive Test Names
```javascript
// ✅ Good
test('agent successfully navigates to products page when clicking sidebar link', ...);

// ❌ Bad
test('navigation test', ...);
```

### 2. Isolate Each Test
```javascript
test.beforeEach(async ({ page }) => {
  // Reset state before each test
  await page.goto('https://example.com');
});

test.afterEach(async ({ page }) => {
  // Cleanup if needed
});
```

### 3. Add Explicit Waits for Agent Actions
```javascript
// Wait for agent's expected action to complete
await page.waitForSelector('.results', { timeout: 5000 });

// OR wait for network to be idle
await page.waitForLoadState('networkidle');

// OR wait for specific URL
await page.waitForURL(/.*\/confirmation/);
```

### 4. Use Page Object Model for Complex Agents
```javascript
class AgentPage {
  constructor(page) {
    this.page = page;
  }

  async goToHome() {
    await this.page.goto('https://example.com');
  }

  async performSearch(query) {
    await this.page.fill('input[role="searchbox"]', query);
    await this.page.press('input[role="searchbox"]', 'Enter');
  }

  async getSearchResults() {
    return await this.page.locator('.result-item').allTextContents();
  }
}
```

### 5. Test Edge Cases
```javascript
test('agent handles empty search results', async ({ page }) => {
  await page.goto('https://example.com/search');
  
  // Agent searches for non-existent item
  await page.fill('input', 'xyznonexistent123');
  await page.press('input', 'Enter');
  
  // Verify agent handles empty state
  await expect(page.locator('text=No results found')).toBeVisible();
});

test('agent handles network errors gracefully', async ({ page }) => {
  // Simulate network error
  await page.context().setOffline(true);
  
  // Verify agent shows error message
  await expect(page.locator('text=Connection lost')).toBeVisible();
  
  await page.context().setOffline(false);
});
```

### 6. Add Screenshots and Videos for Debugging
```javascript
// In playwright.config.js
use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'on-first-retry',
}
```

---

## Debugging Agent Behavior

### Method 1: Console Logging
```javascript
test('debug agent decisions', async ({ page }) => {
  page.on('console', msg => console.log(`[BROWSER LOG] ${msg.text()}`));
  
  await page.goto('https://example.com');
  
  // Agent logs its decisions
  await page.evaluate(() => {
    console.log('[AGENT] Observing page state');
    console.log('[AGENT] Goal: Find product');
  });
});
```

### Method 2: Screenshots at Key Points
```javascript
test('capture agent decision points', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Screenshot: Initial state
  await page.screenshot({ path: 'agent-step-1-initial.png' });
  
  // Agent makes decision
  await page.click('.search-button');
  
  // Screenshot: After action
  await page.screenshot({ path: 'agent-step-2-action.png' });
});
```

### Method 3: State Comparison
```javascript
test('verify agent state transitions', async ({ page }) => {
  const initialState = await page.content();
  
  // Agent performs action
  await page.click('.filter-button');
  await page.waitForLoadState('networkidle');
  
  const finalState = await page.content();
  
  // Verify state changed
  expect(initialState).not.toBe(finalState);
  console.log('State changed as expected');
});
```

---

## Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test File
```bash
npx playwright test tests/agent.spec.js
```

### Run with UI Mode (Recommended for Learning)
```bash
npx playwright test --ui
```

### Run Single Test
```bash
npx playwright test -g "agent navigates correctly"
```

### Debug Mode
```bash
npx playwright test --debug
```

---

## Summary

Testing Agentic AI is about verifying the **observe → decide → act → evaluate** loop:

1. **Setup** - Prepare test environment
2. **Observe** - Agent reads page state
3. **Decide** - Agent chooses action based on goal
4. **Act** - Agent performs action
5. **Verify** - Check results match expectations

Use Playwright's powerful selectors, waits, and assertions to build robust tests for your AI agent!
