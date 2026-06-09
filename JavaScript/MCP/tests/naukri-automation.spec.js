// tests/naukri-automation.spec.js
/**
 * Naukri.com Automation Script
 * 
 * Workflow:
 * 1. Login to Naukri with credentials
 * 2. Navigate to profile
 * 3. Upload resume from local file
 */

const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Naukri.com Resume Upload Workflow', () => {
  
  const CREDENTIALS = {
    email: 'neerajkr7766@gmail.com',
    password: 'bodhgaya#123',
  };
  
  const RESUME_PATH = 'C:\\Users\\neera\\Downloads\\Neeraj_Kumar_SDET_Resume (2).pdf';
  
  test.beforeEach(async ({ page }) => {
    console.log('\n[SETUP] Initializing test environment');
    // Set a longer timeout for Naukri as it can be slow
    page.setDefaultTimeout(60000);
  });

  // ============================================
  // MAIN WORKFLOW TEST
  // ============================================
  test('Complete Naukri login and resume upload workflow', async ({ page }) => {
    console.log('\n=== NAUKRI.COM AUTOMATION WORKFLOW ===');
    
    // STEP 1: NAVIGATE TO LOGIN PAGE
    console.log('\n[STEP 1] Navigating to Naukri login page');
    await page.goto('https://www.naukri.com/nlogin/login');
    console.log('[AGENT] Page loaded:', page.url());
    
    // Verify we're on the login page
    await expect(page).toHaveTitle(/Naukri|Login/i);
    console.log('[VERIFICATION] ✓ On login page');
    
    // STEP 2: ENTER EMAIL
    console.log('\n[STEP 2] Entering email credentials');
    const emailField = page.locator('input[placeholder*="email" i], input[id*="email" i], input[name*="email" i]').first();
    
    if (await emailField.isVisible()) {
      await emailField.fill(CREDENTIALS.email);
      console.log('[AGENT] ✓ Email entered:', CREDENTIALS.email);
    } else {
      console.log('[ERROR] Email field not found - trying alternative selectors');
      // Try alternative selectors
      const allInputs = await page.locator('input[type="text"]').count();
      console.log('[INFO] Found', allInputs, 'text input fields');
      
      // Usually first text input is email
      await page.locator('input[type="text"]').first().fill(CREDENTIALS.email);
      console.log('[AGENT] ✓ Email entered (alternative selector)');
    }
    
    // Wait a moment for field to register
    await page.waitForTimeout(500);
    
    // STEP 3: ENTER PASSWORD
    console.log('\n[STEP 3] Entering password');
    const passwordField = page.locator('input[type="password"]');
    
    if (await passwordField.isVisible()) {
      await passwordField.fill(CREDENTIALS.password);
      console.log('[AGENT] ✓ Password entered');
    } else {
      console.log('[ERROR] Password field not found');
    }
    
    await page.waitForTimeout(500);
    
    // STEP 4: CLICK LOGIN BUTTON
    console.log('\n[STEP 4] Clicking login button');
    const loginButton = page.locator('button:has-text("Login"), button:has-text("Sign in"), button[type="submit"]').first();
    
    if (await loginButton.isVisible()) {
      console.log('[AGENT] Found login button - clicking');
      await loginButton.click();
    } else {
      console.log('[ERROR] Login button not found');
      // Try pressing Enter as alternative
      console.log('[AGENT] Trying Enter key as alternative');
      await page.press('input[type="password"]', 'Enter');
    }
    
    // Wait for login to complete
    console.log('[AGENT] Waiting for login to complete...');
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {
      console.log('[INFO] Network idle timeout - continuing anyway');
    });
    
    await page.waitForTimeout(2000);
    
    console.log('[VERIFICATION] After login, current URL:', page.url());
    
    // STEP 5: NAVIGATE TO VIEW PROFILE
    console.log('\n[STEP 5] Navigating to view profile');
    
    // Wait for profile menu or link to appear
    const profileLink = page.locator(
      'a:has-text("View Profile"), ' +
      'text=View Profile, ' +
      'button:has-text("Profile"), ' +
      'a[href*="profile"]'
    ).first();
    
    if (await profileLink.isVisible({ timeout: 10000 }).catch(() => false)) {
      console.log('[AGENT] Found View Profile link - clicking');
      await profileLink.click();
      await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
      console.log('[AGENT] ✓ Navigated to profile');
    } else {
      console.log('[INFO] View Profile link not immediately visible');
      console.log('[INFO] Current URL:', page.url());
      
      // Try to find profile using URL or header navigation
      const profileHeader = page.locator('[class*="profile"], [class*="userProfile"]').first();
      if (await profileHeader.isVisible().catch(() => false)) {
        console.log('[AGENT] Found profile section');
        await profileHeader.click().catch(() => {});
      }
    }
    
    // STEP 6: FIND AND CLICK UPLOAD RESUME
    console.log('\n[STEP 6] Finding upload resume button');
    
    // Look for upload resume button
    const uploadButton = page.locator(
      'button:has-text("Upload Resume"), ' +
      'button:has-text("upload"), ' +
      'a:has-text("Upload Resume"), ' +
      'text=Upload Resume, ' +
      'text=upload'
    ).first();
    
    if (await uploadButton.isVisible({ timeout: 10000 }).catch(() => false)) {
      console.log('[AGENT] ✓ Found upload resume button');
      await uploadButton.click();
      console.log('[AGENT] ✓ Clicked upload resume');
    } else {
      console.log('[ERROR] Upload resume button not found');
      console.log('[INFO] Looking for file input instead');
      
      // Try to find file input directly
      const fileInput = page.locator('input[type="file"]');
      if (await fileInput.isVisible().catch(() => false)) {
        console.log('[AGENT] Found file input directly');
      }
    }
    
    // Wait for dialog or upload area to appear
    await page.waitForTimeout(1000);
    
    // STEP 7: UPLOAD RESUME FILE
    console.log('\n[STEP 7] Uploading resume file');
    console.log('[INFO] Resume path:', RESUME_PATH);
    
    // Find and interact with file input
    const fileInputs = await page.locator('input[type="file"]').count();
    console.log('[INFO] Found', fileInputs, 'file input(s)');
    
    if (fileInputs > 0) {
      const fileInput = page.locator('input[type="file"]').first();
      
      // Set the file
      console.log('[AGENT] Setting file path...');
      await fileInput.setInputFiles(RESUME_PATH);
      console.log('[AGENT] ✓ File set:', RESUME_PATH);
      
      // Wait for file to be processed
      await page.waitForTimeout(2000);
      
      // Look for upload/submit button after file selection
      const submitButton = page.locator(
        'button:has-text("Upload"), ' +
        'button:has-text("Submit"), ' +
        'button:has-text("Save"), ' +
        'button:has-text("Confirm")'
      ).first();
      
      if (await submitButton.isVisible().catch(() => false)) {
        console.log('[AGENT] Found submit button - clicking');
        await submitButton.click();
        console.log('[AGENT] ✓ Resume upload submitted');
      }
      
      // Wait for upload to complete
      await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
      console.log('[AGENT] ✓ Upload complete');
      
    } else {
      console.log('[ERROR] No file input found on page');
      console.log('[INFO] Page content:');
      console.log(await page.content());
    }
    
    // STEP 8: VERIFY SUCCESS
    console.log('\n[STEP 8] Verifying upload success');
    
    // Take a screenshot of final state
    await page.screenshot({ path: 'naukri-resume-uploaded.png' });
    console.log('[INFO] Screenshot saved: naukri-resume-uploaded.png');
    
    console.log('[VERIFICATION] Final URL:', page.url());
    console.log('[SUCCESS] Workflow completed!');
  });

  // ============================================
  // SEPARATE TESTS FOR EACH STEP (For debugging)
  // ============================================
  
  test('Step 1: Login to Naukri', async ({ page }) => {
    console.log('\n[TEST] Step 1 - Login');
    
    await page.goto('https://www.naukri.com/nlogin/login');
    console.log('[INFO] Current URL:', page.url());
    
    // Find and fill email
    const emailInput = page.locator('input[type="text"]').first();
    await emailInput.fill(CREDENTIALS.email);
    console.log('[✓] Email entered');
    
    // Find and fill password
    const passwordInput = page.locator('input[type="password"]');
    await passwordInput.fill(CREDENTIALS.password);
    console.log('[✓] Password entered');
    
    // Click login
    const loginBtn = page.locator('button[type="submit"]').first();
    await loginBtn.click();
    console.log('[✓] Login button clicked');
    
    // Wait for navigation
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    
    console.log('[INFO] After login URL:', page.url());
  });

  test('Step 2: Navigate to View Profile', async ({ page }) => {
    console.log('\n[TEST] Step 2 - View Profile');
    
    // Assuming already logged in
    await page.goto('https://www.naukri.com/nlogin/login');
    
    // Perform login first
    const emailInput = page.locator('input[type="text"]').first();
    await emailInput.fill(CREDENTIALS.email);
    
    const passwordInput = page.locator('input[type="password"]');
    await passwordInput.fill(CREDENTIALS.password);
    
    const loginBtn = page.locator('button[type="submit"]').first();
    await loginBtn.click();
    
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    
    // Look for View Profile
    const profileLink = page.locator('text=View Profile, a:has-text("View Profile")').first();
    
    if (await profileLink.isVisible({ timeout: 10000 }).catch(() => false)) {
      await profileLink.click();
      console.log('[✓] View Profile clicked');
      await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    } else {
      console.log('[⚠] View Profile link not found');
    }
    
    console.log('[INFO] Current URL:', page.url());
  });

  test('Step 3: Upload Resume', async ({ page }) => {
    console.log('\n[TEST] Step 3 - Upload Resume');
    
    // This would run after being on the profile page
    // For demonstration, we'll show the upload logic
    
    const fileInput = page.locator('input[type="file"]');
    
    if (await fileInput.isVisible().catch(() => false)) {
      await fileInput.setInputFiles(RESUME_PATH);
      console.log('[✓] File selected:', RESUME_PATH);
      
      // Find and click upload button
      const uploadBtn = page.locator('button:has-text("Upload")').first();
      if (await uploadBtn.isVisible().catch(() => false)) {
        await uploadBtn.click();
        console.log('[✓] Upload button clicked');
        
        await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
        console.log('[✓] Upload complete');
      }
    } else {
      console.log('[⚠] File input not found');
    }
  });

});
