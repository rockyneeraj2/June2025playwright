// playwright.config.js
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 5000 },
  retries: 1,
  workers: 1,
  
  // Output configuration
  outputDir: 'test-results',
  
  use: {
    headless: true,
    baseURL: 'https://www.example.com',
    viewport: { width: 1280, height: 800 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  
  // Web server support (if needed for local testing)
  // webServer: {
  //   command: 'npm run dev',
  //   port: 3000,
  //   reuseExistingServer: !process.env.CI,
  // },
  
  // Reporter configuration
  reporter: [
    ['html'],
    ['list'], // Console output
  ],
  
  // Browser configuration
  projects: [
    {
      name: 'chromium',
      use: { channel: 'chrome' },
    },
    // Uncomment if Firefox becomes available
    // {
    //   name: 'firefox',
    //   use: { channel: 'firefox' },
    // },
  ],
};

module.exports = config;
