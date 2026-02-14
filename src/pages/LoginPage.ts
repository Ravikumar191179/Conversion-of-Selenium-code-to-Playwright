import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Login Page Object Model
 * Represents the login page at https://practicetestautomation.com/practice-test-login/
 */
export class LoginPage extends BasePage {
    // Locators
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly errorMessage: Locator;
    readonly successMessage: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        super(page);

        // Initialize locators using best practices
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.submitButton = page.locator('#submit');
        this.errorMessage = page.locator('#error');
        this.successMessage = page.locator('.post-title');
        this.logoutButton = page.locator('a.wp-block-button__link[href*="wp-login.php?action=logout"]');
    }

    /**
     * Navigate to login page
     */
    async navigateToLogin() {
        await this.navigate('/practice-test-login/');
        await this.waitForPageLoad();
    }

    /**
     * Perform login with username and password
     * @param username - Username to login with
     * @param password - Password to login with
     */
    async login(username: string, password: string) {
        await this.fillInput(this.usernameInput, username);
        await this.fillInput(this.passwordInput, password);
        await this.clickElement(this.submitButton);
    }

    /**
     * Get error message text
     */
    async getErrorMessage(): Promise<string> {
        await this.waitForElement(this.errorMessage);
        return await this.getText(this.errorMessage);
    }

    /**
     * Get success message text
     */
    async getSuccessMessage(): Promise<string> {
        await this.waitForElement(this.successMessage);
        return await this.getText(this.successMessage);
    }

    /**
     * Check if error message is displayed
     */
    async isErrorDisplayed(): Promise<boolean> {
        return await this.isVisible(this.errorMessage);
    }

    /**
     * Check if login was successful
     */
    async isLoginSuccessful(): Promise<boolean> {
        return await this.isVisible(this.successMessage);
    }

    /**
     * Check if logout button is visible (indicates successful login)
     */
    async isLogoutButtonVisible(): Promise<boolean> {
        return await this.isVisible(this.logoutButton);
    }

    /**
     * Perform logout
     */
    async logout() {
        await this.clickElement(this.logoutButton);
    }

    /**
     * Check if submit button is enabled
     */
    async isSubmitButtonEnabled(): Promise<boolean> {
        return await this.submitButton.isEnabled();
    }

    /**
     * Wait for login to complete (either success or error)
     */
    async waitForLoginResult() {
        try {
            await Promise.race([
                this.waitForElement(this.successMessage, 5000),
                this.waitForElement(this.errorMessage, 5000)
            ]);
        } catch (error) {
            throw new Error('Login result not displayed within timeout');
        }
    }

    /**
     * Clear login form
     */
    async clearForm() {
        await this.usernameInput.clear();
        await this.passwordInput.clear();
    }

    /**
     * Get username input value
     */
    async getUsernameValue(): Promise<string> {
        return await this.usernameInput.inputValue();
    }

    /**
     * Get password input value
     */
    async getPasswordValue(): Promise<string> {
        return await this.passwordInput.inputValue();
    }
}
