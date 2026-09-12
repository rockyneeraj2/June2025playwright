 import { Page, Locator, expect } from '@playwright/test';

 /*

 "In my Playwright automation framework, I use Page Object Model to separate page-specific locators and 
 actions from the test cases.

Each application page has a corresponding Page Object class. For example, LoginPage.ts contains login-related
 locators and methods such as enterUsername(), enterPassword() and clickLogin().

The test class doesn't directly interact with locators. It calls reusable methods from the Page Object.

This provides better maintainability, reusability, readability and reduces duplicate code. If a locator 
changes, I update it only in the corresponding Page Object instead of modifying multiple test cases."


"In my Playwright framework, I implemented POM by creating separate Page Object classes for application pages such 
as Login, Dashboard, Search and Claim. Each Page Object encapsulates its locators and page-specific actions.

For example, LoginPage contains username, password and login button locators along with methods like 
enterUsername(), enterPassword() and login(). The test case doesn't directly interact with these locators; 
it calls the reusable page methods.

I combine POM with Playwright fixtures for dependency injection and reusable setup. Test data is maintained 
separately, and common functionality such as logging, API utilities and configuration is kept in utility/config
 layers.

This separation gives us maintainability, reusability, readability and easier locator maintenance. If a 
locator changes, I only need to update it in the corresponding Page Object. We also integrate the framework with CI/CD, generate reports and execute tests in parallel where applicable."

 */

export class LoginPage {

    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly dashboard: Locator;

    constructor(page: Page) {
        this.page = page;

        this.username = page.getByLabel('Username');
        this.password = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.dashboard = page.getByText('Dashboard');
    }


    async login(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click()
    }

}


import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test('Verify successful login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await page.goto('https://example.com/login');

    await loginPage.login('testuser', 'password123');

    await loginPage.verifyDashboard();
});



