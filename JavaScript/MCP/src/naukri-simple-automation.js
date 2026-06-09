// src/naukri-simple-automation.js
/**
 * Simple Naukri.com Automation Script
 * 
 * A simplified, easy-to-understand version for learning
 * Run with: node src/naukri-simple-automation.js
 * 
 * NOTE: For testing, use: npm run test:naukri
 */

const { chromium } = require('playwright');

async function automateNaukri() {
  // ====================================
  // CONFIGURATION
  // ====================================
  const EMAIL = 'neerajkr7766@gmail.com';
  const PASSWORD = 'bodhgaya#123';
  const RESUME_PATH = 'C:\\Users\\neera\\Downloads\\Neeraj_Kumar_SDET_Resume (2).pdf';
  
  console.log('='.repeat(60));
  console.log('NAUKRI.COM AUTOMATION SCRIPT');
  console.log('='.repeat(60));
  
  let browser;
  let page;
  
  try {
    // ====================================
    // STEP 1: LAUNCH BROWSER
    // ====================================
    console.log('\n[1] Launching browser...');
    browser = await chromium.launch({ headless: false }); // headless: false to see browser
    page = await browser.newPage();
    console.log('✓ Browser launched');
    
    // ====================================
    // STEP 2: NAVIGATE TO LOGIN PAGE
    // ====================================
    console.log('\n[2] Navigating to Naukri login page...');
    await page.goto('https://www.naukri.com/nlogin/login', { waitUntil: 'networkidle' });
    console.log('✓ Login page loaded');
    console.log('   URL:', page.url());
    
    // ====================================
    // STEP 3: ENTER EMAIL
    // ====================================
    console.log('\n[3] Entering email credentials...');
    // Try multiple selectors to find email field
    let emailField = await page.locator('input[placeholder*="email" i]').first();
    
    if (!await emailField.isVisible().catch(() => false)) {
      // Try alternative selector
      emailField = await page.locator('input[type="text"]').first();
    }
    
    await emailField.fill(EMAIL);
    console.log('✓ Email entered:', EMAIL);
    
    // ====================================
    // STEP 4: ENTER PASSWORD
    // ====================================
    console.log('\n[4] Entering password...');
    const passwordField = page.locator('input[type="password"]');
    await passwordField.fill(PASSWORD);
    console.log('✓ Password entered');
    
    // ====================================
    // STEP 5: CLICK LOGIN BUTTON
    // ====================================
    console.log('\n[5] Clicking login button...');
    const loginButton = page.locator('button[type="submit"], button:has-text("Login")').first();
    await loginButton.click();
    console.log('✓ Login button clicked');
    
    // Wait for login to complete
    console.log('   Waiting for page to load...');
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {
      console.log('   (Network timeout - continuing anyway)');
    });
    await page.waitForTimeout(2000);
    
    console.log('✓ Login complete');
    console.log('   Current URL:', page.url());
    
    // ====================================
    // STEP 6: CLICK VIEW PROFILE
    // ====================================
    console.log('\n[6] Finding View Profile link...');
    const profileLink = page.locator('a:has-text("View Profile"), text=View Profile').first();
    
    const isProfileVisible = await profileLink.isVisible({ timeout: 10000 }).catch(() => false);
    
    if (isProfileVisible) {
      console.log('✓ View Profile link found');
      await profileLink.click();
      console.log('✓ Clicked View Profile');
      
      console.log('   Waiting for profile page...');
      await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
      console.log('✓ Profile page loaded');
    } else {
      console.log('⚠ View Profile link not found immediately');
      console.log('   Continuing anyway...');
    }
    
    console.log('   Current URL:', page.url());
    
    // ====================================
    // STEP 7: FIND UPLOAD RESUME BUTTON
    // ====================================
    console.log('\n[7] Finding upload resume button...');
    const uploadButton = page.locator(
      'button:has-text("Upload Resume"), button:has-text("upload"), text=Upload Resume'
    ).first();
    
    const isUploadVisible = await uploadButton.isVisible({ timeout: 10000 }).catch(() => false);
    
    if (isUploadVisible) {
      console.log('✓ Upload Resume button found');
      await uploadButton.click();
      console.log('✓ Clicked Upload Resume button');
      await page.waitForTimeout(1000);
    } else {
      console.log('⚠ Upload Resume button not found');
      console.log('   Looking for file input directly...');
    }
    
    // ====================================
    // STEP 8: UPLOAD FILE
    // ====================================
    console.log('\n[8] Uploading resume file...');
    console.log('   File path:', RESUME_PATH);
    
    const fileInput = page.locator('input[type="file"]');
    const fileInputCount = await fileInput.count();
    
    if (fileInputCount > 0) {
      console.log('✓ File input found');
      
      // Set the file
      await fileInput.first().setInputFiles(RESUME_PATH);
      console.log('✓ File selected:', RESUME_PATH);
      
      await page.waitForTimeout(1000);
      
      // Look for submit button
      const submitButton = page.locator(
        'button:has-text("Upload"), button:has-text("Submit"), button:has-text("Save")'
      ).first();
      
      const isSubmitVisible = await submitButton.isVisible().catch(() => false);
      
      if (isSubmitVisible) {
        console.log('✓ Submit button found');
        await submitButton.click();
        console.log('✓ Upload submitted');
        
        console.log('   Waiting for upload to complete...');
        await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
        console.log('✓ Upload complete');
      } else {
        console.log('⚠ Submit button not found');
      }
      
    } else {
      console.log('✗ No file input found on page');
    }
    
    // ====================================
    // STEP 9: VERIFY AND SCREENSHOT
    // ====================================
    console.log('\n[9] Verifying completion...');
    
    const screenshot = 'naukri-automation-result.png';
    await page.screenshot({ path: screenshot });
    console.log('✓ Screenshot saved:', screenshot);
    console.log('   Final URL:', page.url());
    
    console.log('\n' + '='.repeat(60));
    console.log('✓ AUTOMATION COMPLETE!');
    console.log('='.repeat(60));
    console.log('\nThe browser will stay open for 5 more seconds.');
    console.log('Close it manually or it will auto-close.');
    
  } catch (error) {
    console.error('\n✗ ERROR:', error.message);
    console.error('   Stack:', error.stack);
  } finally {
    // Keep browser open for 5 seconds to see result
    if (browser) {
      await page.waitForTimeout(5000);
      await browser.close();
      console.log('\nBrowser closed.');
    }
  }
}

// Run the automation
automateNaukri().catch(console.error);
