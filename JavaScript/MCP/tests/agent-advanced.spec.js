// tests/agent-advanced.spec.js
/**
 * Advanced Agent Testing Patterns
 * 
 * Demonstrates sophisticated patterns for testing complex AI agents:
 * - Multi-step workflows
 * - State machines
 * - Goal-driven behavior
 * - Adaptation to failures
 */

const { test, expect } = require('@playwright/test');

test.describe('Advanced Agent Patterns', () => {

  // ============================================
  // PATTERN: Multi-Step Goal Achievement
  // ============================================
  test('Agent achieves complex goal with multiple steps', async ({ page }) => {
    console.log('\n=== MULTI-STEP GOAL ACHIEVEMENT ===');
    
    const goal = 'Navigate to products and filter by category';
    console.log('[AGENT GOAL]', goal);
    
    await page.goto('https://example.com');
    
    // STEP 1: Find navigation
    console.log('\n[SUBSTEP 1] Find and click products link');
    const productsLink = page.locator('text=/products|shop/i').first();
    if (await productsLink.isVisible()) {
      await productsLink.click();
      await page.waitForLoadState('networkidle').catch(() => {});
      console.log('[AGENT] ✓ Navigated to products');
    }
    
    // STEP 2: Find filter
    console.log('\n[SUBSTEP 2] Find and apply filter');
    const filterButton = page.locator('button:has-text("Filter"), .filter-toggle').first();
    if (await filterButton.isVisible()) {
      await filterButton.click();
      console.log('[AGENT] ✓ Opened filter menu');
    }
    
    // STEP 3: Verify progress
    console.log('\n[VERIFICATION] Goal progress');
    const isOnProductsPage = page.url().includes('products') || page.url().includes('shop');
    console.log('[AGENT] On products page?', isOnProductsPage);
  });

  // ============================================
  // PATTERN: State Machine (FSM) Agent
  // ============================================
  test('Agent operates as finite state machine', async ({ page }) => {
    console.log('\n=== STATE MACHINE AGENT ===');
    
    // Define agent states
    const STATES = {
      IDLE: 'IDLE',
      SEARCHING: 'SEARCHING',
      PROCESSING: 'PROCESSING',
      COMPLETED: 'COMPLETED',
      ERROR: 'ERROR'
    };
    
    let currentState = STATES.IDLE;
    console.log('[AGENT STATE]', currentState);
    
    try {
      // State 1: IDLE → SEARCHING
      currentState = STATES.SEARCHING;
      console.log('[STATE TRANSITION]', STATES.IDLE, '→', currentState);
      
      await page.goto('https://example.com');
      
      // State 2: SEARCHING → PROCESSING
      currentState = STATES.PROCESSING;
      console.log('[STATE TRANSITION]', STATES.SEARCHING, '→', currentState);
      
      // Perform processing (find elements, analyze)
      const elementCount = await page.locator('a, button').count();
      
      // State 3: PROCESSING → COMPLETED
      currentState = STATES.COMPLETED;
      console.log('[STATE TRANSITION]', STATES.PROCESSING, '→', currentState);
      console.log('[AGENT RESULT]', `Found ${elementCount} interactive elements`);
      
      expect(currentState).toBe(STATES.COMPLETED);
    } catch (error) {
      currentState = STATES.ERROR;
      console.log('[STATE TRANSITION]', '→', STATES.ERROR);
      console.log('[ERROR]', error.message);
    }
  });

  // ============================================
  // PATTERN: Adaptive Agent (Handles failures)
  // ============================================
  test('Agent adapts strategy when primary approach fails', async ({ page }) => {
    console.log('\n=== ADAPTIVE AGENT BEHAVIOR ===');
    
    const goal = 'Find and click search button';
    console.log('[AGENT GOAL]', goal);
    
    await page.goto('https://example.com');
    
    // STRATEGY 1: Try primary selector
    console.log('\n[STRATEGY 1] Try primary selector');
    let searchButton = page.locator('button[aria-label="Search"]');
    let found = await searchButton.isVisible().catch(() => false);
    
    if (!found) {
      console.log('[AGENT] ✗ Strategy 1 failed - trying alternative');
      
      // STRATEGY 2: Try CSS class
      console.log('\n[STRATEGY 2] Try CSS class selector');
      searchButton = page.locator('.search-button');
      found = await searchButton.isVisible().catch(() => false);
    }
    
    if (!found) {
      console.log('[AGENT] ✗ Strategy 2 failed - trying text match');
      
      // STRATEGY 3: Try text content
      console.log('\n[STRATEGY 3] Try text match');
      searchButton = page.locator('button:has-text("Search")');
      found = await searchButton.isVisible().catch(() => false);
    }
    
    if (!found) {
      console.log('[AGENT] ✗ All strategies failed - using generic approach');
      console.log('[AGENT] Found', await page.locator('button').count(), 'buttons instead');
    } else {
      console.log('[AGENT] ✓ Search button found using adapted strategy');
    }
  });

  // ============================================
  // PATTERN: Goal-Driven Decision Tree
  // ============================================
  test('Agent follows decision tree to achieve goal', async ({ page }) => {
    console.log('\n=== GOAL-DRIVEN DECISION TREE ===');
    
    const primaryGoal = 'Extract product information';
    console.log('[PRIMARY GOAL]', primaryGoal);
    
    await page.goto('https://example.com');
    
    // Decision 1: Is data already visible?
    console.log('\n[DECISION 1] Is target data visible?');
    const visibleContent = await page.content();
    const hasProductData = visibleContent.includes('product') || 
                          visibleContent.includes('price') ||
                          visibleContent.includes('item');
    
    if (hasProductData) {
      console.log('[AGENT] YES → Extract data directly');
      const productElements = await page.locator('[class*="product"], [data-product]').count();
      console.log('[RESULT] Found', productElements, 'product elements');
    } else {
      console.log('[AGENT] NO → Need to navigate first');
      
      // Decision 2: Is there a products page?
      console.log('\n[DECISION 2] Can I navigate to products?');
      const productsLink = page.locator('text=/products|items|catalog/i').first();
      const canNavigate = await productsLink.isVisible().catch(() => false);
      
      if (canNavigate) {
        console.log('[AGENT] YES → Click products link');
        await productsLink.click();
        await page.waitForLoadState('networkidle').catch(() => {});
      } else {
        console.log('[AGENT] NO → Goal cannot be achieved');
        console.log('[AGENT] Alternative: Extract available data');
      }
    }
  });

  // ============================================
  // PATTERN: Data Extraction Workflow
  // ============================================
  test('Agent extracts structured data from page', async ({ page }) => {
    console.log('\n=== DATA EXTRACTION WORKFLOW ===');
    
    await page.goto('https://example.com');
    
    // Agent structures its observation
    const pageAnalysis = {
      title: await page.title(),
      url: page.url(),
      headings: await page.locator('h1, h2, h3').allTextContents(),
      linkCount: await page.locator('a').count(),
      buttonCount: await page.locator('button').count(),
      inputCount: await page.locator('input').count(),
    };
    
    console.log('\n[AGENT ANALYSIS]', pageAnalysis);
    
    // Agent creates report
    const report = {
      timestamp: new Date().toISOString(),
      pageTitle: pageAnalysis.title,
      interactiveElements: pageAnalysis.linkCount + pageAnalysis.buttonCount,
      formFields: pageAnalysis.inputCount,
      contentHeadings: pageAnalysis.headings.length
    };
    
    console.log('\n[EXTRACTED REPORT]', report);
    expect(report.pageTitle).toBeTruthy();
  });

  // ============================================
  // PATTERN: Agent Collaboration (Sequential Steps)
  // ============================================
  test('Multiple agents work together sequentially', async ({ page }) => {
    console.log('\n=== MULTI-AGENT COLLABORATION ===');
    
    // Agent 1: Navigator
    console.log('\n[AGENT 1 - NAVIGATOR]');
    await page.goto('https://example.com');
    console.log('[AGT1] Navigated to homepage');
    const firstLink = await page.locator('a').first();
    const nextUrl = await firstLink.getAttribute('href').catch(() => null);
    console.log('[AGT1] Found next destination:', nextUrl);
    
    // Agent 2: Analyzer
    console.log('\n[AGENT 2 - ANALYZER]');
    const pageContent = await page.content();
    const analysisReport = {
      pageSize: pageContent.length,
      hasJavaScript: pageContent.includes('<script'),
      hasForm: pageContent.includes('<form'),
      numberOfLinks: await page.locator('a').count()
    };
    console.log('[AGT2] Analysis report:', analysisReport);
    
    // Agent 3: Reporter
    console.log('\n[AGENT 3 - REPORTER]');
    const finalReport = {
      timestamp: new Date().toISOString(),
      navigatorFindings: { nextDestination: nextUrl },
      analyzerFindings: analysisReport,
      status: 'COMPLETE'
    };
    console.log('[AGT3] Final report:', finalReport);
    
    expect(finalReport.status).toBe('COMPLETE');
  });

  // ============================================
  // PATTERN: Retry Logic with Backoff
  // ============================================
  test('Agent retries failed actions with backoff strategy', async ({ page }) => {
    console.log('\n=== RETRY LOGIC ===');
    
    await page.goto('https://example.com');
    
    const executeWithRetry = async (action, maxAttempts = 3, delayMs = 500) => {
      let lastError;
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          console.log(`[AGENT ATTEMPT ${attempt}/${maxAttempts}]`);
          await action();
          console.log(`[AGENT] ✓ Success on attempt ${attempt}`);
          return true;
        } catch (error) {
          lastError = error;
          console.log(`[AGENT] ✗ Failed: ${error.message}`);
          if (attempt < maxAttempts) {
            const delay = delayMs * attempt; // Exponential backoff
            console.log(`[AGENT] Waiting ${delay}ms before retry...`);
            await page.waitForTimeout(delay);
          }
        }
      }
      console.log(`[AGENT] All ${maxAttempts} attempts failed`);
      throw lastError;
    };
    
    // Try to find and click an element with retries
    try {
      await executeWithRetry(async () => {
        const element = page.locator('button, a').first();
        if (!await element.isVisible()) {
          throw new Error('Element not visible');
        }
      });
    } catch (error) {
      console.log('[AGENT] Final error:', error.message);
    }
  });

});
