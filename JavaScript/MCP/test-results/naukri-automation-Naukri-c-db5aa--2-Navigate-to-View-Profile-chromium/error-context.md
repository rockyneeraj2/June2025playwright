# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: naukri-automation.spec.js >> Naukri.com Resume Upload Workflow >> Step 2: Navigate to View Profile
- Location: tests\naukri-automation.spec.js:245:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[type="text"]').first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - heading "Access Denied" [level=1] [ref=e2]
  - text: You don't have permission to access "http://www.naukri.com/nlogin/login" on this server.
  - paragraph [ref=e3]: "Reference #18.4882c31.1777741033.5dac8cb6"
  - paragraph [ref=e4]: https://errors.edgesuite.net/18.4882c31.1777741033.5dac8cb6
```

# Test source

```ts
  153 |         console.log('[AGENT] Found file input directly');
  154 |       }
  155 |     }
  156 |     
  157 |     // Wait for dialog or upload area to appear
  158 |     await page.waitForTimeout(1000);
  159 |     
  160 |     // STEP 7: UPLOAD RESUME FILE
  161 |     console.log('\n[STEP 7] Uploading resume file');
  162 |     console.log('[INFO] Resume path:', RESUME_PATH);
  163 |     
  164 |     // Find and interact with file input
  165 |     const fileInputs = await page.locator('input[type="file"]').count();
  166 |     console.log('[INFO] Found', fileInputs, 'file input(s)');
  167 |     
  168 |     if (fileInputs > 0) {
  169 |       const fileInput = page.locator('input[type="file"]').first();
  170 |       
  171 |       // Set the file
  172 |       console.log('[AGENT] Setting file path...');
  173 |       await fileInput.setInputFiles(RESUME_PATH);
  174 |       console.log('[AGENT] ✓ File set:', RESUME_PATH);
  175 |       
  176 |       // Wait for file to be processed
  177 |       await page.waitForTimeout(2000);
  178 |       
  179 |       // Look for upload/submit button after file selection
  180 |       const submitButton = page.locator(
  181 |         'button:has-text("Upload"), ' +
  182 |         'button:has-text("Submit"), ' +
  183 |         'button:has-text("Save"), ' +
  184 |         'button:has-text("Confirm")'
  185 |       ).first();
  186 |       
  187 |       if (await submitButton.isVisible().catch(() => false)) {
  188 |         console.log('[AGENT] Found submit button - clicking');
  189 |         await submitButton.click();
  190 |         console.log('[AGENT] ✓ Resume upload submitted');
  191 |       }
  192 |       
  193 |       // Wait for upload to complete
  194 |       await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
  195 |       console.log('[AGENT] ✓ Upload complete');
  196 |       
  197 |     } else {
  198 |       console.log('[ERROR] No file input found on page');
  199 |       console.log('[INFO] Page content:');
  200 |       console.log(await page.content());
  201 |     }
  202 |     
  203 |     // STEP 8: VERIFY SUCCESS
  204 |     console.log('\n[STEP 8] Verifying upload success');
  205 |     
  206 |     // Take a screenshot of final state
  207 |     await page.screenshot({ path: 'naukri-resume-uploaded.png' });
  208 |     console.log('[INFO] Screenshot saved: naukri-resume-uploaded.png');
  209 |     
  210 |     console.log('[VERIFICATION] Final URL:', page.url());
  211 |     console.log('[SUCCESS] Workflow completed!');
  212 |   });
  213 | 
  214 |   // ============================================
  215 |   // SEPARATE TESTS FOR EACH STEP (For debugging)
  216 |   // ============================================
  217 |   
  218 |   test('Step 1: Login to Naukri', async ({ page }) => {
  219 |     console.log('\n[TEST] Step 1 - Login');
  220 |     
  221 |     await page.goto('https://www.naukri.com/nlogin/login');
  222 |     console.log('[INFO] Current URL:', page.url());
  223 |     
  224 |     // Find and fill email
  225 |     const emailInput = page.locator('input[type="text"]').first();
  226 |     await emailInput.fill(CREDENTIALS.email);
  227 |     console.log('[✓] Email entered');
  228 |     
  229 |     // Find and fill password
  230 |     const passwordInput = page.locator('input[type="password"]');
  231 |     await passwordInput.fill(CREDENTIALS.password);
  232 |     console.log('[✓] Password entered');
  233 |     
  234 |     // Click login
  235 |     const loginBtn = page.locator('button[type="submit"]').first();
  236 |     await loginBtn.click();
  237 |     console.log('[✓] Login button clicked');
  238 |     
  239 |     // Wait for navigation
  240 |     await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
  241 |     
  242 |     console.log('[INFO] After login URL:', page.url());
  243 |   });
  244 | 
  245 |   test('Step 2: Navigate to View Profile', async ({ page }) => {
  246 |     console.log('\n[TEST] Step 2 - View Profile');
  247 |     
  248 |     // Assuming already logged in
  249 |     await page.goto('https://www.naukri.com/nlogin/login');
  250 |     
  251 |     // Perform login first
  252 |     const emailInput = page.locator('input[type="text"]').first();
> 253 |     await emailInput.fill(CREDENTIALS.email);
      |                      ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  254 |     
  255 |     const passwordInput = page.locator('input[type="password"]');
  256 |     await passwordInput.fill(CREDENTIALS.password);
  257 |     
  258 |     const loginBtn = page.locator('button[type="submit"]').first();
  259 |     await loginBtn.click();
  260 |     
  261 |     await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
  262 |     
  263 |     // Look for View Profile
  264 |     const profileLink = page.locator('text=View Profile, a:has-text("View Profile")').first();
  265 |     
  266 |     if (await profileLink.isVisible({ timeout: 10000 }).catch(() => false)) {
  267 |       await profileLink.click();
  268 |       console.log('[✓] View Profile clicked');
  269 |       await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
  270 |     } else {
  271 |       console.log('[⚠] View Profile link not found');
  272 |     }
  273 |     
  274 |     console.log('[INFO] Current URL:', page.url());
  275 |   });
  276 | 
  277 |   test('Step 3: Upload Resume', async ({ page }) => {
  278 |     console.log('\n[TEST] Step 3 - Upload Resume');
  279 |     
  280 |     // This would run after being on the profile page
  281 |     // For demonstration, we'll show the upload logic
  282 |     
  283 |     const fileInput = page.locator('input[type="file"]');
  284 |     
  285 |     if (await fileInput.isVisible().catch(() => false)) {
  286 |       await fileInput.setInputFiles(RESUME_PATH);
  287 |       console.log('[✓] File selected:', RESUME_PATH);
  288 |       
  289 |       // Find and click upload button
  290 |       const uploadBtn = page.locator('button:has-text("Upload")').first();
  291 |       if (await uploadBtn.isVisible().catch(() => false)) {
  292 |         await uploadBtn.click();
  293 |         console.log('[✓] Upload button clicked');
  294 |         
  295 |         await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
  296 |         console.log('[✓] Upload complete');
  297 |       }
  298 |     } else {
  299 |       console.log('[⚠] File input not found');
  300 |     }
  301 |   });
  302 | 
  303 | });
  304 | 
```