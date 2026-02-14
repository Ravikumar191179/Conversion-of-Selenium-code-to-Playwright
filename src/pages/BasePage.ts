import { Page, Locator } from '@playwright/test';

/**
 * Base Page Object Model class
 * Contains common methods used across all page objects
 */
export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigate to a specific path
     * @param path - URL path to navigate to
     */
    async navigate(path: string = '') {
        const baseURL = process.env.BASE_URL || 'https://practicetestautomation.com';
        await this.page.goto(`${baseURL}${path}`);
    }

    /**
     * Wait for page to fully load
     */
    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Get current page title
     */
    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * Get current page URL
     */
    async getURL(): Promise<string> {
        return this.page.url();
    }

    /**
     * Take screenshot with custom name
     * @param name - Screenshot file name
     */
    async takeScreenshot(name: string) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        await this.page.screenshot({
            path: `screenshots/${name}-${timestamp}.png`,
            fullPage: true
        });
    }

    /**
     * Click on an element with proper waiting
     * @param locator - Element locator
     */
    async clickElement(locator: Locator) {
        await locator.waitFor({ state: 'visible' });
        await locator.click();
    }

    /**
     * Fill input field with text
     * @param locator - Input field locator
     * @param text - Text to fill
     */
    async fillInput(locator: Locator, text: string) {
        await locator.waitFor({ state: 'visible' });
        await locator.clear();
        await locator.fill(text);
    }

    /**
     * Get text content from element
     * @param locator - Element locator
     */
    async getText(locator: Locator): Promise<string> {
        await locator.waitFor({ state: 'visible' });
        return await locator.textContent() || '';
    }

    /**
     * Check if element is visible
     * @param locator - Element locator
     */
    async isVisible(locator: Locator): Promise<boolean> {
        try {
            await locator.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Wait for element to be visible
     * @param locator - Element locator
     * @param timeout - Timeout in milliseconds
     */
    async waitForElement(locator: Locator, timeout: number = 10000) {
        await locator.waitFor({ state: 'visible', timeout });
    }

    /**
     * Wait for URL to contain specific text
     * @param urlPart - URL part to wait for
     */
    async waitForURL(urlPart: string) {
        await this.page.waitForURL(`**/${urlPart}**`);
    }
}
