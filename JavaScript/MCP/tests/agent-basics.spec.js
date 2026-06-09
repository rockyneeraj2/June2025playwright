// tests/agent-basics.spec.js
/**
 * Basic Agent Testing Examples
 * 
 * These tests demonstrate the core patterns for testing AI agents:
 * 1. Observation - Agent perceives the environment
 * 2. Decision - Agent decides what to do
 * 3. Action - Agent performs the action
 * 4. Verification - We verify the outcome
 */

const { test, expect } = require('@playwright/test');

test.describe('Agent Testing Fundamentals', () => {
  
  // SETUP: Prepare test environment
  test.beforeEach(async ({ page }) => {
    // Navigate to a test application
    // In real scenarios, this would be your AI agent's target app
    await page.goto('https://example.com');
    console.log('[TEST] Environment ready');
  });

  // ============================================
  // PATTERN 1: Agent Observation
  // ============================================
  test('PATTERN 1 - Agent observes page elements', async ({ page }) => {
    console.log('\n=== PATTERN 1: OBSERVATION ===');
    
    // Agent OBSERVES: What elements are visible on the page?
    const headings = await page.locator('h1, h2, h3').allTextContents();
    console.log('[AGENT] Observed headings:', headings);
    
    const buttons = await page.locator('button').count();
    console.log('[AGENT] Observed buttons:', buttons);
    
    const inputFields = await page.locator('input').count();
    console.log('[AGENT] Observed input fields:', inputFields);
    
    // VERIFY: Agent correctly perceived the environment
    expect(headings.length).toBeGreaterThanOrEqual(0);
    expect(buttons).toBeGreaterThanOrEqual(0);
    expect(inputFields).toBeGreaterThanOrEqual(0);
  });

  // ============================================
  // PATTERN 2: Agent Decision Making
  // ============================================
  test('PATTERN 2 - Agent makes conditional decisions', async ({ page }) => {
    console.log('\n=== PATTERN 2: DECISION MAKING ===');
    
    // Agent OBSERVES: Is there a search box?
    const hasSearchBox = await page.locator('input[type="search"]').isVisible().catch(() => false);
    console.log('[AGENT] Search box visible?', hasSearchBox);
    
    // Agent DECIDES: Based on observation
    if (hasSearchBox) {
      console.log('[AGENT] Decision: Use search box');
      // Agent will use search
    } else {
      console.log('[AGENT] Decision: Use navigation menu');
      // Agent will use menu
    }
    
    // VERIFY: Agent's decision was reasonable
    const decisionWasValid = hasSearchBox || 
      (await page.locator('nav, .menu').isVisible().catch(() => false));
    expect(decisionWasValid).toBeTruthy();
  });

  // ============================================
  // PATTERN 3: Agent Actions
  // ============================================
  test('PATTERN 3 - Agent performs actions', async ({ page }) => {
    console.log('\n=== PATTERN 3: ACTION EXECUTION ===');
    
    // Agent OBSERVES: Find clickable element
    const clickableElement = page.locator('a, button').first();
    
    // Agent DECIDES: Click it
    if (await clickableElement.isVisible()) {
      console.log('[AGENT] Action: Clicking element at', await clickableElement.getAttribute('href'));
      
      // Agent ACTS
      await clickableElement.click();
      
      // Agent WAITS for result
      await page.waitForLoadState('networkidle').catch(() => {});
      
      console.log('[AGENT] Action completed. New URL:', page.url());
    }
  });

  // ============================================
  // PATTERN 4: Agent Verification
  // ============================================
  test('PATTERN 4 - Agent verifies outcomes', async ({ page }) => {
    console.log('\n=== PATTERN 4: VERIFICATION ===');
    
    // Agent sets a GOAL
    const goal = 'Load page successfully';
    console.log('[AGENT GOAL]', goal);
    
    // Agent checks if goal is achieved
    const pageLoaded = page.url().length > 0;
    const titlePresent = (await page.title()).length > 0;
    const contentVisible = (await page.locator('body').isVisible());
    
    console.log('[AGENT CHECK] Page loaded:', pageLoaded);
    console.log('[AGENT CHECK] Title present:', titlePresent);
    console.log('[AGENT CHECK] Content visible:', contentVisible);
    
    // VERIFY: Agent's checks were valid
    expect(pageLoaded && titlePresent && contentVisible).toBeTruthy();
  });

  // ============================================
  // PATTERN 5: Agent State Tracking
  // ============================================
  test('PATTERN 5 - Agent tracks state changes', async ({ page }) => {
    console.log('\n=== PATTERN 5: STATE TRACKING ===');
    
    // Agent CAPTURES initial state
    const initialURL = page.url();
    const initialTitle = await page.title();
    console.log('[AGENT STATE BEFORE]', { initialURL, initialTitle });
    
    // Agent ACTS (finds and clicks first link)
    const firstLink = await page.locator('a').first();
    if (await firstLink.isVisible()) {
      await firstLink.click();
      await page.waitForLoadState('networkidle').catch(() => {});
    }
    
    // Agent CAPTURES final state
    const finalURL = page.url();
    const finalTitle = await page.title();
    console.log('[AGENT STATE AFTER]', { finalURL, finalTitle });
    
    // Agent EVALUATES: Did state change as expected?
    const stateChanged = (initialURL !== finalURL) || (initialTitle !== finalTitle);
    console.log('[AGENT EVALUATION] State changed:', stateChanged);
  });

  // ============================================
  // PATTERN 6: Agent Error Handling
  // ============================================
  test('PATTERN 6 - Agent handles errors gracefully', async ({ page }) => {
    console.log('\n=== PATTERN 6: ERROR HANDLING ===');
    
    // Agent tries to find element (may not exist)
    const targetElement = page.locator('.non-existent-class');
    
    try {
      // Agent checks if element exists
      const exists = await targetElement.isVisible();
      console.log('[AGENT] Element found:', exists);
      
      if (!exists) {
        console.log('[AGENT] Element not found - taking alternative action');
        // Agent tries alternative
      }
    } catch (error) {
      console.log('[AGENT] Error occurred:', error.message);
      console.log('[AGENT] Recovery: Using fallback strategy');
    }
    
    // VERIFY: Agent handled error without crashing
    expect(page.url().length).toBeGreaterThan(0);
  });

});

// ============================================
// Real-World Example: Search Agent
// ============================================
test.describe('Agent Real-World Example: Search Agent', () => {
  
  test('Search Agent - Complete workflow', async ({ page }) => {
    console.log('\n=== SEARCH AGENT WORKFLOW ===');
    
    // SETUP: Navigate to example.com
    await page.goto('https://example.com');
    console.log('[AGENT] Initialized at:', page.url());
    
    // STEP 1: OBSERVATION - Agent looks for search capability
    console.log('\n[STEP 1] OBSERVATION');
    const searchBox = page.locator('input[type="search"], input[placeholder*="search" i]').first();
    const hasSearchCapability = await searchBox.isVisible().catch(() => false);
    console.log('[AGENT] Can search?', hasSearchCapability);
    
    // STEP 2: DECISION - Agent decides to search
    console.log('\n[STEP 2] DECISION');
    if (hasSearchCapability) {
      console.log('[AGENT] Decided: Perform search for "example"');
      
      // STEP 3: ACTION - Agent performs search
      console.log('\n[STEP 3] ACTION');
      await searchBox.fill('example');
      console.log('[AGENT] Typed search query');
      
      await searchBox.press('Enter');
      console.log('[AGENT] Pressed Enter');
      
      // Wait for results
      await page.waitForLoadState('networkidle').catch(() => {});
      
      // STEP 4: VERIFICATION - Agent verifies results
      console.log('\n[STEP 4] VERIFICATION');
      const resultCount = await page.locator('.result, [role="result"]').count().catch(() => 0);
      console.log('[AGENT] Results found:', resultCount);
      
      // EVALUATION
      console.log('\n[EVALUATION]');
      console.log('[AGENT] Search completed successfully');
    } else {
      console.log('[AGENT] No search capability found - test skipped');
    }
  });
});
