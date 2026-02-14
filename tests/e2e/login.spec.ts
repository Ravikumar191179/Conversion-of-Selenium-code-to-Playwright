import { test, expect } from '../../src/fixtures/baseFixtures';
import { LoginTestData } from '../../src/utils/testData';

test.describe('Login Functionality - Positive Tests', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateToLogin();
    });

    test('TC001: Should login successfully with valid credentials', async ({ loginPage, page }) => {
        // Arrange
        const { username, password } = LoginTestData.validCredentials;

        // Act
        await loginPage.login(username, password);

        // Assert
        await expect(page).toHaveURL(/.*logged-in-successfully/);
        const successMessage = await loginPage.getSuccessMessage();
        expect(successMessage).toContain('Logged In Successfully');

        const isLogoutVisible = await loginPage.isLogoutButtonVisible();
        expect(isLogoutVisible).toBe(true);
    });

    test('TC002: Should display success page title after login', async ({ loginPage }) => {
        // Arrange
        const { username, password } = LoginTestData.validCredentials;

        // Act
        await loginPage.login(username, password);
        await loginPage.waitForLoginResult();

        // Assert
        const pageTitle = await loginPage.getTitle();
        expect(pageTitle).toContain('Logged In Successfully');
    });

    test('TC003: Should be able to logout after successful login', async ({ loginPage, page }) => {
        // Arrange
        const { username, password } = LoginTestData.validCredentials;
        await loginPage.login(username, password);
        await loginPage.waitForLoginResult();

        // Act
        await loginPage.logout();

        // Assert - Should redirect to WordPress login page
        await expect(page).toHaveURL(/.*wp-login\.php/);
    });
});

test.describe('Login Functionality - Negative Tests', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateToLogin();
    });

    test('TC004: Should show error with invalid username', async ({ loginPage }) => {
        // Arrange
        const invalidCreds = LoginTestData.invalidCredentials[0];

        // Act
        await loginPage.login(invalidCreds.username, invalidCreds.password);
        await loginPage.waitForLoginResult();

        // Assert
        const isErrorDisplayed = await loginPage.isErrorDisplayed();
        expect(isErrorDisplayed).toBe(true);

        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Your username is invalid!');
    });

    test('TC005: Should show error with invalid password', async ({ loginPage }) => {
        // Arrange
        const invalidCreds = LoginTestData.invalidCredentials[1];

        // Act
        await loginPage.login(invalidCreds.username, invalidCreds.password);
        await loginPage.waitForLoginResult();

        // Assert
        const isErrorDisplayed = await loginPage.isErrorDisplayed();
        expect(isErrorDisplayed).toBe(true);

        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Your password is invalid!');
    });

    test('TC006: Should show error with both invalid credentials', async ({ loginPage }) => {
        // Arrange
        const invalidCreds = LoginTestData.invalidCredentials[2];

        // Act
        await loginPage.login(invalidCreds.username, invalidCreds.password);
        await loginPage.waitForLoginResult();

        // Assert
        const isErrorDisplayed = await loginPage.isErrorDisplayed();
        expect(isErrorDisplayed).toBe(true);
    });
});

test.describe('Login Functionality - Data-Driven Tests', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateToLogin();
    });

    // Test all invalid credential combinations
    for (const invalidCred of LoginTestData.invalidCredentials) {
        test(`TC-Invalid: ${invalidCred.description}`, async ({ loginPage }) => {
            await loginPage.login(invalidCred.username, invalidCred.password);
            await loginPage.waitForLoginResult();

            const isErrorDisplayed = await loginPage.isErrorDisplayed();
            expect(isErrorDisplayed).toBe(true);
        });
    }

    // Test empty credential combinations
    for (const emptyCred of LoginTestData.emptyCredentials) {
        test(`TC-Empty: ${emptyCred.description}`, async ({ loginPage }) => {
            await loginPage.login(emptyCred.username, emptyCred.password);

            // For empty fields, submit button might be disabled or show validation
            const isSubmitEnabled = await loginPage.isSubmitButtonEnabled();
            expect(isSubmitEnabled).toBe(true); // Button is enabled but will show error
        });
    }
});

test.describe('Login Page UI Tests', () => {

    test('TC007: Should display all login page elements', async ({ loginPage }) => {
        // Navigate
        await loginPage.navigateToLogin();

        // Assert all elements are visible
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.submitButton).toBeVisible();
    });

    test('TC008: Should have correct page title', async ({ loginPage }) => {
        // Navigate
        await loginPage.navigateToLogin();

        // Assert
        const title = await loginPage.getTitle();
        expect(title).toContain('Test Login');
    });

    test('TC009: Should have submit button enabled by default', async ({ loginPage }) => {
        // Navigate
        await loginPage.navigateToLogin();

        // Assert
        const isEnabled = await loginPage.isSubmitButtonEnabled();
        expect(isEnabled).toBe(true);
    });

    test('TC010: Should be able to clear form fields', async ({ loginPage }) => {
        // Navigate
        await loginPage.navigateToLogin();

        // Fill form
        await loginPage.login('testuser', 'testpass');

        // Clear form
        await loginPage.clearForm();

        // Assert
        const usernameValue = await loginPage.getUsernameValue();
        const passwordValue = await loginPage.getPasswordValue();

        expect(usernameValue).toBe('');
        expect(passwordValue).toBe('');
    });
});

test.describe('Login Functionality - Performance Tests', () => {

    test('TC011: Login should complete within acceptable time', async ({ loginPage }) => {
        await loginPage.navigateToLogin();

        const { username, password } = LoginTestData.validCredentials;

        const startTime = Date.now();
        await loginPage.login(username, password);
        await loginPage.waitForLoginResult();
        const endTime = Date.now();

        const duration = endTime - startTime;

        // Assert login completes within 5 seconds
        expect(duration).toBeLessThan(5000);
    });
});
